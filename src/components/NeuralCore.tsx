import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const EMBER = new THREE.Color('#FF5A1F')
const PEACH = new THREE.Color('#FFD7B8')
const ICE = new THREE.Color('#7CE7FF')

// Soft round sprite so points render as glowing dots instead of squares.
function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.25, 'rgba(255,255,255,0.8)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

// Deterministic random so the network looks the same on every load.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

type Graph = { nodes: THREE.Vector3[]; edges: [number, number][]; adj: number[][] }

function buildGraph(count: number): Graph {
  const r = rng(7)
  const nodes: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const th = golden * i
    // Two shells: an outer membrane and some inner neurons.
    const shell = r() < 0.78 ? 2.3 + (r() - 0.5) * 0.35 : 1.1 + r() * 0.8
    nodes.push(new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(shell))
  }
  const edges: [number, number][] = []
  const adj: number[][] = nodes.map(() => [])
  const seen = new Set<string>()
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, d: a.distanceTo(b) }))
      .filter((o) => o.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 3)
    near.forEach(({ j, d }) => {
      if (d > 1.25) return
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) return
      seen.add(key)
      edges.push([i, j])
      adj[i].push(j)
      adj[j].push(i)
    })
  })
  return { nodes, edges, adj }
}

function Network({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const core = useRef<THREE.Mesh>(null!)
  const halo = useRef<THREE.Sprite>(null!)
  const pulsesRef = useRef<THREE.Points>(null!)
  const nodesRef = useRef<THREE.Points>(null!)
  const { pointer } = useThree()
  const tex = useMemo(makeGlowTexture, [])

  const graph = useMemo(() => buildGraph(mobile ? 120 : 190), [mobile])

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(graph.nodes.length * 3)
    const col = new Float32Array(graph.nodes.length * 3)
    graph.nodes.forEach((n, i) => {
      n.toArray(pos, i * 3)
      const c = n.length() < 2 ? EMBER.clone() : PEACH.clone().lerp(EMBER, 0.35)
      c.toArray(col, i * 3)
    })
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [graph])

  const edgeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(graph.edges.length * 6)
    const col = new Float32Array(graph.edges.length * 6)
    graph.edges.forEach(([a, b], i) => {
      graph.nodes[a].toArray(pos, i * 6)
      graph.nodes[b].toArray(pos, i * 6 + 3)
      const ca = EMBER.clone().multiplyScalar(0.55)
      const cb = PEACH.clone().multiplyScalar(0.25)
      ca.toArray(col, i * 6)
      cb.toArray(col, i * 6 + 3)
    })
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [graph])

  // Signals travelling along the synapses.
  const PULSES = mobile ? 40 : 80
  const pulses = useMemo(() => {
    const r = rng(42)
    return Array.from({ length: PULSES }, () => {
      const [a, b] = graph.edges[Math.floor(r() * graph.edges.length)]
      return { from: a, to: b, t: r(), speed: 0.35 + r() * 0.7, ice: r() < 0.22 }
    })
  }, [graph, PULSES])

  const pulseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const col = new Float32Array(PULSES * 3)
    pulses.forEach((p, i) => (p.ice ? ICE : PEACH).toArray(col, i * 3))
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PULSES * 3), 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [pulses, PULSES])

  const dustGeo = useMemo(() => {
    const r = rng(99)
    const n = mobile ? 350 : 700
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize().multiplyScalar(3.4 + r() * 5)
      v.toArray(pos, i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [mobile])

  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const time = state.clock.elapsedTime
    const scroll = window.scrollY / Math.max(1, window.innerHeight)

    // Idle spin + scroll-driven twist + mouse parallax.
    group.current.rotation.y += dt * 0.08
    const targetX = pointer.y * 0.25 + scroll * 0.6
    const targetZ = -pointer.x * 0.15
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.05
    const s = 1 + Math.min(scroll, 1.5) * 0.25
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.08))
    if (mobile) group.current.position.y = 0.9
    else group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 2.1 - Math.min(scroll, 1) * 2.1, 0.06)

    // Breathing core.
    const beat = 1 + Math.sin(time * 2.2) * 0.04 + Math.max(0, Math.sin(time * 1.1)) ** 12 * 0.12
    core.current.scale.setScalar(beat)
    core.current.rotation.x += dt * 0.3
    core.current.rotation.y -= dt * 0.2
    halo.current.scale.setScalar(2.2 * beat)

    // Advance pulses; at the end of an edge, hop to a neighbour.
    const arr = pulseGeo.attributes.position.array as Float32Array
    pulses.forEach((p, i) => {
      p.t += dt * p.speed
      if (p.t >= 1) {
        p.t = 0
        const next = graph.adj[p.to]
        const prev = p.from
        p.from = p.to
        p.to = next.length > 1 ? next.filter((n) => n !== prev)[Math.floor(Math.random() * (next.length - 1))] : next[0] ?? prev
      }
      tmp.lerpVectors(graph.nodes[p.from], graph.nodes[p.to], p.t)
      tmp.toArray(arr, i * 3)
    })
    pulseGeo.attributes.position.needsUpdate = true

    const nm = nodesRef.current.material as THREE.PointsMaterial
    nm.size = 0.11 + Math.sin(time * 1.6) * 0.015
  })

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color={EMBER} wireframe transparent opacity={0.9} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.3, 2]} />
        <meshBasicMaterial color={EMBER} transparent opacity={0.85} />
      </mesh>
      <sprite ref={halo}>
        <spriteMaterial map={tex} color={EMBER} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <points ref={nodesRef} geometry={nodeGeo}>
        <pointsMaterial map={tex} vertexColors size={0.11} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={pulsesRef} geometry={pulseGeo}>
        <pointsMaterial map={tex} vertexColors size={0.2} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points geometry={dustGeo}>
        <pointsMaterial map={tex} color={PEACH} size={0.035} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
      </points>

      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.5, i * 0.9, 0]}>
          <torusGeometry args={[3 + i * 0.35, 0.004, 6, 160]} />
          <meshBasicMaterial color={i === 1 ? ICE : EMBER} transparent opacity={0.28} />
        </mesh>
      ))}
    </group>
  )
}

export default function NeuralCore() {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, mobile ? 9.5 : 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Network mobile={mobile} />
    </Canvas>
  )
}
