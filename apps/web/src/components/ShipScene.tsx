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
    <HullRim />
    <CeilingStructure />
    <PlanetWindow position={[-5.3, 1.4, -3.7]} planet="#3b82f6" accent="#38bdf8" scale={0.85} />
    <PlanetWindow position={[5.3, 1.15, -3.8]} planet="#d97706" accent="#f59e0b" scale={0.7} />
    <RoomModule position={[-4.4, 0.35, 0.9]} color="#38bdf8" label="DATA OBSERVATORY" />
    <RoomModule position={[4.4, 0.35, 0.9]} color="#34d399" label="EXCHANGE BRIDGE" />
    <RoomModule position={[0, 0.35, -4.2]} color="#ec4899" label="STRATEGY CORE" />
    <Line points={stations.map(() => [0, 0.26, 0] as [number, number, number]).concat(stations.map((station) => station.position))} color="#62519a" transparent opacity={0.3} lineWidth={1} />
    {stations.map((station) => <Station key={station.id} station={station} onClick={() => onFocus(station.id)} />)}
    <AnimatedAgent index={0} kind="robot" position={[-1.7, 0.55, 1.3]} color="#38bdf8" onClick={() => onFocus("research")} reducedMotion={reducedMotion} />
    <AnimatedAgent index={1} kind="hologram" position={[0, 0.55, 1.9]} color="#ec4899" onClick={() => onFocus("analysis")} reducedMotion={reducedMotion} />
    <AnimatedAgent index={2} kind="crew" position={[1.7, 0.55, 1.3]} color="#34d399" onClick={() => onFocus("portfolio")} reducedMotion={reducedMotion} />
    <TelemetryBeads reducedMotion={reducedMotion} />
  </group>;
}

function RoomModule({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  return <group position={position}><mesh><boxGeometry args={[1.9, 0.55, 1.1]} /><meshStandardMaterial color="#11101f" emissive={color} emissiveIntensity={0.18} metalness={0.8} roughness={0.35} /></mesh><mesh position={[0, 0.31, 0]}><boxGeometry args={[1.45, 0.025, 0.55]} /><meshBasicMaterial color={color} transparent opacity={0.7} /></mesh><mesh position={[0, 0.62, 0]}><torusGeometry args={[0.4, 0.02, 6, 24]} /><meshBasicMaterial color={color} /></mesh><mesh position={[0, 0.63, -0.54]}><boxGeometry args={[0.72, 0.95, 0.06]} /><meshStandardMaterial color="#202038" emissive={color} emissiveIntensity={0.18} metalness={0.6} /></mesh><mesh position={[-0.43, 0.63, -0.54]}><boxGeometry args={[0.035, 1.1, 0.08]} /><meshBasicMaterial color={color} /></mesh><mesh position={[0.43, 0.63, -0.54]}><boxGeometry args={[0.035, 1.1, 0.08]} /><meshBasicMaterial color={color} /></mesh><Html center distanceFactor={9} position={[0, 0.78, 0]}><span className="ship-room-label" style={{ color }}>{label}</span></Html></group>;
}

function HullRim() {
  return <group><mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}><torusGeometry args={[5.8, 0.08, 10, 96]} /><meshStandardMaterial color="#221b3d" emissive="#5d48a1" emissiveIntensity={0.45} metalness={0.9} roughness={0.25} /></mesh><mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.18, 0]}><torusGeometry args={[6.25, 0.025, 8, 96]} /><meshBasicMaterial color="#38bdf8" transparent opacity={0.45} /></mesh></group>;
}

function CeilingStructure() {
  return <group position={[0, 2.4, -0.7]} rotation={[0.15, 0, 0]}><mesh><boxGeometry args={[9.5, 0.08, 0.08]} /><meshStandardMaterial color="#2c2650" metalness={0.9} roughness={0.3} /></mesh><mesh position={[-3.4, 0, 0]}><boxGeometry args={[0.08, 0.08, 5.8]} /><meshStandardMaterial color="#2c2650" metalness={0.9} roughness={0.3} /></mesh><mesh position={[3.4, 0, 0]}><boxGeometry args={[0.08, 0.08, 5.8]} /><meshStandardMaterial color="#2c2650" metalness={0.9} roughness={0.3} /></mesh><mesh position={[0, 0, -2.2]}><boxGeometry args={[7.2, 0.05, 0.05]} /><meshBasicMaterial color="#a78bfa" transparent opacity={0.65} /></mesh></group>;
}

function PlanetWindow({ position, planet, accent, scale }: { position: [number, number, number]; planet: string; accent: string; scale: number }) {
  return <group position={position} scale={scale}><mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[1.2, 0.08, 12, 48]} /><meshStandardMaterial color="#25203d" emissive={accent} emissiveIntensity={0.25} metalness={0.9} /></mesh><mesh position={[0, 0, 0.03]}><sphereGeometry args={[0.82, 32, 20]} /><meshStandardMaterial color={planet} emissive={planet} emissiveIntensity={0.12} roughness={0.75} /></mesh><mesh position={[0, 0, 0.08]}><sphereGeometry args={[0.9, 32, 20]} /><meshBasicMaterial color={accent} transparent opacity={0.12} side={THREE.BackSide} /></mesh><mesh position={[0.8, 0.05, -0.05]} rotation={[0.2, 0.3, 0.4]}><torusGeometry args={[1.05, 0.018, 6, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.65} /></mesh></group>;
}

function Station({ station, onClick }: { station: typeof stations[number]; onClick: () => void }) {
  return <group position={station.position} onClick={(event) => { event.stopPropagation(); onClick(); }}>
    <mesh position={[0, 0.45, 0]}><boxGeometry args={[2.2, 1.2, 1.65]} /><meshBasicMaterial transparent opacity={0.01} depthWrite={false} /></mesh>
    <mesh><cylinderGeometry args={[0.9, 1.1, 0.24, 32]} /><meshStandardMaterial color="#151126" emissive={station.color} emissiveIntensity={0.22} metalness={0.75} roughness={0.3} /></mesh>
    <mesh position={[0, 0.16, 0]}><torusGeometry args={[0.78, 0.025, 8, 48]} /><meshBasicMaterial color={station.color} /></mesh>
    <mesh position={[0, 0.52, 0]}><octahedronGeometry args={[0.35, 1]} /><meshStandardMaterial color={station.color} emissive={station.color} emissiveIntensity={1.1} metalness={0.5} roughness={0.2} /></mesh>
    <Html center distanceFactor={8} position={[0, 0.9, 0]}><button className="ship-label" onClick={onClick} type="button"><span className="ship-label-dot" style={{ background: station.color }} />{station.label}</button></Html>
  </group>;
}

function AnimatedAgent({ index, kind, position, color, onClick, reducedMotion }: { index: number; kind: "robot" | "hologram" | "crew"; position: [number, number, number]; color: string; onClick: () => void; reducedMotion: boolean }) {
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
    <mesh position={[0, 0.35, 0]}><sphereGeometry args={[0.55, 12, 8]} /><meshBasicMaterial transparent opacity={0.01} depthWrite={false} /></mesh>
    {kind === "robot" && <><mesh position={[0, 0.27, 0]}><boxGeometry args={[0.34, 0.5, 0.3]} /><meshStandardMaterial color="#c9d4e9" emissive={color} emissiveIntensity={0.3} metalness={0.7} roughness={0.25} /></mesh><mesh position={[0, 0.68, 0]}><boxGeometry args={[0.3, 0.24, 0.28]} /><meshStandardMaterial color="#dce9ff" emissive={color} emissiveIntensity={0.7} /></mesh><mesh position={[0, 0.69, 0.15]}><boxGeometry args={[0.14, 0.035, 0.02]} /><meshBasicMaterial color={color} /></mesh></>}
    {kind === "hologram" && <><mesh position={[0, 0.33, 0]}><cylinderGeometry args={[0.22, 0.32, 0.58, 16]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} transparent opacity={0.5} /></mesh><mesh position={[0, 0.73, 0]}><sphereGeometry args={[0.2, 16, 12]} /><meshStandardMaterial color="#f5eaff" emissive={color} emissiveIntensity={2} transparent opacity={0.72} /></mesh><mesh position={[0, 0.33, 0]}><torusGeometry args={[0.34, 0.018, 6, 32]} /><meshBasicMaterial color={color} /></mesh></>}
    {kind === "crew" && <><mesh position={[0, 0.28, 0]}><capsuleGeometry args={[0.2, 0.42, 8, 16]} /><meshStandardMaterial color="#dcd5ff" emissive={color} emissiveIntensity={0.3} metalness={0.5} roughness={0.24} /></mesh><mesh position={[0, 0.68, 0]}><sphereGeometry args={[0.18, 16, 12]} /><meshStandardMaterial color="#f2eeff" emissive={color} emissiveIntensity={1.5} /></mesh><mesh position={[-0.27, 0.3, 0]} rotation={[0, 0, -0.25]}><capsuleGeometry args={[0.05, 0.25, 6, 8]} /><meshStandardMaterial color="#dcd5ff" /></mesh><mesh position={[0.27, 0.3, 0]} rotation={[0, 0, 0.25]}><capsuleGeometry args={[0.05, 0.25, 6, 8]} /><meshStandardMaterial color="#dcd5ff" /></mesh></>}
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
