import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Liquid Droplet
function Droplet({ position, onRemove }: { position: THREE.Vector3, onRemove: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocity = useMemo(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.2, 
    (Math.random() - 0.5) * 0.2, 
    Math.random() * 0.2 + 0.1
  ), []);
  const [scale, setScale] = useState(Math.random() * 0.2 + 0.1);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.add(velocity);
      velocity.y -= 0.008; // gravity
      setScale(s => Math.max(0, s - 0.003)); // shrink rapidly
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
        distort={0.6}
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
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 1. Core rotation
      meshRef.current.rotation.x += delta * (hovered ? 0.8 : 0.2);
      meshRef.current.rotation.y += delta * (hovered ? 1.0 : 0.3);

      // 2. Map mouse position to 3D space if hovered
      if (hovered || clicked) {
        // Calculate target position based on viewport and pointer
        const targetX = (state.pointer.x * state.viewport.width) / 2;
        const targetY = (state.pointer.y * state.viewport.height) / 2;
        mousePos.current.set(targetX, targetY, 0);
        
        // Slime slightly follows the mouse
        meshRef.current.position.lerp(mousePos.current.clone().multiplyScalar(0.2), 0.1);
      } else {
        // Return to center
        meshRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }

      // 3. Smooth scale and distortion animation
      let targetDistort = 0.4;
      let targetSpeed = 2;

      if (clicked) {
        targetScale.current.set(2.0, 2.0, 0.2); // Spread out extremely wide like a puddle
        targetDistort = 1.0;
        targetSpeed = 10;
      } else if (hovered) {
        targetScale.current.set(1.2, 1.2, 1.2); // Swell up towards the cursor
        targetDistort = 0.8;
        targetSpeed = 6;
      } else {
        targetScale.current.set(1, 1, 1);
        targetDistort = 0.4;
        targetSpeed = 2;
      }

      meshRef.current.scale.lerp(targetScale.current, 0.1);
      
      if (materialRef.current) {
        materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1);
        materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.1);
      }
    }
  });

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    setHovered(false);
    setClicked(false);
    
    // Spawn drops at the edge where the cursor left
    if (e.intersections.length > 0) {
      const point = e.intersections[0].point.clone();
      const newDrops = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        pos: point.clone().add(new THREE.Vector3((Math.random()-0.5), (Math.random()-0.5), (Math.random()-0.5)))
      }));
      setDrops(prev => [...prev, ...newDrops]);
    } else {
      // Fallback spawn position if intersection fails
      const newDrops = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        pos: meshRef.current!.position.clone().add(new THREE.Vector3((Math.random()-0.5)*2, (Math.random()-0.5)*2, 1))
      }));
      setDrops(prev => [...prev, ...newDrops]);
    }
  };

  return (
    <>
      {/* Invisible plane to catch mouse movements across the whole screen so it doesn't instantly lose hover */}
      <mesh 
        position={[0, 0, -2]} 
        onPointerMove={(e) => {
          // Keep it interactive even if mouse slips off the sphere slightly
          if (hovered) e.stopPropagation();
        }}
        visible={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>

      <Trail
        width={hovered ? 2 : 0} // Only show trail when interacting
        length={4}
        color={new THREE.Color('#1a1a2e')}
        attenuation={(t) => t * t}
      >
        <Sphere 
          args={[1.5, 256, 256]} 
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'crosshair';
          }}
          onPointerOut={(e) => {
            handlePointerOut(e);
            document.body.style.cursor = 'auto';
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setClicked(true);
          }}
          onPointerUp={() => setClicked(false)}
        >
          <MeshDistortMaterial 
            ref={materialRef}
            color="#1a1a2e"
            envMapIntensity={2.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Trail>
      
      {/* Render Droplets */}
      {drops.map(drop => (
        <Droplet key={drop.id} position={drop.pos} onRemove={() => setDrops(prev => prev.filter(d => d.id !== drop.id))} />
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
