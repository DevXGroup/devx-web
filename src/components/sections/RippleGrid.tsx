import { useRef, useEffect, useCallback } from 'react'
import { Renderer, Program, Triangle, Mesh } from 'ogl'

type Props = {
  enableRainbow?: boolean
  gridColor?: string
  rippleIntensity?: number
  gridSize?: number
  gridThickness?: number
  fadeDistance?: number
  vignetteStrength?: number
  glowIntensity?: number
  opacity?: number
  gridRotation?: number
  mouseInteraction?: boolean
  mouseInteractionRadius?: number
}

type UniformInputs = Required<Props>

type UniformValue<T> = { value: T }

type Uniforms = {
  iTime: UniformValue<number>
  iResolution: UniformValue<[number, number]>
  enableRainbow: UniformValue<boolean>
  gridColor: UniformValue<[number, number, number]>
  rippleIntensity: UniformValue<number>
  gridSize: UniformValue<number>
  gridThickness: UniformValue<number>
  fadeDistance: UniformValue<number>
  vignetteStrength: UniformValue<number>
  glowIntensity: UniformValue<number>
  opacity: UniformValue<number>
  gridRotation: UniformValue<number>
  mouseInteraction: UniformValue<boolean>
  mousePosition: UniformValue<[number, number]>
  mouseInfluence: UniformValue<number>
  mouseInteractionRadius: UniformValue<number>
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result && result[1] && result[2] && result[3]
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1]
}

const createUniforms = (config: UniformInputs): Uniforms => ({
  iTime: { value: 0 },
  iResolution: { value: [1, 1] },
  enableRainbow: { value: config.enableRainbow },
  gridColor: { value: hexToRgb(config.gridColor) },
  rippleIntensity: { value: config.rippleIntensity },
  gridSize: { value: config.gridSize },
  gridThickness: { value: config.gridThickness },
  fadeDistance: { value: config.fadeDistance },
  vignetteStrength: { value: config.vignetteStrength },
  glowIntensity: { value: config.glowIntensity },
  opacity: { value: config.opacity },
  gridRotation: { value: config.gridRotation },
  mouseInteraction: { value: config.mouseInteraction },
  mousePosition: { value: [0.5, 0.5] },
  mouseInfluence: { value: 0 },
  mouseInteractionRadius: { value: config.mouseInteractionRadius },
})

const RippleGrid: React.FC<Props> = ({
  enableRainbow = false,
  gridColor = '#ffffff',
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  fadeDistance = 1.5,
  vignetteStrength = 2.0,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
  mouseInteraction = true,
  mouseInteractionRadius = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
  const mouseInfluenceRef = useRef(0)
  const uniformsRef = useRef<Uniforms | null>(null)
  const rendererRef = useRef<Renderer | null>(null)

  if (!uniformsRef.current) {
    uniformsRef.current = createUniforms({
      enableRainbow,
      gridColor,
      rippleIntensity,
      gridSize,
      gridThickness,
      fadeDistance,
      vignetteStrength,
      glowIntensity,
      opacity,
      gridRotation,
      mouseInteraction,
      mouseInteractionRadius,
    })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!mouseInteraction || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height // Flip Y coordinate
      targetMouseRef.current = { x, y }
    },
    [mouseInteraction]
  )

  useEffect(() => {
    if (!containerRef.current) return
    const root = containerRef.current
    const uniforms = uniformsRef.current

    if (!uniforms) return

    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null
    let mesh: Mesh | null = null
    let resizeObserver: ResizeObserver | null = null
    let renderRafId: number | null = null
    let sizePollRafId: number | null = null

    const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`

    const frag = `precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    if (gridRotation != 0.0) {
        uv = rotate(gridRotation * pi / 180.0) * uv;
    }

    float dist = length(uv);
    float func = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mouseUv = (mousePosition * 2.0 - 1.0);
        mouseUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mouseUv);
        
        float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
        
        float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
    }

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aaWidth = 0.5;
    vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
    );

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * smoothB.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

    if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
    }

    float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
    
    vec2 vignetteCoords = vUv - 0.5;
    float vignetteDistance = length(vignetteCoords);
    float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
    vignette = clamp(vignette, 0.0, 1.0);
    
    vec3 t;
    if (enableRainbow) {
        t = vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
        ) + 0.5;
    } else {
        t = gridColor;
    }

    float finalFade = ddd * vignette;
    float alpha = length(color) * finalFade * opacity;
    gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
}`

    const doResize = (w: number, h: number) => {
      if (!rendererRef.current) return
      rendererRef.current.setSize(w, h)
      uniforms.iResolution.value = [w, h]
    }

    const handleMouseEnter = () => {
      if (!mouseInteraction) return
      mouseInfluenceRef.current = 1.0
    }

    const handleMouseLeave = () => {
      if (!mouseInteraction) return
      mouseInfluenceRef.current = 0.0
    }

    const initWebGL = () => {
      if (!root || rendererRef.current) return
      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      })
      rendererRef.current = renderer
      gl = renderer.gl
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      ;(gl.canvas as HTMLCanvasElement).style.width = '100%'
      ;(gl.canvas as HTMLCanvasElement).style.height = '100%'
      root.appendChild(gl.canvas as HTMLCanvasElement)

      const geometry = new Triangle(gl as any)
      const program = new Program(gl as any, { vertex: vert, fragment: frag, uniforms })
      mesh = new Mesh(gl as any, { geometry, program })

      const { clientWidth: w, clientHeight: h } = root
      if (w > 0 && h > 0) doResize(w, h)

      if (mouseInteraction) {
        root.addEventListener('mousemove', handleMouseMove)
        root.addEventListener('mouseenter', handleMouseEnter)
        root.addEventListener('mouseleave', handleMouseLeave)
      }

      const render = (t: number) => {
        uniforms.iTime.value = t * 0.001

        const lerpFactor = 0.1
        mousePositionRef.current.x +=
          (targetMouseRef.current.x - mousePositionRef.current.x) * lerpFactor
        mousePositionRef.current.y +=
          (targetMouseRef.current.y - mousePositionRef.current.y) * lerpFactor

        const currentInfluence = uniforms.mouseInfluence.value
        const targetInfluence = mouseInfluenceRef.current
        uniforms.mouseInfluence.value += (targetInfluence - currentInfluence) * 0.05

        uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y]

        if (rendererRef.current && mesh) rendererRef.current.render({ scene: mesh })
        renderRafId = requestAnimationFrame(render)
      }

      renderRafId = requestAnimationFrame(render)
    }

    const setupResizeHandling = () => {
      const node = root!
      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (!entry) return
        const width = entry.contentRect?.width ?? 0
        const height = entry.contentRect?.height ?? 0
        if (width > 0 && height > 0) {
          doResize(width, height)
        }
      })
      resizeObserver.observe(node)
    }

    const tryInit = () => {
      if (!root) return
      const { clientWidth: w, clientHeight: h } = root
      if (w > 0 && h > 0) {
        initWebGL()
        setupResizeHandling()
      } else {
        sizePollRafId = requestAnimationFrame(tryInit)
      }
    }

    tryInit()

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      if (renderRafId !== null) cancelAnimationFrame(renderRafId)
      if (sizePollRafId !== null) cancelAnimationFrame(sizePollRafId)
      if (mouseInteraction && root) {
        root.removeEventListener('mousemove', handleMouseMove)
        root.removeEventListener('mouseenter', handleMouseEnter)
        root.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (rendererRef.current && gl) {
        gl.getExtension('WEBGL_lose_context')?.loseContext()
        if (root && gl.canvas instanceof HTMLCanvasElement && gl.canvas.parentNode === root) {
          root.removeChild(gl.canvas)
        }
      }
      rendererRef.current = null
      gl = null
      mesh = null
    }

    // Uniform prop values are intentionally not in deps to avoid recreating WebGL context.
    // They are updated via the second useEffect below which only updates uniform values.
  }, [handleMouseMove, mouseInteraction])

  useEffect(() => {
    if (!uniformsRef.current) return

    uniformsRef.current.enableRainbow.value = enableRainbow
    uniformsRef.current.gridColor.value = hexToRgb(gridColor)
    uniformsRef.current.rippleIntensity.value = rippleIntensity
    uniformsRef.current.gridSize.value = gridSize
    uniformsRef.current.gridThickness.value = gridThickness
    uniformsRef.current.fadeDistance.value = fadeDistance
    uniformsRef.current.vignetteStrength.value = vignetteStrength
    uniformsRef.current.glowIntensity.value = glowIntensity
    uniformsRef.current.opacity.value = opacity
    uniformsRef.current.gridRotation.value = gridRotation
    uniformsRef.current.mouseInteraction.value = mouseInteraction
    uniformsRef.current.mouseInteractionRadius.value = mouseInteractionRadius
  }, [
    enableRainbow,
    gridColor,
    rippleIntensity,
    gridSize,
    gridThickness,
    fadeDistance,
    vignetteStrength,
    glowIntensity,
    opacity,
    gridRotation,
    mouseInteraction,
    mouseInteractionRadius,
  ])

  return (
    <div
      ref={containerRef}
      data-testid="ripple-grid"
      className="w-full h-full relative overflow-hidden [&_canvas]:block"
    />
  )
}

export default RippleGrid
