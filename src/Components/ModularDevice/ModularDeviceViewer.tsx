import { Stage, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DeviceAssembly from "./DeviceAssembly";
import Box from "@mui/material/Box";
// import * as THREE from "three";
import * as THREE from "three/webgpu";
// import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/nodes/WebGPURenderer';

export const ModularDeviceViewer = ({
  exploded = false,
  initialAngle = Math.PI * 0.25,
  autoRotate = true,
}) => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any);
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.setPixelRatio(devicePixelRatio);
          await renderer.init();
          return renderer;
        }}
      >
        <color attach="background" args={["#DAD5D0"]} />
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
