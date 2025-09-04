"use client"

import { useEffect, useRef, useCallback } from "react"
import * as THREE from "three"
import { Node, Link, MouseState, AnimationParams } from "@/types"

interface ThreeVisualizationProps {
  nodes: Node[]
  links: Link[]
  autoRotation: boolean
  onNodeClick?: (node: Node) => void
  onSceneInitialized?: () => void
}

const ThreeVisualization: React.FC<ThreeVisualizationProps> = ({
  nodes,
  links,
  autoRotation,
  onNodeClick,
  onSceneInitialized,
}) => {
  // Refs for Three.js objects
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const nodeObjectsRef = useRef<THREE.Mesh[]>([])
  const currentLinkObjectRef = useRef<THREE.LineSegments | null>(null)
  const currentDotsObjectRef = useRef<THREE.Points | null>(null)

  // Mouse interaction state
  const mouseStateRef = useRef<MouseState>({
    isDown: false,
    x: 0,
    y: 0,
  })

  // Animation parameters
  const animationParamsRef = useRef<AnimationParams>({
    rotationSpeed: 0.003,
    nodeSizeFactor: 0.8,
    connectionOpacity: 0.15,
    dotOpacity: 0.4,
  })

  const setupMouseControls = useCallback(() => {
    const canvas = rendererRef.current?.domElement
    if (!canvas) return

    const handleMouseDown = (e: MouseEvent) => {
      mouseStateRef.current.isDown = true
      mouseStateRef.current.x = e.clientX
      mouseStateRef.current.y = e.clientY
    }

    const handleMouseUp = () => {
      mouseStateRef.current.isDown = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseStateRef.current.isDown && sceneRef.current) {
        const deltaX = e.clientX - mouseStateRef.current.x
        const deltaY = e.clientY - mouseStateRef.current.y
        sceneRef.current.rotation.y += deltaX * 0.005
        sceneRef.current.rotation.x += deltaY * 0.005
        mouseStateRef.current.x = e.clientX
        mouseStateRef.current.y = e.clientY
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (cameraRef.current) {
        cameraRef.current.position.z += e.deltaY * 0.2
        const estimatedRadius = nodeObjectsRef.current.length > 0 ? 150 : 100
        cameraRef.current.position.z = Math.max(
          estimatedRadius * 0.01,
          Math.min(estimatedRadius * 3, cameraRef.current.position.z),
        )
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, cameraRef.current)

      const intersects = raycaster.intersectObjects(nodeObjectsRef.current)
      if (intersects.length > 0) {
        const nodeObject = intersects[0].object
        const nodeData = nodes.find(
          (n) => n.word === nodeObject.userData.word && n.frequency === nodeObject.userData.frequency,
        )
        if (nodeData && onNodeClick) {
          onNodeClick(nodeData)
        }
      }
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("wheel", handleWheel)
    canvas.addEventListener("click", handleClick)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("click", handleClick)
    }
  }, [nodes, onNodeClick])

  const create3DVisualization = useCallback(() => {
    if (!canvasContainerRef.current || nodes.length === 0) return

    // Clear existing scene
    if (rendererRef.current) {
      if (rendererRef.current.domElement.parentNode === canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(rendererRef.current.domElement)
      }
      if (sceneRef.current) {
        sceneRef.current.children.forEach((object) => {
          if ("geometry" in object && object.geometry) {
            (object.geometry as THREE.BufferGeometry).dispose()
          }
          if ("material" in object && object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => {
                (material as THREE.Material).dispose()
              })
            } else {
              (object.material as THREE.Material).dispose()
            }
          }
        })
      }
      rendererRef.current.dispose()
    }

    // Initialize Three.js
    sceneRef.current = new THREE.Scene()
    cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    rendererRef.current.setClearColor(0x000000, 0)
    canvasContainerRef.current.appendChild(rendererRef.current.domElement)

    const colors = [
      0x00ff88, 0x00ccff, 0xff0099, 0xff6b35, 0x8b5cf6, 0xf59e0b, 0x10b981, 0x3b82f6, 0xef4444, 0x06b6d4, 0x84cc16,
      0xf472b6,
    ]

    nodeObjectsRef.current = []

    const baseDistributionRadius = 100
    const scalingFactor = Math.pow(nodes.length, 1 / 3) * 5
    const distributionRadius = baseDistributionRadius + scalingFactor

    // Create nodes
    nodes.forEach((node, index) => {
      const geometry = new THREE.SphereGeometry(2, 8, 8)
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        visible: false,
      })

      const sphere = new THREE.Mesh(geometry, material)
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * distributionRadius * 2,
        (Math.random() - 0.5) * distributionRadius * 2,
        (Math.random() - 0.5) * distributionRadius * 2,
      )
      sphere.position.copy(position)
      sphere.userData = {
        word: node.word,
        frequency: node.frequency,
        originalPosition: sphere.position.clone(),
      }

      sceneRef.current!.add(sphere)
      nodeObjectsRef.current.push(sphere)

      // Create text sprite
      const canvas = document.createElement("canvas")
      canvas.width = 2048
      canvas.height = 512
      const context = canvas.getContext("2d")!
      context.clearRect(0, 0, canvas.width, canvas.height)

      const fontSize = Math.max(100, Math.min(200, Math.log(node.frequency + 1) * 20))
      context.font = `bold ${fontSize}px Arial`
      context.textAlign = "center"

      context.shadowColor = `#${colors[node.group % colors.length].toString(16).padStart(6, "0")}`
      context.shadowBlur = 24
      context.fillStyle = "#ffffff"
      context.fillText(node.word, canvas.width / 2, canvas.height / 2)

      const texture = new THREE.CanvasTexture(canvas)
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.1,
      })
      const sprite = new THREE.Sprite(spriteMaterial)

      sprite.position.copy(sphere.position)
      const textScale =
        Math.max(40, Math.min(100, Math.log(node.frequency + 1) * 10)) * animationParamsRef.current.nodeSizeFactor
      sprite.scale.set(textScale, textScale / 4, 1)
      sceneRef.current!.add(sprite)

      sphere.userData.sprite = sprite
    })

    // Create connections
    const linePositions: number[] = []
    const dotPositions: number[] = []

    links.forEach((link) => {
      const sourceNode = nodeObjectsRef.current[link.source]
      const targetNode = nodeObjectsRef.current[link.target]
      if (sourceNode && targetNode) {
        const midPoint = new THREE.Vector3().addVectors(sourceNode.position, targetNode.position).multiplyScalar(0.5)
        const direction = new THREE.Vector3().subVectors(targetNode.position, sourceNode.position)
        const offsetStrength = direction.length() * 0.1
        const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
          .normalize()
          .multiplyScalar(offsetStrength * (Math.random() - 0.5) * 2)

        const controlPoint = midPoint.clone().add(perpendicular)
        const curve = new THREE.QuadraticBezierCurve3(sourceNode.position, controlPoint, targetNode.position)

        const points = curve.getPoints(Math.max(2, Math.floor(link.strength * 8)))

        for (let i = 0; i < points.length - 1; i++) {
          linePositions.push(points[i].x, points[i].y, points[i].z)
          linePositions.push(points[i + 1].x, points[i + 1].y, points[i + 1].z)
        }
        dotPositions.push(midPoint.x, midPoint.y, midPoint.z)
      }
    })

    // Add lines
    if (linePositions.length > 0) {
      const lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3))
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: animationParamsRef.current.connectionOpacity,
        blending: THREE.AdditiveBlending,
      })
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
      sceneRef.current!.add(lines)
      currentLinkObjectRef.current = lines
    }

    // Add dots
    if (dotPositions.length > 0) {
      const dotGeometry = new THREE.BufferGeometry()
      dotGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dotPositions, 3))

      const dotCanvas = document.createElement("canvas")
      dotCanvas.width = 32
      dotCanvas.height = 32
      const dotContext = dotCanvas.getContext("2d")!
      dotContext.beginPath()
      dotContext.arc(16, 16, 14, 0, Math.PI * 2)
      dotContext.fillStyle = "white"
      dotContext.fill()
      const dotTexture = new THREE.CanvasTexture(dotCanvas)
      const dotMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: animationParamsRef.current.dotOpacity,
        map: dotTexture,
        blending: THREE.AdditiveBlending,
      })
      const dots = new THREE.Points(dotGeometry, dotMaterial)
      sceneRef.current!.add(dots)
      currentDotsObjectRef.current = dots
    }

    // Set camera position
    const initialCameraZ = distributionRadius * 1.5
    cameraRef.current.position.set(0, 0, initialCameraZ)
    cameraRef.current.lookAt(0, 0, 0)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    sceneRef.current.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(distributionRadius / 2, distributionRadius / 2, distributionRadius / 2)
    sceneRef.current.add(pointLight)

    setupMouseControls()
    
    if (onSceneInitialized) {
      onSceneInitialized()
    }
  }, [nodes, links, setupMouseControls, onSceneInitialized])

  const animate = useCallback(() => {
    animationFrameRef.current = requestAnimationFrame(animate)

    if (sceneRef.current && autoRotation) {
      sceneRef.current.rotation.y += animationParamsRef.current.rotationSpeed
    }

    const time = Date.now() * 0.0005

    if (nodeObjectsRef.current.length > 0) {
      nodeObjectsRef.current.forEach((node, index) => {
        const floatSpeed = 0.5 + (index % 5) * 0.05
        const floatAmplitude = 5 + (index % 3) * 0.5

        const originalPos = node.userData.originalPosition
        node.position.x = originalPos.x + Math.sin(time * floatSpeed + index) * floatAmplitude
        node.position.y = originalPos.y + Math.cos(time * floatSpeed * 1.3 + index) * floatAmplitude
        node.position.z = originalPos.z + Math.sin(time * floatSpeed * 0.7 + index) * floatAmplitude

        if (node.userData.sprite) {
          node.userData.sprite.position.copy(node.position)

          if (nodes[index] && nodes[index].frequency > 50) {
            const pulse = 1 + Math.sin(time * 3 + index) * 0.1
            const baseScale =
              Math.max(40, Math.min(100, Math.log(nodes[index].frequency + 1) * 10)) *
              animationParamsRef.current.nodeSizeFactor
            node.userData.sprite.scale.set(baseScale * pulse, (baseScale / 4) * pulse, 1)
          }
        }
      })
    }

    if (currentLinkObjectRef.current) {
      const lineMaterial = currentLinkObjectRef.current.material as THREE.LineBasicMaterial
      const pulseOpacity = animationParamsRef.current.connectionOpacity * (0.7 + 0.3 * Math.sin(time * 2))
      lineMaterial.opacity = pulseOpacity

      const hue = (time * 0.1) % 1
      lineMaterial.color.setHSL(hue, 0.3, 0.8)
    }

    if (currentDotsObjectRef.current) {
      const dotMaterial = currentDotsObjectRef.current.material as THREE.PointsMaterial
      const pulseSize = 1.5 + 0.5 * Math.sin(time * 3)
      dotMaterial.size = pulseSize

      const dotPulseOpacity = animationParamsRef.current.dotOpacity * (0.6 + 0.4 * Math.sin(time * 2.5))
      dotMaterial.opacity = dotPulseOpacity

      const dotHue = (time * 0.1 + 0.5) % 1
      dotMaterial.color.setHSL(dotHue, 0.4, 0.9)
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
  }, [autoRotation, nodes])

  // Effect to start animation when scene is initialized
  useEffect(() => {
    if (nodes.length > 0) {
      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [animate, nodes.length])

  // Effect to create visualization when nodes/links change
  useEffect(() => {
    if (nodes.length > 0) {
      create3DVisualization()
    }
  }, [create3DVisualization, nodes, links])

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return <div ref={canvasContainerRef} className="w-full h-full" />
}

export default ThreeVisualization
