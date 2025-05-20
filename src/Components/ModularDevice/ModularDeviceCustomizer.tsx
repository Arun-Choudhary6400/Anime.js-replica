import { Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, Suspense } from "react";
import Module, { MODULES_CONFIG } from "./Module ";
import Box from "@mui/material/Box";

export const ModularDeviceCustomizer = ({
  modelHeight = 4,
  spacing = 0.15,
  scale = 1,
  autoRotate = true,
  backgroundColor = "#111",
  lighting = "rembrandt",
  cameraPosition = [0, 1.5, 4] as [number, number, number],
  camerafov = 50,
}) => {
  // Calculate dynamic positions based on height and spacing
  const [customConfig, setCustomConfig] = useState({});

  useEffect(() => {
    // Dynamically position modules based on inputs
    const moduleNames = Object.keys(MODULES_CONFIG);
    const totalModules = moduleNames.length;
    const newConfig: any = {};

    moduleNames.forEach((fileName, index) => {
      const yPos =
        index * spacing - (totalModules * spacing) / 2 + modelHeight / 2;
      newConfig[fileName] = {
        position: [0, yPos, 0],
        rotation: [0, 0, 0],
        scale,
      };
    });

    setCustomConfig(newConfig);
  }, [modelHeight, spacing, scale]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={[backgroundColor]} />
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={camerafov}
        />
        <Suspense fallback={"Loading..."}>
          <Stage intensity={1} environment="city">
            <group>
              {Object.entries(customConfig).map(([fileName, config]) => (
                <Module key={fileName} fileName={fileName} config={config} />
              ))}
            </group>
          </Stage>
        </Suspense>
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          enablePan={true}
          enableZoom={true}
        />
      </Canvas>
    </Box>
  );
};
