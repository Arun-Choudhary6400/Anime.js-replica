import { Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DeviceAssembly from "./DeviceAssembly";
import Box from "@mui/material/Box";

export const ModularDeviceViewer = ({
  exploded = false,
  initialAngle = Math.PI * 0.25,
  autoRotate = true,
  backgroundColor = "#242424",
}) => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Canvas shadows dpr={[1, 2]} style={{backgroundColor: "#242424"}}>
        <color attach="background" args={[backgroundColor]} />
        <PerspectiveCamera
          makeDefault
          position={[0, 0, exploded ? 15 : 6]}
          fov={50}
        />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Suspense fallback={"Loading..."}>
          <Stage
            preset="rembrandt"
            intensity={0.5}
            environment="city"
            shadows={false}
          >
            <DeviceAssembly
              exploded={exploded}
              autoRotate={autoRotate}
              angle={initialAngle}
            />
          </Stage>
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          // minPolarAngle={Math.PI / 6}
          // maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </Box>
  );
};
