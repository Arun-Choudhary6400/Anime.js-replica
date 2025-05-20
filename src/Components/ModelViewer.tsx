import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { Group } from 'three';

// Define props interface for our GLB loader component
interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  autoRotate?: boolean;
  enableZoom?: boolean;
  rotationSpeed?: number;
  environmentPreset?: 'apartment' | 'city' | 'dawn' | 'forest' | 'lobby' | 'night' | 'park' | 'studio' | 'sunset' | 'warehouse';
}

// Create the Model component that will load and render the GLB
const Model: React.FC<{ url: string; scale?: number; position?: [number, number, number] }> = ({ 
  url, 
  scale = 1, 
  position = [0, 0, 0] 
}) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} />;
};

// Main ModelViewer component
export const ModelViewer: React.FC<ModelViewerProps> = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  autoRotate = false,
  enableZoom = true,
  rotationSpeed = 0.01,
  environmentPreset = 'studio'
}) => {
  const groupRef = useRef<Group>(null);

  // Handle auto-rotation if enabled
  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <>
      <Environment preset={environmentPreset} />
      
      {/* Simple group with ref for rotation */}
      <group ref={groupRef}>
        <Model url={modelPath} scale={scale} position={position} />
      </group>
      
      {/* Use OrbitControls for camera interaction */}
      <OrbitControls 
        enableZoom={enableZoom} 
        autoRotate={autoRotate} 
        autoRotateSpeed={2} 
      />
    </>
  );
};