import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/* ──────────────────────────────────────────────────────────────
   Cartoon-style texture pipeline
   1. Load the real NASA earth.jpg (Real map, NO AI text/lines)
   2. Posterize every pixel → bright cyan ocean / solid green land
   3. Detect every coastline pixel
   4. Dilate coastlines thinly → flat hand-drawn outline
   ────────────────────────────────────────────────────────────── */
function makeCartoonEarth(source: CanvasImageSource): THREE.CanvasTexture {
  const W = 2048, H = 1024
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  ctx.drawImage(source, 0, 0, W, H)

  const N   = W * H
  const raw = ctx.getImageData(0, 0, W, H).data
  const out = new Uint8ClampedArray(raw.length)

  // Pass 1: solid flat colors (No gradients, exactly like the reference image)
  const isOceanMap = new Uint8Array(N)
  for (let i = 0; i < N; i++) {
    const r = raw[i * 4], g = raw[i * 4 + 1], b = raw[i * 4 + 2]

    // Determine if pixel is ocean based on blue dominance
    const blueWins = b > r * 1.05 && b > 40
    // Remove ice/snow to keep it perfectly flat green/blue
    const isSnow   = r > 165 && g > 165 && b > 165
    const ocean    = blueWins && !isSnow

    if (ocean) {
      isOceanMap[i] = 1
      // Cyan/Light Blue ocean
      out[i * 4]     = 42
      out[i * 4 + 1] = 207
      out[i * 4 + 2] = 207
      out[i * 4 + 3] = 255
    } else {
      // Solid bright green land
      out[i * 4]     = 110
      out[i * 4 + 1] = 191
      out[i * 4 + 2] = 40
      out[i * 4 + 3] = 255
    }
  }

  // Pass 2: find coastline boundary pixels
  const bound = new Uint8Array(N)
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const i = y * W + x
      const me = isOceanMap[i]
      if (
        isOceanMap[i - W] !== me || isOceanMap[i + W] !== me ||
        isOceanMap[i - 1] !== me || isOceanMap[i + 1] !== me
      ) {
        bound[i] = 1
      }
    }
  }

  // Pass 3: dilate coastline (Only 1 time for a THIN continuous outline)
  let cur = bound
  let nxt = new Uint8Array(N)
  for (let iter = 0; iter < 1; iter++) {
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const i = y * W + x
        nxt[i] = (cur[i] || cur[i - 1] || cur[i + 1] || cur[i - W] || cur[i + W]) ? 1 : 0
      }
    }
    const temp = cur; cur = nxt; nxt = temp;
  }

  // Pass 4: paint the thin outline black
  for (let i = 0; i < N; i++) {
    if (cur[i]) {
      out[i * 4]     = 0   // black outline
      out[i * 4 + 1] = 0
      out[i * 4 + 2] = 0
      out[i * 4 + 3] = 255
    }
  }

  ctx.putImageData(new ImageData(out, W, H), 0, 0)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* ── Thin cloud layer (kept subtle just in case you want it) ── */
function makeCloudTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!
  ctx.clearRect(0, 0, W, H)
  const rand = (a: number, b: number) => Math.random() * (b - a) + a
  for (let i = 0; i < 50; i++) {
    const x = rand(0, W), y = rand(0, H), r = rand(10, 30)
    ctx.fillStyle = `rgba(255,255,255,${rand(0.02, 0.06)})`
    ctx.beginPath()
    ctx.ellipse(x, y, r, r * 0.5, rand(0, Math.PI), 0, Math.PI * 2)
    ctx.fill()
  }
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function EarthMesh() {
  const earthRef  = useRef<THREE.Mesh>(null!)

  // We load the REAL NASA map, but process it instantly in canvas!
  // This guarantees perfect continent shapes with ZERO AI text/lines.
  const rawTex = useTexture('/earth.jpg')
  const earthTex = useMemo(() => makeCartoonEarth(rawTex.image as CanvasImageSource), [rawTex])
  const cloudsTex = useMemo(() => makeCloudTexture(), [])

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001
  })

  return (
    <>
      <mesh>
        {/* Outer spherical black line, slightly larger, rendered on the inside */}
        <sphereGeometry args={[1.615, 64, 64]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>

      <mesh ref={earthRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshBasicMaterial map={earthTex} />
      </mesh>

      {/* Very faint clouds */}
      <mesh>
        <sphereGeometry args={[1.63, 64, 64]} />
        <meshBasicMaterial
          map={cloudsTex}
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

function EarthFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshBasicMaterial color="#2acfa1" />
    </mesh>
  )
}

export default function Earth3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <group position={[0.6, 0.1, 0]}>
        <Suspense fallback={<EarthFallback />}>
          <EarthMesh />
        </Suspense>
      </group>
    </Canvas>
  )
}
