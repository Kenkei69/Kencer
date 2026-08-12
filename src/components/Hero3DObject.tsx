import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// A single droplet that spawns when the cursor leaves the slime
function Droplet({ position, onRemove }: { position: THREE.Vector3, onRemove: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocity = useMemo(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.1, 
    (Math.random() - 0.5) * 0.1, 
    Math.random() * 0.1 + 0.05
  ), []);
  const [scale, setScale] = useState(Math.random() * 0.15 + 0.05);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.add(velocity);
      velocity.y -= 0.005; // gravity
      setScale(s => Math.max(0, s - 0.002)); // shrink
      if (scale <= 0) {
        onRemove();
      }
    }
  });

  return (
    <Sphere ref={meshRef} args={[scale, 32, 32]} position={position}>
      <MeshDistortMaterial 
        color="#1a1a2e"
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.9}
        roughness={0.1}
        distort={0.5}
        speed={4}
      />
    </Sphere>
  );
}

function InteractiveSlime() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [drops, setDrops] = useState<{ id: number, pos: THREE.Vector3 }[]>([]);
  
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));
  const targetDistort = useRef(0.4);
  const targetSpeed = useRef(2);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x += delta * (hovered ? 0.5 : 0.2);
      meshRef.current.rotation.y += delta * (hovered ? 0.6 : 0.3);

      // Smoothly animate scale based on click/hover
      if (clicked) {
        targetScale.current.set(1.5, 1.5, 0.5); // Spread out
        targetDistort.current = 0.8;
        targetSpeed.current = 8;
      } else if (hovered) {
        targetScale.current.set(1.1, 1.1, 1.1); // Swell slightly
        targetDistort.current = 0.6;
        targetSpeed.current = 5;
      } else {
        targetScale.current.set(1, 1, 1);
        targetDistort.current = 0.4;
        targetSpeed.current = 2;
      }

      meshRef.current.scale.lerp(targetScale.current, 0.1);
      
      if (materialRef.current) {
        materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort.current, 0.1);
        materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed.current, 0.1);
      }
    }
  });

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    setHovered(false);
    setClicked(false);
    
    // Spawn drops at intersection point
    if (e.intersections.length > 0) {
      const point = e.intersections[0].point.clone();
      const newDrops = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        pos: point.clone().add(new THREE.Vector3((Math.random()-0.5)*0.5, (Math.random()-0.5)*0.5, 0))
      }));
      setDrops(prev => [...prev, ...newDrops]);
    }
  };

  const removeDrop = (id: number) => {
    setDrops(prev => prev.filter(d => d.id !== id));
  };

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere 
          args={[1.5, 128, 128]} 
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={handlePointerOut}
          onPointerDown={(e) => {
            e.stopPropagation();
            setClicked(true);
          }}
          onPointerUp={() => setClicked(false)}
        >
          <MeshDistortMaterial 
            ref={materialRef}
            color="#1a1a2e"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      
      {/* Render Droplets */}
      {drops.map(drop => (
        <Droplet key={drop.id} position={drop.pos} onRemove={() => removeDrop(drop.id)} />
      ))}
    </>
  );
}

export default function Hero3DObject() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <InteractiveSlime />
      </Canvas>
    </div>
  );
}
