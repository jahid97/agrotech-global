import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Generate a simple cloud texture on a canvas (no CDN) ──── */
function makeCloudTexture(): THREE.CanvasTexture {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size / 2
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = 'transparent'
  ctx.clearRect(0, 0, size, size / 2)

  const rand = (min: number, max: number) => Math.random() * (max - min) + min
  for (let i = 0; i < 180; i++) {
    const x = rand(0, size)
    const y = rand(0, size / 2)
    const r = rand(18, 70)
    const alpha = rand(0.08, 0.22)
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.ellipse(x, y, r, r * 0.55, rand(0, Math.PI), 0, Math.PI * 2)
    ctx.fill()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* ─── Earth + clouds mesh ────────────────────────────────────── */
function EarthMesh() {
  const earthRef = useRef<THREE.Mesh>(null!)
  const cloudsRef = useRef<THREE.Mesh>(null!)

  // useTexture suspends until the texture is fully loaded — reliable in R3F
  const earthTex = useTexture('/earth.jpg')
  earthTex.colorSpace = THREE.SRGBColorSpace

  const cloudsTex = useMemo(() => makeCloudTexture(), [])

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.0010
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0013
  })

  return (
    <>
      {/* Earth sphere — standard material enables day/night shading */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          map={earthTex}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* Procedural cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.635, 64, 64]} />
        <meshStandardMaterial
          map={cloudsTex}
          transparent
          opacity={0.35}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Atmosphere rim — brand green to match site theme */}
      <mesh>
        <sphereGeometry args={[1.75, 64, 64]} />
        <meshStandardMaterial
          color="#0d5c2e"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[1.88, 64, 64]} />
        <meshStandardMaterial
          color="#1a7a3f"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  )
}

/* ─── Fallback sphere while texture loads ────────────────────── */
function EarthFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshBasicMaterial color="#1b5e8a" />
    </mesh>
  )
}

/* ─── Canvas ─────────────────────────────────────────────────── */
export default function Earth3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Ambient — dim so night side is noticeably dark */}
      <ambientLight intensity={0.12} />
      {/* Sun — right-side key light, warm white, creates the lit day side */}
      <directionalLight position={[6, 2, 4]} intensity={1.8} color="#fff5e0" />
      {/* Soft green shadow on the left/night side */}
      <pointLight position={[-5, 0, 2]} intensity={0.28} color="#3ddc70" />
      {/* Top rim for depth */}
      <pointLight position={[0, 5, 2]} intensity={0.2} color="#a8e6c1" />
      <Stars radius={140} depth={60} count={4000} factor={4} saturation={0} fade speed={0.3} />
      {/* Shift Earth right so it sits behind the right half, leaving the left for text */}
      <group position={[0.6, 0.1, 0]}>
        <Suspense fallback={<EarthFallback />}>
          <EarthMesh />
        </Suspense>
      </group>
    </Canvas>
  )
}