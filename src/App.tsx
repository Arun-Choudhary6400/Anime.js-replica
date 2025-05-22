import { Canvas } from "@react-three/fiber";
import { GLBLoader } from "./Components/GLBLoader";
import Box from "@mui/material/Box";
import { ModularDeviceViewer } from "./Components/ModularDevice/ModularDeviceViewer";

function App() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        {/* <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <GLBLoader modelUrl="/models/module-easing-01.glb" />
        </Canvas> */}
        {/* <ModularDeviceViewer /> */}
        <ModularDeviceViewer exploded={false} autoRotate={false} />
      </Box>
    </>
  );
}

export default App;
