import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { animate, createScope, createSpring, createDraggable } from "animejs";
import { useFrame } from "@react-three/fiber";

// Path prefix for all models
export const MODEL_PATH_PREFIX = "/models/";

// Module configs with positions, rotations, and scales
// These will need to be adjusted based on the actual model dimensions and desired layout
export const MODULES_CONFIG = {
  // Middle timer section
  "module-animate-01.glb": {
    position: [0, 3.77, 0],
    rotation: [Math.PI / 2, 0, Math.PI / 4],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-easing-01.glb": {
    position: [-0.06, 3.77, -0.9],
    rotation: [Math.PI / 2, 0, Math.PI / 1],
    scale: 1,
    group: "middle",
    multiple: true,
    otherPositions: [
      [-0.04, 3.77, -0.905],
      [-0.077, 3.77, -0.915],
      [-0.115, 3.77, -0.92],
      [-0.157, 3.77, -0.925],
      [-0.2, 3.77, -0.93],
      [-0.245, 3.77, -0.935],
      [-0.295, 3.77, -0.95],
      [-0.325, 3.77, -0.92],
      [-0.355, 3.77, -0.89],
      [-0.385, 3.77, -0.86],
      [-0.415, 3.77, -0.83],
      [-0.44, 3.77, -0.8],
      [-0.465, 3.77, -0.775],
    ],
    otherRotation: [
      [Math.PI / 2, 0, Math.PI / 1 - 0.12],
      [Math.PI / 2, 0, Math.PI / 1 - 0.16],
      [Math.PI / 2, 0, Math.PI / 1 - 0.2],
      [Math.PI / 2, 0, Math.PI / 1 - 0.24],
      [Math.PI / 2, 0, Math.PI / 1 - 0.28],
      [Math.PI / 2, 0, Math.PI / 1 - 0.32],
      [Math.PI / 2, 0, Math.PI / 1 - 0.36],
      [Math.PI / 2, 0, Math.PI / 1 - 0.4],
      [Math.PI / 2, 0, Math.PI / 1 - 0.44],
      [Math.PI / 2, 0, Math.PI / 1 - 0.48],
      [Math.PI / 2, 0, Math.PI / 1 - 0.52],
      [Math.PI / 2, 0, Math.PI / 1 - 0.56],
      [Math.PI / 2, 0, Math.PI / 1 - 0.6],
    ],
    animation: "bounceZ", // give it a new animation type
    bounceHeight: 0.035, // how far (in world units) it will move
    bouncePeriod: 2, // how long (in seconds) one full in-and-out takes
    staggerDelay: 0.1,
  },
  "module-timer-01.glb": {
    position: [0, 3.1, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    stepAngle: 6,
    animation: "clockTick",
    delay: 1,
  }, // corrected position
  "module-timer-02.glb": {
    position: [0, 3.26, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    animation: "spinZ",
    speed: 0.3,
  }, // corrected position
  "module-timer-03.glb": {
    position: [0.53, 3.03, -0.125],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    animation: "spinZ",
    speed: 1,
    direction: "left",
  }, // corrected position
  "module-timer-04.glb": {
    position: [-0.02, 3.03, -0.54],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    animation: "spinZ",
    speed: 1,
  }, // corrected position
  "module-timer-05.glb": {
    position: [0, 2.93, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-spring-01.glb": {
    position: [0, 2.8, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    stepAngle: Math.PI / 4,
    animation: "clockTick",
    delay: 1,
    direction: "right",
  }, // corrected position

  // Upper animation modules
  "module-renderer-01.glb": {
    position: [0, 0.6, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position first part from left
  "module-waapi-01.glb": {
    position: [0, 1.1, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-timeline-01.glb": {
    position: [0, 1.7, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-timeline-02.glb": {
    position: [0, 1.95, -0.68],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
    multiple: true,
    otherPositions: [
      [0, 2.05, -0.68],
      [0.48, 2.05, -0.48],
      [0.68, 2.05, 0],
      [0.48, 2.05, 0.48],
      [0, 2.05, 0.68],
      [-0.48, 2.05, 0.48],
      [-0.68, 2.05, 0],
      [-0.48, 2.05, -0.48],
    ],
    otherRotation: [
      [Math.PI / 2, 0, 0],
      [Math.PI / 2, 0, Math.PI / 4],
      [Math.PI / 2, 0, Math.PI / 2],
      [Math.PI / 2, 0, Math.PI / 1.35],
      [Math.PI / 2, 0, 0],
      [Math.PI / 2, 0, Math.PI / 4],
      [Math.PI / 2, 0, Math.PI / 2],
      [Math.PI / 2, 0, Math.PI / 1.2],
    ],
    animation: "bounceY",
    bounceHeight: -0.16,
    bouncePeriod: 2,
    staggerDelay: 0.22,
  }, // corrected position
  "module-svg-01.glb": {
    position: [0, 2.6, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
    speed: 0.4,
    animation: "spinZ",
    // animation: "svg",
  }, // corrected position
  "module-stagger-01.glb": {
    position: [0, 2.25, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-stagger-02.glb": {
    position: [0, 2.085, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
    multiple: true,
    otherPositions: [
      [0, 2.18, 0],
      [0, 2.28, 0],
      [0, 2.37, 0],
      [0, 2.465, 0],
    ],
    animation: "bounceY",
    bounceHeight: -0.075,
    bouncePeriod: 2,
    staggerDelay: 0.22,
  }, // corrected position multuple 4x

  // Other modules positioned according to the diagram
  "module-draggable-01.glb": {
    position: [0, 4.38, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-draggable-02.glb": {
    position: [0, 4.38, -0.9],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    multiple: true,
    otherPositions: [
      [0, 4.38, -0.9],
      [-0.325, 4.38, -0.84],
      [-0.605, 4.38, -0.665],
      [-0.805, 4.38, -0.4],
      [-0.895, 4.38, -0.084],
    ],
    otherRotation: [
      [Math.PI / 2, 0, Math.PI],
      [Math.PI / 2, 0, (Math.PI * 4.45) / 5],
      [Math.PI / 2, 0, (Math.PI * 3.85) / 5],
      [Math.PI / 2, 0, (Math.PI * 3.25) / 5],
      [Math.PI / 2, 0, (Math.PI * 2.65) / 5],
    ], // Add animation properties
    pivot: [0, 4.38, 0], // centre point of the circle
    animation: "orbitY",
    orbitSpeed: (2 * Math.PI) / 1.5, // rad/s → one full turn in 10 s
    orbitRadius: 1, // 1 unit = 10 cm
    staggerDelay: -0.2, // 0.2 s between each clone's start
    loopDelay: 1.3,
    facePivot: true,
  }, // corrected position NEED MULTIPLE 5x

  "module-engine-01.glb": {
    position: [0, 5.6, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "base",
    animation: "spinZ",
    speed: 0.1,
  }, // corrected position
  "module-scope-01.glb": {
    position: [0, 5.59, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "base",
  }, // corrected position
  "module-scroll-01.glb": {
    position: [0, 4.8, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "base",
    animation: "spinZ",
    speed: 0.2,
  }, // corrected position
  // 'module-shield-01.glb': { position: [0, -1.9, 0], rotation: [Math.PI / 2, 0, 0], scale: 1, group: 'base' },
  // 'module-shield-02.glb': { position: [0, -3.5, 0], rotation: [Math.PI / 2, 0, 0], scale: 1, group: 'base' },
};

// Alternatively, structure the device more like the cylindrical device in the image
// This structure stacks modules vertically in a way that resembles the image more closely
export const EXPLODED_VIEW_CONFIG = {
  // Middle timer section
  "module-animate-01.glb": {
    position: [0, 3.77, 0],
    rotation: [Math.PI / 2, 0, Math.PI / 4],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-easing-01.glb": {
    position: [-0.06, 3.77, -0.9],
    rotation: [Math.PI / 2, 0, Math.PI / 1],
    scale: 1,
    group: "middle",
  }, // corrected position NEED MULTIPLE 13x or 15x
  "module-draggable-01.glb": {
    position: [0, 4.38, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-draggable-02.glb": {
    position: [0, 4.38, -0.9],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    animation: "circularStagger",
    duration: 10000, // ms for one full revolution
    staggerDelay: 0.2, // seconds
    pivot: [0, 4.38, -0.45],
  }, // corrected position NEED MULTIPLE 5x
  "module-timer-01.glb": {
    position: [0, 3.1, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-timer-02.glb": {
    position: [0, 3.26, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-timer-03.glb": {
    position: [0.53, 3.03, -0.125],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-timer-04.glb": {
    position: [-0.02, 3.03, -0.54],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-timer-05.glb": {
    position: [0, 2.93, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-spring-01.glb": {
    position: [0, 2.8, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
  }, // corrected position

  // Upper animation modules
  "module-renderer-01.glb": {
    position: [0, 0.6, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position first part from left
  "module-waapi-01.glb": {
    position: [0, 0.95, 0],
    rotation: [0, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-timeline-01.glb": {
    position: [0, 1.7, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-timeline-02.glb": {
    position: [0, 1.95, -0.68],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-svg-01.glb": {
    position: [0, 2.6, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-stagger-01.glb": {
    position: [0, 2.25, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position
  "module-stagger-02.glb": {
    position: [0, 2.085, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
  }, // corrected position

  // Other modules positioned according to the diagram
  "module-engine-01.glb": {
    position: [0, 5.6, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "base",
  }, // corrected position
  "module-scope-01.glb": {
    position: [0, 6.14, 0],
    rotation: [0, 0, 0],
    scale: 1,
    group: "base",
  }, // corrected position
  "module-scroll-01.glb": {
    position: [0, 4.8, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "base",
  }, // corrected position
};

// Wireframe mode types
type WireframeMode = "normal" | "wireframe" | "edges" | "outlined";

// Individual module component
const Module = ({
  fileName,
  config,
  wireframeMode = "normal",
}: {
  fileName: string;
  config: any;
  wireframeMode?: WireframeMode;
}) => {
  const meshRef = useRef<THREE.Object3D>(null!);
  const meshRefs = useRef<THREE.Object3D[]>([]);
  const { scene: original } = useGLTF(`${MODEL_PATH_PREFIX}${fileName}`);
  const { position, scale, multiple, otherPositions, otherRotation } = config;

  // Store original geometry reference
  const originalGeometry = useRef<THREE.BufferGeometry | null>(null);
  const originalBounds = useRef<THREE.Box3 | null>(null);
  const morphProgress = useRef(0);
  const morphDirection = useRef(1);
  const currentShapeIndex = useRef(0);
  const nextShapeIndex = useRef(1);
  const shapeDuration = 2; // seconds per shape
  const shapeTimer = useRef(0);
  const targetGeometry = useRef<THREE.BufferGeometry | null>(null);

  // Pre-compute the static offsets from pivot → initial location
  const initialOffsets = useMemo(() => {
    if (config.animation === "orbitY" && config.multiple && config.pivot) {
      const pv = new THREE.Vector3(...config.pivot);
      return config.otherPositions.map((pos: number[]) =>
        new THREE.Vector3(...pos).sub(pv)
      );
    }
    return [];
  }, [config]);

  const initialRotations = useMemo(() => {
    if (config.animation === "orbitY" && config.multiple) {
      return config.otherRotation.map((r: number[]) => new THREE.Euler(...r));
    }
    return [];
  }, [config]);

  // Wireframe materials
  const wireframeMaterials = useMemo(
    () => ({
      normal: new THREE.MeshToonMaterial({
        color: "darkgray",
        toneMapped: true,
        // flatShading: true,
        // roughness: 1,
        // metalness: 0,
      }),
      wireframe: new THREE.MeshBasicMaterial({
        color: 0x252423,
        wireframe: true,
        transparent: false,
      }),
      background: new THREE.MeshBasicMaterial({
        color: 0xdad5d0,
        // blending: 3,
        wireframeLinewidth: 1,
        reflectivity: 1,
        refractionRatio: 0.98,
        lightMapIntensity: 1,
        aoMapIntensity: 1,
        wireframeLinejoin: "round",
        wireframeLinecap: "round",
        transparent: false,
        opacity: 1,
      }),
      edges: new THREE.LineBasicMaterial({
        color: 0x252423,
        linewidth: 1,
        linecap: "round",
        linejoin: "round",
        depthTest: true, // Ensure proper depth testing
      }),
      outline: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
        transparent: false, // Make opaque
        opacity: 1,
      }),
    }),
    []
  );

  // Function to apply wireframe effect to a mesh
  const applyWireframeEffect = (mesh: THREE.Mesh, parent: THREE.Object3D) => {
    // Remove existing wireframe children
    const existingWireframes = parent.children.filter(
      (child) => child.userData.isWireframe || child.userData.isEdgeLines
    );
    existingWireframes.forEach((child) => {
      if (
        (child as THREE.Mesh).geometry ||
        (child as THREE.LineSegments).geometry
      ) {
        (
          (child as THREE.Mesh).geometry ||
          (child as THREE.LineSegments).geometry
        ).dispose();
      }
      parent.remove(child);
    });

    switch (wireframeMode) {
      case "normal":
        mesh.material = wireframeMaterials.normal;
        break;

      case "wireframe":
        mesh.material = wireframeMaterials.wireframe;
        break;

      case "edges":
        // Set background material (opaque white)
        mesh.material = wireframeMaterials.background;

        // Create and add edge lines
        const edges = new THREE.EdgesGeometry(mesh.geometry, 30);
        const edgeLines = new THREE.LineSegments(
          edges,
          wireframeMaterials.edges
        );
        edgeLines.userData.isEdgeLines = true;

        // Ensure edge lines render on top but still respect depth
        edgeLines.renderOrder = 1;
        edgeLines.material.depthTest = true;
        edgeLines.material.depthWrite = false; // Don't write to depth buffer to avoid z-fighting

        parent.add(edgeLines);
        break;

      case "outlined":
        // Set white background (opaque)
        mesh.material = wireframeMaterials.background;

        // Create outline effect
        const outlineMesh = mesh.clone();
        outlineMesh.material = wireframeMaterials.outline;
        outlineMesh.scale.multiplyScalar(1.02);
        outlineMesh.userData.isWireframe = true;
        parent.add(outlineMesh);

        // Add edge lines for definition
        const outlineEdges = new THREE.EdgesGeometry(mesh.geometry, 30);
        const outlineLines = new THREE.LineSegments(
          outlineEdges,
          wireframeMaterials.edges
        );
        outlineLines.userData.isEdgeLines = true;
        outlineLines.renderOrder = 1;
        outlineLines.material.depthTest = true;
        outlineLines.material.depthWrite = false;
        parent.add(outlineLines);
        break;
    }
  };

  const scene = useMemo(() => {
    const cloned = original.clone(true); // deep clone

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Store original material for reference
        mesh.userData.originalMaterial = mesh.material;

        // IMPORTANT: tell Three.js to rebuild normals for flat shading
        mesh.geometry = mesh.geometry.toNonIndexed(); // ensure unique verts
        mesh.geometry.computeVertexNormals();

        // Apply wireframe effect
        applyWireframeEffect(mesh, mesh.parent || cloned);
      }
    });

    return cloned;
  }, [original, wireframeMode, wireframeMaterials]);

  // Update wireframe when mode changes
  useEffect(() => {
    if (!meshRef.current) return;

    meshRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        applyWireframeEffect(mesh, mesh.parent || meshRef.current);
      }
    });

    // Also update multiple instances
    meshRefs.current.forEach((meshGroup) => {
      if (!meshGroup) return;
      meshGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          applyWireframeEffect(mesh, mesh.parent || meshGroup);
        }
      });
    });
  }, [wireframeMode, wireframeMaterials]);

  const createShapeGeometries = (originalWidth: number) => {
    const shapes: THREE.BufferGeometry[] = [];

    // 1. Star shape
    shapes.push(createStarShape(originalWidth));

    // 3. Triangle
    shapes.push(createTriangleShape(originalWidth));

    // 4. Rounded square
    shapes.push(createRoundedSquareShape(originalWidth));

    // 5. Pentagon
    shapes.push(createPolygonShape(originalWidth, 5));

    // 6. Hexagon
    shapes.push(createPolygonShape(originalWidth, 6));

    // 7. Cross
    shapes.push(createCrossShape(originalWidth));

    // 8. Gear/flower
    shapes.push(createGearShape(originalWidth));

    // 9. Diamond
    shapes.push(createDiamondShape(originalWidth));

    // 10. Wave/spiral
    shapes.push(createWaveShape(originalWidth));

    return shapes;
  };

  // Define all the shape creation functions
  const createStarShape = (originalWidth: number) => {
    const shape = new THREE.Shape();

    const numPoints = 5;
    const outerRadius = originalWidth / 2.8;
    const innerRadius = outerRadius * 2.8;

    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / numPoints) * i + Math.PI / 2;

      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  const createTriangleShape = (originalWidth: number) => {
    const shape = new THREE.Shape();
    const size = originalWidth / 2;

    shape.moveTo(0, size);
    shape.lineTo(-size, -size * 0.5);
    shape.lineTo(size, -size * 0.5);
    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  const createRoundedSquareShape = (originalWidth: number) => {
    const shape = new THREE.Shape();
    const size = originalWidth / 2.5;
    const radius = size * 2.5;

    // Top right corner
    shape.moveTo(size - radius, size);
    shape.lineTo(-size + radius, size);

    // Top left corner
    shape.quadraticCurveTo(-size, size, -size, size - radius);
    shape.lineTo(-size, -size + radius);

    // Bottom left corner
    shape.quadraticCurveTo(-size, -size, -size + radius, -size);
    shape.lineTo(size - radius, -size);

    // Bottom right corner
    shape.quadraticCurveTo(size, -size, size, -size + radius);
    shape.lineTo(size, size - radius);

    // Top right corner
    shape.quadraticCurveTo(size, size, size - radius, size);

    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  const createPolygonShape = (originalWidth: number, sides: number) => {
    const shape = new THREE.Shape();
    const size = originalWidth / 2.2;

    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  const createCrossShape = (originalWidth: number) => {
    const shape = new THREE.Shape();
    const size = originalWidth / 2;
    const armWidth = size * 2;

    // Top arm
    shape.moveTo(-armWidth, armWidth);
    shape.lineTo(-armWidth, size);
    shape.lineTo(armWidth, size);
    shape.lineTo(armWidth, armWidth);

    // Right arm
    shape.lineTo(size, armWidth);
    shape.lineTo(size, -armWidth);
    shape.lineTo(armWidth, -armWidth);

    // Bottom arm
    shape.lineTo(armWidth, -size);
    shape.lineTo(-armWidth, -size);
    shape.lineTo(-armWidth, -armWidth);

    // Left arm
    shape.lineTo(-size, -armWidth);
    shape.lineTo(-size, armWidth);

    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  const createGearShape = (originalWidth: number) => {
    const shape = new THREE.Shape();
    const size = originalWidth / 2.2;
    const petalCount = 8;
    const innerRadius = size * 2;
    const outerRadius = size;

    for (let i = 0; i < petalCount * 2; i++) {
      const angle = (Math.PI * i) / petalCount;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  const createDiamondShape = (originalWidth: number) => {
    const shape = new THREE.Shape();
    const size = originalWidth / 2;

    shape.moveTo(0, size);
    shape.lineTo(size * 0.8, 0);
    shape.lineTo(0, -size);
    shape.lineTo(-size * 0.8, 0);

    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  const createWaveShape = (originalWidth: number) => {
    const shape = new THREE.Shape();
    const size = originalWidth / 2;
    const waveCount = 12;

    shape.moveTo(size * 0.8, 0);

    // Create a wavy circle
    for (let i = 0; i <= waveCount; i++) {
      const angle = (Math.PI * 2 * i) / waveCount;
      const radius = size * (0.7 + 0.3 * Math.sin(angle * 3));
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    shape.closePath();

    return createExtrudedShape(shape, originalWidth);
  };

  // Helper function to create extruded geometry with standardized settings
  const createExtrudedShape = (shape: THREE.Shape, originalWidth: number) => {
    const extrudeSettings = {
      steps: 1,
      depth: originalWidth * 0.2,
      bevelEnabled: true,
      bevelThickness: originalWidth * 0.03,
      bevelSize: originalWidth * 0.03,
      bevelSegments: 3,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    return geometry;
  };

  // Animation state
  const elapsed = useRef(0);

  // Drive animations every frame
  useFrame((_, delta) => {
    const ref = meshRef?.current!;
    elapsed.current += delta;

    switch (config?.animation) {
      case "spinZ":
        // constant spin around Z
        if (config?.direction === "left") {
          ref.rotation.z += delta * config?.speed;
        } else {
          ref.rotation.z -= delta * config?.speed;
        }
        break;

      case "bounceY":
        const h = config.bounceHeight!;
        const T = config.bouncePeriod!;
        const ω = Math.PI / T; // π/T rad/s → sin period = 2T, but abs(sin) period = T
        const delay = config.staggerDelay!;

        if (config.multiple) {
          meshRefs.current.forEach((m, i) => {
            const baseY = config.otherPositions[i][1];
            const φ = i * delay * ω;
            const yOff = Math.abs(Math.sin(ω * elapsed.current + φ)) * h;
            m.position.y = baseY + yOff;
          });
        } else {
          const baseY = config.position[1];
          const yOff = Math.abs(Math.sin(ω * elapsed.current)) * h;
          meshRefs.current[0].position.y = baseY + yOff;
        }
        break;

      case "bounceZ": {
        const h = config.bounceHeight!;
        const T = config.bouncePeriod!;
        const ω = Math.PI / T; // yields an "abs(sin)" cycle every T seconds
        const delay = config.staggerDelay!;

        if (config.multiple) {
          meshRefs.current.forEach((m, i) => {
            const baseZ = config.otherPositions![i][2];
            const phase = i * delay * ω;
            const zOff = Math.abs(Math.sin(ω * elapsed.current + phase)) * h;
            m.position.z = baseZ + zOff;
          });
        } else {
          const baseZ = config.position[2];
          const zOff = Math.abs(Math.sin(ω * elapsed.current)) * h;
          meshRefs.current[0].position.z = baseZ + zOff;
        }
        break;
      }

      case "orbitY": {
        // only run if pivot is defined
        if (!config.pivot) break;

        const pivotVec = new THREE.Vector3(...config.pivot);
        const orbitSpeed = config.orbitSpeed ?? 1; // Default to 1 rad/s if not provided
        const rotPeriod = (2 * Math.PI) / orbitSpeed;
        const cycleDuration = rotPeriod + (config.loopDelay || 0);

        meshRefs.current.forEach((mesh, i) => {
          const initE = initialRotations[i];
          const delayStart = (config.staggerDelay || 0) * i;
          const localT = elapsed.current - delayStart;

          // STILL IN PRE-START or PAUSE → snap exactly back
          if (localT <= 0 || localT % cycleDuration >= rotPeriod) {
            mesh.position.set(
              config.otherPositions[i][0],
              config.otherPositions[i][1],
              config.otherPositions[i][2]
            );
            mesh.rotation.set(initE.x, initE.y, initE.z);
          } else {
            // IN MOTION → rotate the offset
            const t = localT % cycleDuration;
            const angle = t * config.orbitSpeed!;
            const offset = initialOffsets[i]
              .clone()
              .applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);

            mesh.position.copy(pivotVec).add(offset);

            // Apply rotation AFTER position is updated
            if (config.facePivot) {
              // Calculate angle to pivot and set rotation
              const angleToCenter = Math.atan2(
                pivotVec.x - mesh.position.x,
                pivotVec.z + mesh.position.z
              );
              // Keep initial X and Y rotation, only modify Z to face pivot
              mesh.rotation.set(initE.x, initE.y, angleToCenter);
            } else {
              // Keep original rotation if not facing pivot
              mesh.rotation.set(initE.x, initE.y, initE.z);
            }
          }
        });
        break;
      }

      case "clockTick":
        // spin the pivot instead of the mesh itself
        if (config?.delay && elapsed?.current >= config?.delay) {
          // rotate by stepAngle (default to 6° per tick if not set)
          const step = config?.stepAngle ?? Math.PI / 30;
          if (config?.direction === "left") {
            meshRef.current.rotation.z += step;
          } else {
            meshRef.current.rotation.z -= step;
          }

          // subtract the delay (so we keep any extra time)
          elapsed.current -= config?.delay;
        }
        break;

      case "circularStagger": {
        const h = config.bounceHeight!;
        const T = config.bouncePeriod!;
        const ω = Math.PI / T; // yields an "abs(sin)" cycle every T seconds
        const delay = config.staggerDelay!;

        if (config.multiple) {
          meshRefs.current.forEach((m, i) => {
            const baseZ = config.otherPositions![i][2];
            const phase = i * delay * ω;
            const zOff = Math.abs(Math.sin(ω * elapsed.current + phase)) * h;
            m.position.z = baseZ + zOff;
          });
        } else {
          const baseZ = config.position[2];
          const zOff = Math.abs(Math.sin(ω * elapsed.current)) * h;
          meshRefs.current[0].position.z = baseZ + zOff;
        }
        break;
      }

      case "svg": {
        let targetMesh: any | THREE.Mesh | null = null;

        if (ref) {
          ref.traverse((child) => {
            if (
              child instanceof THREE.Mesh &&
              child?.userData?.name == "Outer_Mesh"
            ) {
              targetMesh = child;
            }
          });
        }

        if (targetMesh) {
          // Initialize on first encounter
          if (!originalGeometry.current) {
            originalGeometry.current = targetMesh.geometry.clone();

            // Calculate original bounds to get width
            originalBounds.current = new THREE.Box3().setFromObject(targetMesh);
            const size = new THREE.Vector3();
            originalBounds.current.getSize(size);

            // Store original scale
            targetMesh.userData.originalScale = {
              x: targetMesh.scale.x,
              y: targetMesh.scale.y,
              z: targetMesh.scale.z,
            };

            // Generate all shape geometries
            const originalWidth = size.y - 0.15;
            targetMesh.userData.shapeGeometries =
              createShapeGeometries(originalWidth);

            // Set initial target geometry
            targetGeometry.current = targetMesh.userData.shapeGeometries[0];
          }

          // Update shape timer and check for shape changes
          shapeTimer.current += delta;
          if (shapeTimer.current >= shapeDuration) {
            shapeTimer.current = 0;

            // Move to next shape
            currentShapeIndex.current = nextShapeIndex.current;
            nextShapeIndex.current =
              (nextShapeIndex.current + 1) %
              targetMesh.userData.shapeGeometries.length;

            // Reset morph progress for the new transition
            morphProgress.current = 0;
            targetGeometry.current =
              targetMesh.userData.shapeGeometries[nextShapeIndex.current];
          }

          // Update morph progress for smooth transition
          morphProgress.current += delta * 1.5; // Faster transition
          morphProgress.current = Math.min(morphProgress.current, 1);

          // Apply shape change
          if (morphProgress.current > 0.1) {
            // When morphing has started, switch to target geometry
            if (
              !(targetMesh.geometry instanceof THREE.ExtrudeGeometry) ||
              (targetMesh.geometry !== targetGeometry.current &&
                morphProgress.current >= 0.5)
            ) {
              // Dispose old geometry and apply new one
              targetMesh.geometry.dispose();
              targetMesh.geometry = targetGeometry.current!.clone();

              // Apply original scale
              if (targetMesh.userData.originalScale) {
                const origScale = targetMesh.userData.originalScale;
                targetMesh.scale.set(origScale.x, origScale.y, origScale.z);
              }

              // Apply scale for smooth transition effect, preserving width
              const scaleEffect = 0.8 + morphProgress.current * 0.2;
              const origX = targetMesh.userData.originalScale?.x || 1;
              const origY = targetMesh.userData.originalScale?.y || 1;
              const origZ = targetMesh.userData.originalScale?.z || 1;

              // Scale x and z axes, preserve y (width)
              targetMesh.scale.set(
                origX * scaleEffect,
                origY,
                origZ * scaleEffect
              );

              // Reapply wireframe effect after geometry change
              applyWireframeEffect(targetMesh, targetMesh.parent || ref);
            }
          } else if (morphProgress.current < 0.1 && originalGeometry.current) {
            // At the beginning of transition, return to original
            targetMesh.geometry.dispose();
            targetMesh.geometry = originalGeometry.current.clone();

            // Apply scale
            if (targetMesh.userData.originalScale) {
              const origScale = targetMesh.userData.originalScale;
              targetMesh.scale.set(origScale.x, origScale.y, origScale.z);
            }

            // Reapply wireframe effect after geometry change
            applyWireframeEffect(targetMesh, targetMesh.parent || ref);
          }
        }
      }

      default:
        break;
    }
  });

  return (
    <group rotation-y={Math.PI / 1}>
      {multiple ? (
        <group>
          {otherPositions?.map((newPosition: number[], index: number) => (
            <primitive
              key={index}
              ref={(el: any) => {
                meshRefs.current[index] = el!;
              }}
              object={scene.clone()}
              position={newPosition}
              rotation={
                otherRotation
                  ? new THREE.Euler(...otherRotation[index])
                  : new THREE.Euler(...config?.rotation)
              }
              scale={scale}
            />
          ))}
        </group>
      ) : (
        <primitive
          ref={meshRef}
          object={scene.clone()}
          position={position}
          rotation={new THREE.Euler(...config?.rotation)}
          scale={scale}
        />
      )}
    </group>
  );
};

export default Module;
