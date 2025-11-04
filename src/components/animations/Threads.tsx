import React, { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl'
import { useInView } from 'framer-motion'

interface ThreadsProps {
  color?: [number, number, number]
  amplitude?: number
  distance?: number
  enableMouseInteraction?: boolean
}

const perlinNoiseShader = `
float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
                * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}
`

const simplexNoiseShader = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}
float Simplex2D(vec2 v)
{
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                      -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
	+ i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision mediump float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

${simplexNoiseShader}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Simplex2D(vec2(time_scaled, st.x + perc) * 2.5) * 0.6,
        Simplex2D(vec2(time_scaled, st.x + time_scaled) * 0.6 * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;

    // Normalize color values to prevent over-saturation in Safari
    // commented this line since it's a over calculation;   normalize(uColor) * length(uColor) == uColor
    // vec3 normalizedColor = normalize(uColor) * length(uColor) * 0.3;

    // Apply gamma correction for consistent appearance across browsers
    vec3 finalColor = pow(uColor * colorVal * 0.3, vec3(1.0/2.2));

    fragColor = vec4(finalColor, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`
const Threads: React.FC<ThreadsProps> = ({
  color = [1, 1, 1],
  amplitude = 2,
  distance = 0,
  enableMouseInteraction = true,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })
  const isPaused = useRef(false)

  useEffect(() => {
    isPaused.current = !isInView
  }, [isInView])

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Clear any existing canvas to prevent conflicts
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new Renderer({
      alpha: true,
      preserveDrawingBuffer: true,
      // Force consistent color handling across browsers
      premultipliedAlpha: false,
      dpr,
    })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Set canvas properties with conditional mouse interaction
    gl.canvas.style.pointerEvents = enableMouseInteraction ? 'auto' : 'none'
    gl.canvas.style.isolation = 'isolate'
    gl.canvas.style.willChange = 'transform'

    container.appendChild(gl.canvas)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })

    function resize() {
      let { clientWidth, clientHeight } = container
      clientWidth*=dpr
      clientHeight*=dpr
      renderer.setSize(clientWidth, clientHeight)
      program.uniforms.iResolution.value.r = clientWidth
      program.uniforms.iResolution.value.g = clientHeight
      program.uniforms.iResolution.value.b = clientWidth / clientHeight
    }
    window.addEventListener('resize', resize)
    resize()

    let currentMouse = [0.5, 0.5]
    let targetMouse = [0.5, 0.5]

    function handleMouseMove(e: MouseEvent) {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height
      targetMouse = [x, y]
    }
    function handleMouseLeave() {
      targetMouse = [0.5, 0.5]
    }
    if (enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    function update(t: number) {
      if (isPaused.current) {
        animationFrameId.current = requestAnimationFrame(update)
        return;
      }

      if (enableMouseInteraction) {
        const smoothing = 0.05
        if (currentMouse[0] !== undefined && targetMouse[0] !== undefined) {
          currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0])
        }
        if (currentMouse[1] !== undefined && targetMouse[1] !== undefined) {
          currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1])
        }
        program.uniforms.uMouse.value[0] = currentMouse[0] || 0.5
        program.uniforms.uMouse.value[1] = currentMouse[1] || 0.5
      } else {
        program.uniforms.uMouse.value[0] = 0.5
        program.uniforms.uMouse.value[1] = 0.5
      }
      program.uniforms.iTime.value = t * 0.001

      renderer.render({ scene: mesh })
      animationFrameId.current = requestAnimationFrame(update)
    }
    animationFrameId.current = requestAnimationFrame(update)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = undefined
      }

      window.removeEventListener('resize', resize)

      if (enableMouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }

      // Proper WebGL cleanup to prevent interference with other WebGL contexts
      try {
        if (mesh) mesh.program.gl.deleteProgram(mesh.program.program)
        if (gl.canvas && container.contains(gl.canvas)) {
          container.removeChild(gl.canvas)
        }
        const loseContextExt = gl.getExtension('WEBGL_lose_context')
        if (loseContextExt) {
          loseContextExt.loseContext()
        }
      } catch (error) {
        console.warn('WebGL cleanup warning:', error)
      }
    }
  }, [color, amplitude, distance, enableMouseInteraction])

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{
        isolation: 'isolate',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        pointerEvents: enableMouseInteraction ? 'auto' : 'none',
        zIndex: 10,
        contain: 'layout style paint',
      }}
      aria-hidden="true"
      role="presentation"
      {...rest}
    />
  )
}

export default Threads
