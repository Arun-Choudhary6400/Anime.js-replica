import { Suspense } from "react";
import { ModelViewer } from "./ModelViewer";

export const GLBLoader: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  return (
      <Suspense fallback={"Loading model..."}>
        <ModelViewer 
          modelPath={modelUrl}
          scale={1}
        />
      </Suspense>
  );
};