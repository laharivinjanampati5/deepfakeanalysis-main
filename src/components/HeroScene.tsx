import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";

function ShieldCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }
    
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.3;
      ringRef1.current.rotation.y = time * 0.2;
    }
    
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -time * 0.2;
      ringRef2.current.rotation.z = time * 0.3;
    }
    
    if (ringRef3.current) {
      ringRef3.current.rotation.y = time * 0.4;
      ringRef3.current.rotation.z = -time * 0.2;
    }
  });

  const cyanColor = useMemo(() => new THREE.Color("#00f2ff"), []);
  const purpleColor = useMemo(() => new THREE.Color("#7000ff"), []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Core sphere */}
        <Sphere ref={meshRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color={cyanColor}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive={cyanColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </Sphere>

        {/* Orbital rings */}
        <Ring
          ref={ringRef1}
          args={[1.8, 1.85, 64]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color={cyanColor}
            emissive={cyanColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </Ring>

        <Ring
          ref={ringRef2}
          args={[2.2, 2.25, 64]}
          rotation={[Math.PI / 3, Math.PI / 4, 0]}
        >
          <meshStandardMaterial
            color={purpleColor}
            emissive={purpleColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </Ring>

        <Ring
          ref={ringRef3}
          args={[2.6, 2.63, 64]}
          rotation={[Math.PI / 4, 0, Math.PI / 3]}
        >
          <meshStandardMaterial
            color={cyanColor}
            emissive={cyanColor}
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </Ring>

        {/* Inner glow sphere */}
        <Sphere args={[0.8, 32, 32]}>
          <meshBasicMaterial
            color={cyanColor}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </group>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 2;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00f2ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#00f2ff"
        />
        
        <ShieldCore />
        <Particles />
      </Canvas>
    </div>
  );
};
