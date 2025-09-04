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

      {/* Bottom Right Links - Enhanced Social Media */}
      <div style={{ position: "absolute", bottom: 40, right: 40 }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "flex-end", 
          gap: "16px" 
        }}>
          {/* Social Media Icons */}
          <div style={{ 
            display: "flex", 
            gap: "12px", 
            alignItems: "center" 
          }}>
            <a 
              href="https://github.com/sanjulaonline" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "white", 
                textDecoration: "none",
                padding: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "white"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a 
              href="https://linkedin.com/in/sanjulaherath" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "white", 
                textDecoration: "none",
                padding: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "white"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a 
              href="https://twitter.com/sanjulaweb3" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "white", 
                textDecoration: "none",
                padding: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "white"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.instagram.com/s_njula._.xz._/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "white", 
                textDecoration: "none",
                padding: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "white"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
          
          {/* Text Links */}
          <p style={{ 
            fontSize: 12, 
            lineHeight: "1em", 
            textAlign: "right", 
            color: "white",
            margin: 0
          }}>
            {/* <a 
              href="#about" 
              style={{ 
                color: "rgba(255,255,255,0.7)", 
                textDecoration: "none", 
                marginRight: "16px",
                fontSize: 11,
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)"
              }}
            >
              ABOUT
            </a>
            <a 
              href="#docs" 
              style={{ 
                color: "rgba(255,255,255,0.7)", 
                textDecoration: "none", 
                marginRight: "16px",
                fontSize: 11,
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)"
              }}
            >
              DOCS
            </a> */}
            <a 
              href="mailto:sanjula692@gmail.com" 
              style={{ 
                color: "rgba(255,255,255,0.7)", 
                textDecoration: "none",
                fontSize: 11,
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)"
              }}
            >
              CONTACT
            </a>
          </p>
        </div>
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
