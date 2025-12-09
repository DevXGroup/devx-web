'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface AsciiEffect3DProps {
  className?: string
  /** kept for backward-compat */
  height?: number
  /** ASCII glyph color (theme accent) */
  color?: string
  /** smaller = higher ASCII resolution */
  charSize?: number
  /** overlay transparency (0–1) */
  opacity?: number
  /** show the base plane under the ball */
  showBase?: boolean
  /** preferred background height (overrides `height`) */
  backgroundHeight?: number
  /** radius of the ASCII sphere (px) */
  sphereRadius?: number
  /** character ramp (dark -> light); leading spaces reduce background noise */
  charSet?: string
  /** enable mouse drag to rotate the ball */
  enableDragRotate?: boolean
  /** rotation speed for drag controls */
  rotateSpeed?: number
  /** allow wheel zoom (default false) */
  enableZoom?: boolean
  /**
   * @deprecated Use `lighting` prop instead. This is kept for backward compatibility.
   */
  flipLighting?: boolean
  /** scales key/fill intensities (1 = default example look) */
  lightScale?: number
  /** soft global light to smooth edges (0 keeps exact example) */
  ambient?: number
  /** Lighting direction: controls key/fill positions. Supersedes flipLighting. */
  lighting?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'
}

export default function AsciiEffect3D({
  className = '',
  height = 400,
  color = '#FFD700',
  charSize = 7,
  opacity = 0.9,
  showBase = false,
  backgroundHeight,
  sphereRadius = 180,
  charSet = ' .:-+*=%@#',
  enableDragRotate = false,
  rotateSpeed = 2.2,
  enableZoom = false,
  /**
   * @deprecated Use `lighting` instead. This is kept for backward compatibility.
   */
  flipLighting = false,
  lightScale = 1,
  ambient = 0,
  lighting = 'topRight',
}: AsciiEffect3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera?: THREE.PerspectiveCamera
    scene?: THREE.Scene
    renderer?: THREE.WebGLRenderer
    effect?: any
    sphere?: THREE.Mesh
    plane?: THREE.Mesh | undefined
    keyLight?: THREE.PointLight
    fillLight?: THREE.PointLight
    animationId?: number
    startTime?: number
    controls?: any
    resizeCleanup?: () => void
  }>({})
  const mountTokenRef = useRef(0)

  // actual draw height
  const H = backgroundHeight ?? height

  // Helper for setting up lighting direction and intensities
  function applyLighting(
    keyLight: THREE.PointLight,
    fillLight: THREE.PointLight,
    lighting: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft',
    lightScale: number
  ) {
    keyLight.intensity = 4 * lightScale
    fillLight.intensity = 2 * lightScale
    switch (lighting) {
      case 'topRight':
        keyLight.position.set(500, 500, 500)
        fillLight.position.set(-500, -500, -500)
        break
      case 'topLeft':
        keyLight.position.set(-500, 500, 500)
        fillLight.position.set(500, -500, -500)
        break
      case 'bottomRight':
        keyLight.position.set(500, -500, 500)
        fillLight.position.set(-500, 500, -500)
        break
      case 'bottomLeft':
        keyLight.position.set(-500, -500, 500)
        fillLight.position.set(500, 500, -500)
        break
      default:
        keyLight.position.set(500, 500, 500)
        fillLight.position.set(-500, -500, -500)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    mountTokenRef.current += 1
    const token = mountTokenRef.current

    const container = containerRef.current
    // Ensure no previous ASCII DOM remains to avoid duplicate/static instances
    while (container.firstChild) container.removeChild(container.firstChild)
    container.style.position = 'relative'
    container.style.overflow = 'hidden'
    container.style.display = 'block'
    const containerWidth = container.clientWidth
    const containerHeight = H

    const init = async (): Promise<void> => {
      try {
        const { AsciiEffect } = await import('three/examples/jsm/effects/AsciiEffect.js')
        if (token !== mountTokenRef.current || !containerRef.current) return
        // camera
        const camera = new THREE.PerspectiveCamera(70, containerWidth / containerHeight, 1, 1000)
        camera.position.y = 150
        camera.position.z = 500

        // scene transparent to blend into page background
        const scene = new THREE.Scene()
        scene.background = null

        // lights (direction and intensity now controlled by `lighting` prop)
        const keyLight = new THREE.PointLight(0xffffff, 1, 0, 0)
        const fillLight = new THREE.PointLight(0xffffff, 1, 0, 0)
        scene.add(keyLight)
        scene.add(fillLight)
        if (ambient > 0) {
          const amb = new THREE.AmbientLight(0xffffff, ambient)
          scene.add(amb)
        }
        // Set light positions/intensities after adding to scene
        applyLighting(keyLight, fillLight, lighting ?? 'topRight', lightScale)

        // sphere
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(sphereRadius, 20, 10),
          new THREE.MeshPhongMaterial({ flatShading: true })
        )
        scene.add(sphere)

        // optional base plane (removed by default)
        let plane: THREE.Mesh | undefined
        if (showBase) {
          plane = new THREE.Mesh(
            new THREE.PlaneGeometry(400, 400),
            new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
          )
          plane.position.y = -200
          plane.rotation.x = -Math.PI / 2
          scene.add(plane)
        }

        // renderer (alpha for transparency)
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(containerWidth, containerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // ASCII
        const effect = new AsciiEffect(renderer, charSet, { invert: false })
        effect.setSize(containerWidth, containerHeight)

        // Ensure the container is a positioning context and hides overflow:
        container.style.position = 'relative'
        container.style.overflow = 'hidden'
        container.style.display = 'block'

        // Style ASCII DOM output to be absolutely centered and unique
        const el = effect.domElement as HTMLDivElement
        el.style.position = 'absolute'
        el.style.left = '50%'
        el.style.top = '50%'
        el.style.transform = 'translate(-50%, -50%)'
        el.style.color = color
        el.style.backgroundColor = 'transparent'
        el.style.pointerEvents = enableDragRotate ? 'auto' : 'none'
        el.style.fontSize = `${charSize}px`
        el.style.lineHeight = `${charSize}px`
        el.style.letterSpacing = '0px'
        el.style.whiteSpace = 'pre'
        el.style.opacity = `${opacity}`
        el.style.fontFamily =
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        el.style.textRendering = 'optimizeSpeed'
        ;(el.style as any).webkitFontSmoothing = 'antialiased'
        ;(el.style as any).MozOsxFontSmoothing = 'grayscale'

        // Remove any previous animation frame if any
        if (sceneRef.current.animationId) cancelAnimationFrame(sceneRef.current.animationId)
        if (token !== mountTokenRef.current || !containerRef.current) return
        container.replaceChildren(effect.domElement)

        // Set up optional drag controls (TrackballControls)
        if (enableDragRotate) {
          // Dynamically import TrackballControls only if needed
          const { TrackballControls } =
            await import('three/examples/jsm/controls/TrackballControls.js')
          const controls = new TrackballControls(camera, effect.domElement)
          controls.noPan = true
          controls.noZoom = !enableZoom
          controls.rotateSpeed = rotateSpeed
          controls.zoomSpeed = 1.0
          controls.dynamicDampingFactor = 0.15
          ;(controls as any).enableDamping = true
          controls.minDistance = 400
          controls.maxDistance = 1000
          // Set cursor style on drag
          const elDom = effect.domElement as HTMLElement
          const handleStart = () => {
            elDom.style.cursor = 'grabbing'
          }
          const handleEnd = () => {
            elDom.style.cursor = 'grab'
          }
          elDom.style.cursor = 'grab'
          controls.addEventListener('start', handleStart)
          controls.addEventListener('end', handleEnd)
          // Save for cleanup
          sceneRef.current.controls = controls
        } else {
          sceneRef.current.controls = undefined
        }

        sceneRef.current = {
          camera,
          scene,
          renderer,
          effect,
          sphere,
          plane,
          keyLight,
          fillLight,
          startTime: performance.now(),
        }

        const animate = () => {
          if (!sceneRef.current.startTime) return
          const t = performance.now() - sceneRef.current.startTime
          if (sceneRef.current.sphere) {
            sceneRef.current.sphere.position.y = Math.abs(Math.sin(t * 0.002)) * 150
            sceneRef.current.sphere.rotation.x = t * 0.0003
            sceneRef.current.sphere.rotation.z = t * 0.0002
          }
          // Update controls if present
          sceneRef.current.controls?.update()
          sceneRef.current.effect?.render(sceneRef.current.scene!, sceneRef.current.camera!)
          sceneRef.current.animationId = requestAnimationFrame(animate)
        }
        animate()

        const handleResize = () => {
          if (!containerRef.current) return
          const w = containerRef.current.clientWidth
          const h = H
          if (sceneRef.current.camera) {
            sceneRef.current.camera.aspect = w / h
            sceneRef.current.camera.updateProjectionMatrix()
          }
          sceneRef.current.renderer?.setSize(w, h)
          sceneRef.current.effect?.setSize(w, h)
          const el2 = sceneRef.current.effect?.domElement as HTMLDivElement | undefined
          if (el2) {
            el2.style.fontSize = `${charSize}px`
            el2.style.lineHeight = `${charSize}px`
            el2.style.opacity = `${opacity}`
            el2.style.color = color
            el2.style.fontFamily =
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            el2.style.textRendering = 'optimizeSpeed'
            ;(el2.style as any).webkitFontSmoothing = 'antialiased'
            ;(el2.style as any).MozOsxFontSmoothing = 'grayscale'
          }
        }
        window.addEventListener('resize', handleResize)
        sceneRef.current.resizeCleanup = () => window.removeEventListener('resize', handleResize)
      } catch (e) {
        console.error('Failed to load AsciiEffect:', e)
        return
      }
    }

    const cleanup = () => {
      mountTokenRef.current += 1
      if (sceneRef.current.animationId) cancelAnimationFrame(sceneRef.current.animationId)
      if (sceneRef.current.resizeCleanup) sceneRef.current.resizeCleanup()
      // Dispose controls if present
      if (sceneRef.current.controls) {
        try {
          // Remove listeners and dispose controls
          const controls = sceneRef.current.controls
          const elDom = sceneRef.current.effect?.domElement as HTMLElement | undefined
          if (elDom) {
            controls.removeEventListener('start', () => {
              elDom.style.cursor = 'grabbing'
            })
            controls.removeEventListener('end', () => {
              elDom.style.cursor = 'grab'
            })
            elDom.style.cursor = ''
          }
          controls.dispose?.()
        } catch {}
        sceneRef.current.controls = undefined
      }
      if (sceneRef.current.scene) {
        sceneRef.current.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose()
            if (obj.material instanceof THREE.Material) obj.material.dispose()
          }
        })
      }
      try {
        const el = sceneRef.current.effect?.domElement as HTMLElement | undefined
        if (el && el.parentElement) el.parentElement.removeChild(el)
      } catch {}
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild)
        }
      }
    }

    init()
    return cleanup
  }, [
    H,
    color,
    charSize,
    opacity,
    showBase,
    sphereRadius,
    charSet,
    lighting,
    lightScale,
    ambient,
    enableDragRotate,
    enableZoom,
    rotateSpeed,
  ])

  // Update lighting direction/intensity on prop change
  useEffect(() => {
    const ref = sceneRef.current
    if (!ref.keyLight || !ref.fillLight) return
    applyLighting(ref.keyLight, ref.fillLight, lighting ?? 'topRight', lightScale)
  }, [lighting, lightScale])

  return <div ref={containerRef} className={`w-full ${className}`} style={{ height: `${H}px` }} />
}
