import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const easing = {
  dampE: (current: THREE.Euler, target: [number, number, number], lambda: number, delta: number) => {
    current.x = THREE.MathUtils.damp(current.x, target[0], lambda, delta)
    current.y = THREE.MathUtils.damp(current.y, target[1], lambda, delta)
    current.z = THREE.MathUtils.damp(current.z, target[2], lambda, delta)
  }
}

interface IndustrialDivinitiesProps {
  [key: string]: any
}

export function IndustrialDivinities(props: IndustrialDivinitiesProps) {
  const head = useRef<THREE.Group>(null!)
  const stripe = useRef<THREE.MeshBasicMaterial>(null!)
  const light = useRef<THREE.PointLight>(null!)
  
  const { nodes, materials } = useGLTF('/s2wt_kamdo_industrial_divinities-transformed.glb')
  
  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2
    if (stripe.current) {
      stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50)
    }
    if (head.current) {
      easing.dampE(
        head.current.rotation, 
        [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 
        0.4, 
        delta
      )
    }
    if (light.current) {
      light.current.intensity = 1 + t * 4
    }
  })

  return (
    <group {...props}>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={(nodes as any).body001.geometry} 
        material={(materials as any).Body} 
      />
      <group ref={head}>
        <mesh 
          castShadow 
          receiveShadow 
          geometry={(nodes as any).head001.geometry} 
          material={(materials as any).Head} 
        />
        <mesh 
          castShadow 
          receiveShadow 
          geometry={(nodes as any).stripe001.geometry}
        >
          <meshBasicMaterial ref={stripe} toneMapped={false} />
          <pointLight ref={light} intensity={1} color={[10, 2, 5]} distance={2.5} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/s2wt_kamdo_industrial_divinities-transformed.glb')
