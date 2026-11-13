"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Focus = "research" | "analysis" | "portfolio";

const stations = [
  { id: "research" as const, label: "OBSERVATORY", position: [-3.2, 0.1, -1.3] as [number, number, number], color: "#38bdf8" },
  { id: "analysis" as const, label: "STRATEGY CORE", position: [0, 0.1, -2.6] as [number, number, number], color: "#ec4899" },
  { id: "portfolio" as const, label: "EXCHANGE BRIDGE", position: [3.2, 0.1, -1.3] as [number, number, number], color: "#34d399" },
];

export default function ShipScene({ onFocus }: { onFocus: (focus: Focus) => void }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return <div className="ship-3d-frame" aria-label="Interactive three-dimensional spaceship command deck">
    <Canvas camera={{ position: [0, 6.2, 9.5], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#07060d"]} />
      <fog attach="fog" args={["#07060d", 8, 19]} />
      <ambientLight intensity={0.6} color="#b8a9ff" />
      <pointLight position={[0, 4, 1]} intensity={16} distance={15} color="#a78bfa" />
      <pointLight position={[-5, 2, -2]} intensity={10} distance={9} color="#38bdf8" />
      <pointLight position={[5, 2, -2]} intensity={10} distance={9} color="#ec4899" />
      <Stars radius={32} depth={18} count={900} factor={1.3} saturation={0.2} fade speed={0.3} />
      <ShipDeck onFocus={onFocus} reducedMotion={reducedMotion} />
      <OrbitControls enablePan={false} minDistance={6} maxDistance={14} maxPolarAngle={Math.PI / 2.05} minPolarAngle={Math.PI / 3.5} />
    </Canvas>
    <div className="ship-3d-hint"><span>DRAG TO ORBIT</span><span>SCROLL TO ZOOM</span><span>LIVE STATE: SIMULATED</span></div>
  </div>;
}

function ShipDeck({ onFocus, reducedMotion }: { onFocus: (focus: Focus) => void; reducedMotion: boolean }) {
  return <group rotation={[-0.08, 0, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[6.8, 64]} /><meshStandardMaterial color="#0d0b18" metalness={0.7} roughness={0.42} /></mesh>
    <gridHelper args={[13, 26, "#35275d", "#17122d"]} position={[0, 0.02, 0]} rotation={[0, 0, 0]} />
    <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[1.45, 1.85, 0.55, 48]} /><meshStandardMaterial color="#171329" emissive="#241b54" emissiveIntensity={0.7} metalness={0.85} roughness={0.25} /></mesh>
    <mesh position={[0, 0.66, 0]}><torusGeometry args={[1.6, 0.035, 8, 64]} /><meshBasicMaterial color="#a78bfa" /></mesh>
    <mesh position={[0, 0.72, 0]}><sphereGeometry args={[0.5, 32, 16]} /><meshStandardMaterial color="#221b46" emissive="#a78bfa" emissiveIntensity={1.8} transparent opacity={0.9} /></mesh>
    <Line points={stations.map(() => [0, 0.26, 0] as [number, number, number]).concat(stations.map((station) => station.position))} color="#62519a" transparent opacity={0.3} lineWidth={1} />
    {stations.map((station) => <Station key={station.id} station={station} onClick={() => onFocus(station.id)} />)}
    <AnimatedAgent index={0} position={[-1.7, 0.55, 1.3]} color="#38bdf8" onClick={() => onFocus("research")} reducedMotion={reducedMotion} />
    <AnimatedAgent index={1} position={[0, 0.55, 1.9]} color="#ec4899" onClick={() => onFocus("analysis")} reducedMotion={reducedMotion} />
    <AnimatedAgent index={2} position={[1.7, 0.55, 1.3]} color="#34d399" onClick={() => onFocus("portfolio")} reducedMotion={reducedMotion} />
    <TelemetryBeads reducedMotion={reducedMotion} />
  </group>;
}

function Station({ station, onClick }: { station: typeof stations[number]; onClick: () => void }) {
  return <group position={station.position} onClick={(event) => { event.stopPropagation(); onClick(); }}>
    <mesh><cylinderGeometry args={[0.9, 1.1, 0.24, 32]} /><meshStandardMaterial color="#151126" emissive={station.color} emissiveIntensity={0.22} metalness={0.75} roughness={0.3} /></mesh>
    <mesh position={[0, 0.16, 0]}><torusGeometry args={[0.78, 0.025, 8, 48]} /><meshBasicMaterial color={station.color} /></mesh>
    <mesh position={[0, 0.52, 0]}><octahedronGeometry args={[0.35, 1]} /><meshStandardMaterial color={station.color} emissive={station.color} emissiveIntensity={1.1} metalness={0.5} roughness={0.2} /></mesh>
    <Html center distanceFactor={8} position={[0, 0.9, 0]}><button className="ship-label" onClick={onClick} type="button"><span className="ship-label-dot" style={{ background: station.color }} />{station.label}</button></Html>
  </group>;
}

function AnimatedAgent({ index, position, color, onClick, reducedMotion }: { index: number; position: [number, number, number]; color: string; onClick: () => void; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return;
    const time = clock.getElapsedTime();
    ref.current.position.x = position[0] + Math.sin(time * 0.65 + index) * 0.28;
    ref.current.position.z = position[2] + Math.cos(time * 0.55 + index) * 0.18;
    ref.current.position.y = position[1] + Math.sin(time * 1.8 + index) * 0.06;
    ref.current.rotation.y = time * 0.4 + index;
  });
  return <group ref={ref} position={position} onClick={(event) => { event.stopPropagation(); onClick(); }}>
    <mesh position={[0, 0.25, 0]}><capsuleGeometry args={[0.2, 0.42, 8, 16]} /><meshStandardMaterial color="#dcd5ff" emissive={color} emissiveIntensity={0.3} metalness={0.5} roughness={0.24} /></mesh>
    <mesh position={[0, 0.63, 0]}><sphereGeometry args={[0.18, 16, 12]} /><meshStandardMaterial color="#f2eeff" emissive={color} emissiveIntensity={1.5} /></mesh>
    <pointLight color={color} intensity={2.5} distance={2.2} />
  </group>;
}

function TelemetryBeads({ reducedMotion }: { reducedMotion: boolean }) {
  const refs = useRef<Array<THREE.Mesh | null>>([]);
  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const time = clock.getElapsedTime();
    refs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const progress = (time * 0.18 + index / 7) % 1;
      mesh.position.set(-3.2 + progress * 6.4, 0.45 + Math.sin(progress * Math.PI) * 0.22, -1.3 + Math.sin(progress * Math.PI) * 0.9);
    });
  });
  return <>{Array.from({ length: 7 }, (_, index) => <mesh key={index} ref={(mesh) => { refs.current[index] = mesh; }}><sphereGeometry args={[0.045, 8, 8]} /><meshBasicMaterial color={index % 2 ? "#ec4899" : "#38bdf8"} /></mesh>)}</>;
}
