'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const Interactive3DShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [webglError, setWebglError] = useState<string | null>(null)

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 3D Logo WebGL Effect
  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) {
      setWebglSupported(false)
      setWebglError('WebGL is not supported by your browser')
      return
    }

    setWebglSupported(true)
    const webglContext = gl as WebGLRenderingContext

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      webglContext.viewport(0, 0, canvas.width, canvas.height)
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Vertex shader source
    const vertexShaderSource = `
      precision mediump float;
      attribute vec2 a_position;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      varying vec2 v_texCoord;
      
      void main() {
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        
        // Add wave distortion based on mouse position
        float dist = distance(zeroToOne, u_mouse);
        float wave = sin(dist * 20.0 + u_time * 0.005) * 0.1 * (1.0 - dist);
        
        gl_Position = vec4(clipSpace * vec2(1, -1) + vec2(0, wave), 0, 1);
        v_texCoord = zeroToOne;
      }
    `

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      varying vec2 v_texCoord;
      
      void main() {
        vec2 st = v_texCoord;
        vec2 mouse = u_mouse;
        
        // Create dynamic gradient
        float dist = distance(st, mouse);
        float intensity = 1.0 - smoothstep(0.0, 0.8, dist);
        
        // Animated colors
        vec3 color1 = vec3(0.8, 0.2, 0.8); // Purple
        vec3 color2 = vec3(0.2, 0.8, 0.9); // Cyan
        vec3 color3 = vec3(0.9, 0.7, 0.2); // Gold
        
        // Time-based color mixing
        float t = sin(u_time * 0.003) * 0.5 + 0.5;
        vec3 baseColor = mix(color1, color2, t);
        baseColor = mix(baseColor, color3, sin(u_time * 0.002 + dist * 10.0) * 0.5 + 0.5);
        
        // Add mouse interaction
        baseColor += intensity * 0.5;
        
        // Create logo-like shapes
        float logo = 0.0;
        vec2 center = vec2(0.5);
        float d = distance(st, center);
        
        // DevX letters effect
        float letterD = smoothstep(0.35, 0.3, abs(st.x - 0.3));
        letterD *= smoothstep(0.6, 0.4, st.y);
        letterD *= smoothstep(0.4, 0.6, st.y);
        
        float letterX = smoothstep(0.05, 0.0, abs((st.x - 0.7) - (st.y - 0.5) * 0.5));
        letterX += smoothstep(0.05, 0.0, abs((st.x - 0.7) + (st.y - 0.5) * 0.5));
        
        logo = max(letterD, letterX);
        
        // Combine everything
        vec3 finalColor = baseColor * (0.7 + logo * 0.8);
        finalColor += logo * vec3(1.0, 1.0, 0.8) * 0.5;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Shader compilation function
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null

      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader)
        console.error('Shader compilation error:', error)
        setWebglError(`Shader compilation failed: ${error}`)
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    // Create shaders
    const vertexShader = createShader(webglContext, webglContext.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(
      webglContext,
      webglContext.FRAGMENT_SHADER,
      fragmentShaderSource
    )

    if (!vertexShader || !fragmentShader) return

    // Create program
    const program = webglContext.createProgram()
    if (!program) return

    webglContext.attachShader(program, vertexShader)
    webglContext.attachShader(program, fragmentShader)
    webglContext.linkProgram(program)

    if (!webglContext.getProgramParameter(program, webglContext.LINK_STATUS)) {
      const error = webglContext.getProgramInfoLog(program)
      console.error('Program linking error:', error)
      setWebglError(`WebGL program linking failed: ${error}`)
      return
    }

    // Get attribute and uniform locations
    const positionLocation = webglContext.getAttribLocation(program, 'a_position')
    const resolutionLocation = webglContext.getUniformLocation(program, 'u_resolution')
    const mouseLocation = webglContext.getUniformLocation(program, 'u_mouse')
    const timeLocation = webglContext.getUniformLocation(program, 'u_time')

    // Create buffer
    const positionBuffer = webglContext.createBuffer()
    webglContext.bindBuffer(webglContext.ARRAY_BUFFER, positionBuffer)
    webglContext.bufferData(
      webglContext.ARRAY_BUFFER,
      new Float32Array([
        0,
        0,
        canvas.width,
        0,
        0,
        canvas.height,
        0,
        canvas.height,
        canvas.width,
        0,
        canvas.width,
        canvas.height,
      ]),
      webglContext.STATIC_DRAW
    )

    let startTime = Date.now()
    let animationId: number

    const render = () => {
      if (!webglContext || !program) return

      webglContext.clearColor(0, 0, 0, 1)
      webglContext.clear(webglContext.COLOR_BUFFER_BIT)

      webglContext.useProgram(program)

      webglContext.enableVertexAttribArray(positionLocation)
      webglContext.bindBuffer(webglContext.ARRAY_BUFFER, positionBuffer)
      webglContext.vertexAttribPointer(positionLocation, 2, webglContext.FLOAT, false, 0, 0)

      webglContext.uniform2f(resolutionLocation, canvas.width, canvas.height)
      webglContext.uniform2f(mouseLocation, mousePos.x, mousePos.y)
      webglContext.uniform1f(timeLocation, Date.now() - startTime)

      webglContext.drawArrays(webglContext.TRIANGLES, 0, 6)

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isInView, mousePos])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-black relative overflow-hidden flex items-center justify-center"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono"
            >
              Interactive
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                3D Experience
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/70 text-lg leading-relaxed">
              Immersive WebGL experiences that respond to user interaction. Custom shaders and 3D
              graphics that create unforgettable brand moments.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {[
                { label: 'WebGL Shaders', value: '100%' },
                { label: 'Real-time 3D', value: '60fps' },
                { label: 'Interactive', value: 'Mouse' },
                { label: 'Performance', value: 'Optimized' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-blue-400 font-mono font-bold">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Interactive Canvas */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-white/20">
              {webglSupported === false ? (
                <div
                  className="w-full h-full flex flex-col items-center justify-center cursor-crosshair"
                  style={{
                    background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  <div className="text-center space-y-4 p-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-white text-xl font-semibold mb-2">WebGL Not Supported</h3>
                    <p className="text-white/70 text-sm max-w-md">
                      Your browser doesn&apos;t support WebGL, which is required for this 3D
                      experience. Try updating your browser or enabling hardware acceleration.
                    </p>
                    {webglError && (
                      <details className="text-white/50 text-xs mt-4">
                        <summary className="cursor-pointer">Technical Details</summary>
                        <p className="mt-2 font-mono">{webglError}</p>
                      </details>
                    )}
                  </div>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair"
                  style={{
                    background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))',
                  }}
                />
              )}

              {/* Overlay instructions */}
              <div className="absolute bottom-4 left-4 text-white/60 text-sm font-mono">
                Move mouse to interact →
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Interactive3DShowcase
