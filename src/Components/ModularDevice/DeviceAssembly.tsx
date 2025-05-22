import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Module, {
  EXPLODED_VIEW_CONFIG,
  MODEL_PATH_PREFIX,
  MODULES_CONFIG,
} from "./Module ";
import { useGLTF } from "@react-three/drei";

const preloadModels = () => {
  Object.keys(MODULES_CONFIG).forEach((fileName) => {
    useGLTF.preload(`${MODEL_PATH_PREFIX}${fileName}`);
  });
};

const DeviceAssembly = ({ autoRotate = true, exploded = false, angle = 0 }) => {
  const groupRef = useRef<any>(null);
  const config = exploded ? EXPLODED_VIEW_CONFIG : MODULES_CONFIG;

  // Auto-rotate the entire assembly
  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    // Set initial rotation based on angle prop
    if (groupRef.current) {
      groupRef.current.rotation.y = angle;
    }

    // Preload models
    preloadModels();
  }, [angle]);

  return (
    <group
      ref={groupRef}
      rotation-x={-Math.PI / 2}
      rotation-y={-Math.PI / 2}
      rotation-z={0}
    >
      {Object.entries(config).map(([fileName, config]) => (
        <Module
          key={fileName}
          fileName={fileName}
          config={config}
          wireframeMode="edges"
        />
      ))}
    </group>
  );
};

export default DeviceAssembly;
