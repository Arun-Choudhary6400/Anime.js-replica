import { useMemo } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  position?: [number, number, number];
  clippingPlanes?: THREE.Plane[];
  slice?: number;
}

function ClippedModelPiece({
  position = [0, 0, 0],
  clippingPlanes = [],
  slice = 0,
  ...props
}: ModelProps) {
  const { nodes, materials } = useGLTF("/models/module-shield-02.glb") as unknown as {
    nodes: { Mesh_0: THREE.Mesh };
    materials: { [key: string]: THREE.Material };
  };

  // Create material with clipping planes
  const clippedMaterial = useMemo(() => {
    const originalMaterial = materials[
      "Material_0.1001"
    ] as THREE.MeshStandardMaterial;
    return new THREE.MeshStandardMaterial({
      map: originalMaterial.map,
      roughness: originalMaterial.roughness,
      metalness: originalMaterial.metalness,
      clippingPlanes: clippingPlanes,
      clipShadows: true,
      side: THREE.DoubleSide,
      // Add slight color variation for each slice to visualize better
      color: new THREE.Color().setHSL((slice * 0.07) % 1, 0.6, 0.7),
    });
  }, [clippingPlanes, slice, materials]);

  return (
    <group {...props} position={position} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={clippedMaterial}
      />
    </group>
  );
}

function ClippedModel() {
  const numberOfSlices = 15;
  const spacing = 0.3; // Space between pieces

  // Create clipping planes for vertical slicing
  const slicesData = useMemo(() => {
    const slices = [];
    const sliceWidth = 2.0 / numberOfSlices; // Assuming model width is roughly 2 units

    for (let i = 0; i < numberOfSlices; i++) {
      const leftX = -1 + i * sliceWidth;
      const rightX = -1 + (i + 1) * sliceWidth;

      // Create two clipping planes for each slice
      const leftPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), -leftX);
      const rightPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), rightX);

      // Position for this slice (spread them out horizontally)
      const xPosition = (i - (numberOfSlices - 1) / 2) * spacing;

      slices.push({
        clippingPlanes: [leftPlane, rightPlane],
        position: [xPosition, 0, 0] as [number, number, number],
        slice: i,
      });
    }

    return slices;
  }, [numberOfSlices, spacing]);

  return (
    <>
      {slicesData.map((sliceData, index) => (
        <ClippedModelPiece
          key={index}
          position={sliceData.position}
          clippingPlanes={sliceData.clippingPlanes}
          slice={sliceData.slice}
        />
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />

      {/* The clipped model */}
      <ClippedModel />

      {/* Ground plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshLambertMaterial color="#f0f0f0" />
      </mesh>

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function ClippedModelViewer() {
  return <Scene />;
}

// Preload the model
useGLTF.preload("/models/module-shield-02.glb");
