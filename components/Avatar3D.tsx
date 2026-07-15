/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  isSpeaking?: boolean;
  isThinking?: boolean;
  modelUrl?: string;
}

// 3D Cybernetic Hologram Core (Brand Mark Avatar)
const CyberCore: React.FC<{ isSpeaking?: boolean; isThinking?: boolean }> = ({ isSpeaking, isThinking }) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.y += delta * (isThinking ? 2.5 : isSpeaking ? 1.5 : 0.4);
      outerRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * (isThinking ? 3.0 : 0.8);
      innerRef.current.rotation.z += delta * 0.5;
      const scale = 1 + (isSpeaking ? Math.sin(time * 12) * 0.15 : isThinking ? Math.sin(time * 6) * 0.08 : 0);
      innerRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 1.2;
      ringRef1.current.rotation.y += delta * 0.8;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 1.5;
      ringRef2.current.rotation.z += delta * 1.0;
    }
  });

  const coreColor = isThinking ? '#B87333' : isSpeaking ? '#D3D3D3' : '#7B3F00';
  const glowColor = isThinking ? '#7B3F00' : isSpeaking ? '#EDEDED' : '#B87333';

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <group>
        {/* Outer Distorted Hologram Sphere */}
        <Sphere ref={outerRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color={coreColor}
            emissive={glowColor}
            emissiveIntensity={isSpeaking ? 0.6 : isThinking ? 0.8 : 0.3}
            roughness={0.1}
            metalness={0.9}
            distort={isSpeaking ? 0.5 : isThinking ? 0.6 : 0.3}
            speed={isSpeaking ? 5 : isThinking ? 8 : 2}
            wireframe={true}
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Inner Solid Energy Core */}
        <Sphere ref={innerRef} args={[0.65, 32, 32]}>
          <meshStandardMaterial
            color={glowColor}
            emissive={coreColor}
            emissiveIntensity={isSpeaking ? 1.2 : 0.8}
            roughness={0.2}
            metalness={1.0}
          />
        </Sphere>

        {/* Orbital Ring 1 */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[1.6, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#D3D3D3"
            emissive="#EDEDED"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Orbital Ring 2 */}
        <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.9, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#7B3F00"
            emissive="#B87333"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Avatar3D: React.FC<Avatar3DProps> = ({ isSpeaking, isThinking }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#7B3F00" intensity={2} />
        <pointLight position={[10, -5, 5]} color="#D3D3D3" intensity={1} />

        <CyberCore isSpeaking={isSpeaking} isThinking={isThinking} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.5}
          autoRotate={!isSpeaking && !isThinking}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* State Badge */}
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest pointer-events-none flex items-center gap-1.5 shadow-lg"
        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}>
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse`}
          style={{ background: isThinking ? '#B87333' : isSpeaking ? '#D3D3D3' : '#7B3F00' }}
        />
        <span>{isThinking ? 'NEURAL SYNTHESIS...' : isSpeaking ? 'VOICE ACTIVE' : 'STANDBY'}</span>
      </div>
    </div>
  );
};

export default Avatar3D;
