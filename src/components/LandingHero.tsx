"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Stage, Grid, OrbitControls, Environment } from "@react-three/drei"
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing"
import { easing } from "maath"

interface LandingHeroProps {
  onGetStarted: () => void
}

export default function LandingHero({ onGetStarted }: LandingHeroProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 570)
    }
    
    // Set initial value
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas flat shadows camera={{ position: [-15, 0, 10], fov: 25 }}>
          <fog attach="fog" args={["#0f0f23", 15, 22.5]} />
          <Stage intensity={0.5} environment="city" shadows={{ type: 'accumulative', bias: -0.001, intensity: Math.PI }} adjustCamera={false}
          >
            <Kamdo rotation={[0, Math.PI, 0]} />
          </Stage>
          <Grid renderOrder={-1} position={[0, -1.85, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor="#7f7fff" fadeDistance={30} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.05}
            enableZoom={false}
            makeDefault
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={2} mipmapBlur />
            <ToneMapping />
          </EffectComposer>
          <Environment background preset="sunset" blur={0.8} />
        </Canvas>
      </div>

      {/* UI Overlay - Minimal Typography Style */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          padding: 40,
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          pointerEvents: "none",
        }}
      >
        {/* Header Section */}
        <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              flex: "1 1 0%",
              height: 30,
              fontSize: 30,
              fontWeight: "700",
              lineHeight: "30px",
              color: "white",
              letterSpacing: -2,
            }}
          >
            3D CONVERSATION
          </p>
          <div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}></div>
          <p style={{ flex: "1 1 0%", height: 30, fontSize: 30, lineHeight: "30px", textAlign: "right", color: "white" }}>⎑</p>
        </div>
        
        <div style={{ height: 60 }} />
        
        {/* Info Section */}
        <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
          <p style={{ flex: "1 1 0%", height: "100%", fontSize: 12, lineHeight: "1.5em", color: "white" }}>
            <b>ChatGPT Visualization</b>
            <br />
            Interactive Word Clouds
            <br />
            <b>—</b>
          </p>
          <div style={{ width: 10 }} />
          <p
            style={{
              transform: "rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)",
              transformOrigin: "right",
              fontSize: 12,
              fontWeight: "700",
              lineHeight: "100%",
              textAlign: "right",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            MOVE MOUSE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ●
          </p>
        </div>
        
        <div style={{ height: 10 }} />
        
        {/* Main Display */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            width: "100%",
            flex: "1 1 0%",
            padding: 0,
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <p style={{ flex: "1 1 0%", fontSize: 250, lineHeight: "1em", color: "white", margin: 0, letterSpacing: -10 }}>3D</p>
          <div style={{ width: 10 }} />
          <p style={{ flex: "1 1 0%", fontSize: 250, lineHeight: "100%", textAlign: "right", color: "white", margin: 0, letterSpacing: -10 }}>_VIZ</p>
        </div>
        
        <div style={{ height: 60 }} />
        
        {/* Footer Section */}
        <div
          style={{
            pointerEvents: "all",
            cursor: "auto",
            width: "100%",
            padding: 0,
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <p style={{ whiteSpace: "nowrap", flex: "1 1 0%", fontSize: 12, lineHeight: "1.5em", color: "white" }}>
            <b>Advanced Analytics</b>
            <br />
            Real-time Processing
          </p>
          <div style={{ width: 10 }} />
          <button
            onClick={onGetStarted}
            style={{
              fontFamily: "'Inter', sans-serif",
              flex: "1 1 0%",
              fontSize: 16,
              fontWeight: "700",
              lineHeight: "1em",
              textAlign: "center",
              color: "white",
              letterSpacing: -0.5,
              whiteSpace: "nowrap",
              background: "transparent",
              border: "2px solid white",
              padding: "12px 24px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: isLargeScreen ? "block" : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "white"
              e.currentTarget.style.color = "black"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.color = "white"
            }}
          >
            START VISUALIZATION
          </button>
          <div style={{ width: 10 }} />
          <p style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: "white" }}></p>
        </div>
      </div>

      {/* Bottom Right Links */}
      <div style={{ position: "absolute", bottom: 40, right: 40 }}>
        <p style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: "white" }}>
          <a href="#" style={{ color: "white", textDecoration: "none", marginRight: "10px" }}>about</a>
          <a href="#" style={{ color: "white", textDecoration: "none", marginRight: "10px" }}>docs</a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>github</a>
        </p>
      </div>

      {/* Centered Button for larger screens */}
      <div 
        style={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: isLargeScreen ? "none" : "block",
          pointerEvents: "all"
        }}
      >
        <button
          onClick={onGetStarted}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: "700",
            lineHeight: "1em",
            textAlign: "center",
            color: "white",
            letterSpacing: -0.5,
            whiteSpace: "nowrap",
            background: "transparent",
            border: "2px solid white",
            padding: "12px 24px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white"
            e.currentTarget.style.color = "black"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color = "white"
          }}
        >
          START VISUALIZATION
        </button>
      </div>
    </div>
  )
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.0 s2wt_kamdo_industrial_divinities.glb --transform --simplify
Author: Hansalex (https://sketchfab.com/Hansalex)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/s2wt-kamdo-industrial-divinities-f503b70ac05e49a38c81100d71599a1b
Title: S2WT "Kamdo" (Industrial Divinities)
*/

function Kamdo(props: any) {
  const head = useRef<any>(null)
  const stripe = useRef<any>(null)
  const light = useRef<any>(null)
  const { nodes, materials } = useGLTF("/s2wt_kamdo_industrial_divinities-transformed.glb")
  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2
    if (stripe.current) {
      stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50)
    }
    if (head.current) {
      easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)
    }
    if (light.current) {
      light.current.intensity = 1 + t * 4
    }
  })
  return (
    <group {...props}>
      <mesh castShadow receiveShadow geometry={(nodes as any).body001.geometry} material={(materials as any).Body} />
      <group ref={head}>
        <mesh castShadow receiveShadow geometry={(nodes as any).head001.geometry} material={(materials as any).Head} />
        <mesh castShadow receiveShadow geometry={(nodes as any).stripe001.geometry}>
          <meshBasicMaterial ref={stripe} toneMapped={false} />
          <pointLight ref={light} intensity={1} color={[10, 2, 5]} distance={2.5} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload("/s2wt_kamdo_industrial_divinities-transformed.glb")
