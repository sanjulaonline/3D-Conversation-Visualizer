"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Stage, Grid, OrbitControls, Environment } from "@react-three/drei"
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing"
import { easing } from "maath"
import TrueFocusText from "./true-focus-text"

interface LandingHeroProps {
  onGetStarted: () => void
}

export default function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes trueFocus {
            to {
              filter: blur(0px) !important;
              opacity: 1 !important;
              transform: translateY(0px) !important;
            }
          }
        `
      }} />
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas flat shadows camera={{ position: [-15, 0, 10], fov: 25 }}>
          <fog attach="fog" args={["#0f0f23", 15, 22.5]} />
          <Stage
            intensity={0.5}
            environment="city"
            shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
            adjustCamera={false}
          >
            <Kamdo rotation={[0, Math.PI, 0]} />
          </Stage>
          <Grid
            renderOrder={-1}
            position={[0, -1.85, 0]}
            infiniteGrid
            cellSize={0.6}
            cellThickness={0.6}
            sectionSize={3.3}
            sectionThickness={1.5}
            sectionColor="#3b82f6"
            fadeDistance={30}
          />
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

      {/* UI Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Main Title with True Focus Animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              <TrueFocusText text="3D Conversation" delay={200} />
            </div>
            <br />
            <div className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              <TrueFocusText text="Visualizer" delay={600} />
            </div>
          </h1>

          {/* Subtitle with staggered animation */}
          <div className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            <TrueFocusText
              text="Transform your ChatGPT conversations into stunning 3D word clouds."
              delay={1000}
              className="block mb-2"
            />
            <TrueFocusText
              text="Explore the most frequent words in an immersive visual experience."
              delay={1200}
              className="block"
            />
          </div>

          {/* CTA Button with enhanced styling */}
          <div className="mb-16">
            <button
              onClick={onGetStarted}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 hover:from-blue-400 hover:via-cyan-400 hover:to-emerald-400 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-blue-500/25"
              style={{
                filter: "blur(8px)",
                opacity: "0",
                transform: "translateY(20px)",
                animation: "trueFocus 1s ease-out 1.4s forwards"
              }}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Features with modern glass morphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
            <div 
              className="bg-slate-800/20 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-800/30"
              style={{
                filter: "blur(8px)",
                opacity: "0",
                transform: "translateY(20px)",
                animation: "trueFocus 1s ease-out 1.6s forwards"
              }}
            >
              <div className="text-blue-400 text-3xl mb-4">🎨</div>
              <h3 className="font-semibold mb-3 text-slate-200">Beautiful 3D Visualization</h3>
              <p className="text-sm text-slate-400">Interactive word clouds with stunning visual effects</p>
            </div>

            <div 
              className="bg-slate-800/20 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-800/30"
              style={{
                filter: "blur(8px)",
                opacity: "0",
                transform: "translateY(20px)",
                animation: "trueFocus 1s ease-out 1.8s forwards"
              }}
            >
              <div className="text-cyan-400 text-3xl mb-4">📊</div>
              <h3 className="font-semibold mb-3 text-slate-200">Smart Analysis</h3>
              <p className="text-sm text-slate-400">Analyze word frequency and conversation patterns</p>
            </div>

            <div 
              className="bg-slate-800/20 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:bg-slate-800/30"
              style={{
                filter: "blur(8px)",
                opacity: "0",
                transform: "translateY(20px)",
                animation: "trueFocus 1s ease-out 2.0s forwards"
              }}
            >
              <div className="text-emerald-400 text-3xl mb-4">⚡</div>
              <h3 className="font-semibold mb-3 text-slate-200">Real-time Interaction</h3>
              <p className="text-sm text-slate-400">Click, drag, and explore your conversations</p>
            </div>
          </div>
        </div>
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
