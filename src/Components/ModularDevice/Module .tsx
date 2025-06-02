import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Path prefix for all models
export const MODEL_PATH_PREFIX = "/models/";

// Module configs with positions, rotations, and scales
// These will need to be adjusted based on the actual model dimensions and desired layout
export const MODULES_CONFIG = {
  // Middle timer section
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

  "module-svg-01.glb": {
    position: [0, 2.6, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "top",
    speed: 0.4,
    animation: "spinZ",
    // animation: "svg",
  }, // corrected position
  "module-spring-01.glb": {
    position: [0, 2.8, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "middle",
    stepAngle: Math.PI / 2,
    animation: "clockTick",
    delay: 1,
    direction: "right",
  }, // corrected position

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

  "module-animate-01.glb": {
    position: [0, 3.77, 0],
    rotation: [Math.PI / 2, 0, Math.PI / 4],
    scale: 1,
    group: "middle",
  }, // corrected position
  "module-easing-01-new.glb": {
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
    animation: "spinZ",
    speed: 0.1,
  }, // corrected position
  "module-scroll-01.glb": {
    position: [0, 4.8, 0],
    rotation: [Math.PI / 2, 0, 0],
    scale: 1,
    group: "base",
    animation: "spinZ",
    speed: 0.2,
  }, // corrected position
  "module-shield-01.glb": {
    position: [0.59, 4.85, -0.59],
    rotation: [Math.PI / 2, 0, Math.PI],
    scale: 1,
    group: "base",
    multiple: true,
    otherPositions: [
      [0.59, 4.85, -0.59],
      [-0.59, 4.85, 0.59],
      [0.59, 2.7, -0.59],
      [-0.59, 2.7, 0.59],
      [0.535, 1.6, -0.535], // front top
      [-0.535, 1.6, 0.535], // front bottom
      [-0.537, 1.6, -0.537], // front side
    ],
    otherRotation: [
      [Math.PI / 2, 0, Math.PI],
      [Math.PI / 2, 0, 0],
      [Math.PI / 2, 0, Math.PI],
      [Math.PI / 2, 0, 0],
      [Math.PI / 2, 0, Math.PI], // front top
      [Math.PI / 2, 0, 0], // front bottom
      [Math.PI / 2, 0, Math.PI / 2], // front side
    ],
  },
  "module-shield-02.glb": {
    position: [0.59, 2.7, -0.59],
    rotation: [Math.PI / 2, 0, Math.PI],
    scale: [1, 1, 0.03],
    group: "base",
    split: true,
    multiple: true,
    otherPositions: [
      [-0.59, 2, -0.59], // middle right side
      [-0.59, 2.1, -0.59], // middle right side
      [-0.59, 2.2, -0.59], // middle right side
      [-0.59, 2.3, -0.59], // middle right side
      [-0.59, 2.4, -0.59], // middle right side
      [-0.59, 2.5, -0.59], // middle right side
      [-0.59, 2.6, -0.59], // middle right side
      [-0.59, 2.7, -0.59], // middle right side
      [-0.59, 2.8, -0.59], // middle right side
      [-0.59, 2.9, -0.59], // middle right side
      [-0.59, 3, -0.59], // middle right side
      [-0.59, 3.1, -0.59], // middle right side
      [-0.59, 3.2, -0.59], // middle right side
      [-0.59, 3.3, -0.59], // middle right side
      [-0.59, 3.4, -0.59], // middle right side
      // Middle Left Side
      [0.59, 2, 0.59], // middle Left side
      [0.59, 2.1, 0.59], // middle Left side
      [0.59, 2.2, 0.59], // middle Left side
      [0.59, 2.3, 0.59], // middle Left side
      [0.59, 2.4, 0.59], // middle Left side
      [0.59, 2.5, 0.59], // middle Left side
      [0.59, 2.6, 0.59], // middle Left side
      [0.59, 2.7, 0.59], // middle Left side
      [0.59, 2.8, 0.59], // middle Left side
      [0.59, 2.9, 0.59], // middle Left side
      [0.59, 3, 0.59], // middle Left side
      [0.59, 3.1, 0.59], // middle Left side
      [0.59, 3.2, 0.59], // middle Left side
      [0.59, 3.3, 0.59], // middle Left side
      [0.59, 3.4, 0.59], // middle Left side
      // Base Right Side
      [-0.59, 5.55, -0.59], // base right side
      [-0.59, 5.45, -0.59], // base right side
      [-0.59, 5.35, -0.59], // base right side
      [-0.59, 5.25, -0.59], // base right side
      [-0.59, 5.15, -0.59], // base right side
      [-0.59, 5.05, -0.59], // base right side
      [-0.59, 4.95, -0.59], // base right side
      [-0.59, 4.85, -0.59], // base right side
      [-0.59, 4.75, -0.59], // base right side
      [-0.59, 4.65, -0.59], // base right side
      [-0.59, 4.55, -0.59], // base right side
      [-0.59, 4.45, -0.59], // base right side
      [-0.59, 4.35, -0.59], // base right side
      [-0.59, 4.25, -0.59], // base right side
      [-0.59, 4.15, -0.59], // base right side
      // Base Left Side
      [0.59, 5.55, 0.59], // base right side
      [0.59, 5.45, 0.59], // base right side
      [0.59, 5.35, 0.59], // base right side
      [0.59, 5.25, 0.59], // base right side
      [0.59, 5.15, 0.59], // base right side
      [0.59, 5.05, 0.59], // base right side
      [0.59, 4.95, 0.59], // base right side
      [0.59, 4.85, 0.59], // base right side
      [0.59, 4.75, 0.59], // base right side
      [0.59, 4.65, 0.59], // base right side
      [0.59, 4.55, 0.59], // base right side
      [0.59, 4.45, 0.59], // base right side
      [0.59, 4.35, 0.59], // base right side
      [0.59, 4.25, 0.59], // base right side
      [0.59, 4.15, 0.59], // base right side
    ],
    otherRotation: [
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      [Math.PI / 2, 0, Math.PI / 2], // middle right side
      // Middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      [Math.PI / 2, 0, -Math.PI / 2], // middle Left side
      // Base Right Side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      [Math.PI / 2, 0, Math.PI / 2], // base right side
      // Base Left Side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
      [Math.PI / 2, 0, -Math.PI / 2], // base Left side
    ],
  },
};

export const EXPLODED_VIEW_CONFIG = {
  // Middle timer section
  "module-animate-01.glb": {
    position: [0, 3.77, 0],
    rotation: [Math.PI / 2, 4, Math.PI / 4],
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
  const singleMeshRef = useRef<THREE.Object3D>(null!);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);
  const edgesInstancedMeshRef = useRef<THREE.InstancedMesh>(null!);
  const { scene: original } = useGLTF(`${MODEL_PATH_PREFIX}${fileName}`);

  const { position, scale, multiple, otherPositions, otherRotation, split } =
    config;
  const instanceCount = multiple ? otherPositions?.length || 1 : 1;

  // Extract geometry and material from the loaded model
  const { geometry, material } = useMemo(() => {
    let foundGeometry: any | THREE.BufferGeometry | null = null;
    let foundMaterial: THREE.Material | null = null;

    original.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (!foundGeometry && child.geometry) {
          foundGeometry = child.geometry;
          foundMaterial = child.material as THREE.Material;
        }
      }
    });

    // Apply non-indexed geometry for proper flat shading
    if (foundGeometry) {
      const nonIndexed = foundGeometry.toNonIndexed();
      nonIndexed.computeVertexNormals();
      foundGeometry = nonIndexed;
    }

    return {
      geometry: foundGeometry || new THREE.BoxGeometry(0.1, 0.1, 0.1),
      material: foundMaterial || new THREE.MeshStandardMaterial(),
    };
  }, [original]);

  // Store original geometry reference for SVG animation
  const originalGeometry = useRef<THREE.BufferGeometry | null>(null);
  const originalBounds = useRef<THREE.Box3 | null>(null);
  const morphProgress = useRef(0);
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

  // Animation state
  const elapsed = useRef(0);
  const dummy = useRef(new THREE.Object3D());

  // Wireframe materials
  const wireframeMaterials = useMemo(
    () => ({
      normal: material,
      wireframe: new THREE.MeshBasicMaterial({
        color: 0x252423,
        wireframe: true,
        transparent: false,
      }),
      background: new THREE.MeshBasicMaterial({
        color: 0xdad5d0,
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
        depthTest: true,
      }),
      outline: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
        transparent: false,
        opacity: 1,
      }),
    }),
    [material]
  );

  // Get current material based on wireframe mode
  const currentMaterial = useMemo(() => {
    switch (wireframeMode) {
      case "wireframe":
        return wireframeMaterials.wireframe;
      case "edges":
      case "outlined":
        return wireframeMaterials.background;
      default:
        return wireframeMaterials.normal;
    }
  }, [wireframeMode, wireframeMaterials]);

  // Setup initial instance matrices for multiple instances
  useEffect(() => {
    if (!instancedMeshRef.current || !multiple) return;

    for (let i = 0; i < instanceCount; i++) {
      const pos = otherPositions[i] as [number, number, number];
      dummy.current.position.set(pos[0], pos[1], pos[2]);

      const rot = (otherRotation ? otherRotation[i] : config.rotation) as [
        number,
        number,
        number
      ];
      dummy.current.rotation.set(rot[0], rot[1], rot[2]);

      const sc = Array.isArray(scale)
        ? (scale as [number, number, number])
        : [scale, scale, scale];
      dummy.current.scale.set(sc[0], sc[1], sc[2]);
      dummy.current.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;

    // Setup edges if needed
    if (
      edgesInstancedMeshRef.current &&
      (wireframeMode === "edges" || wireframeMode === "outlined")
    ) {
      for (let i = 0; i < instanceCount; i++) {
        const pos = otherPositions[i] as [number, number, number];
        const rot = (otherRotation ? otherRotation[i] : config.rotation) as [
          number,
          number,
          number
        ];
        const sc = (Array.isArray(scale) ? scale : [scale, scale, scale]) as [
          number,
          number,
          number
        ];

        dummy.current.position.set(pos[0], pos[1], pos[2]);
        dummy.current.rotation.set(rot[0], rot[1], rot[2]);
        dummy.current.scale.set(sc[0], sc[1], sc[2]);
        dummy.current.updateMatrix();
        edgesInstancedMeshRef.current.setMatrixAt(i, dummy.current.matrix);
      }
      edgesInstancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [
    instanceCount,
    otherPositions,
    otherRotation,
    scale,
    multiple,
    wireframeMode,
  ]);

  // Shape creation functions for SVG animation
  const createShapeGeometries = (originalWidth: number) => {
    const shapes: THREE.BufferGeometry[] = [];

    // 1. Star shape
    shapes.push(createStarShape(originalWidth));
    // 2. Triangle
    shapes.push(createTriangleShape(originalWidth));
    // 3. Rounded square
    shapes.push(createRoundedSquareShape(originalWidth));
    // 4. Pentagon
    shapes.push(createPolygonShape(originalWidth, 5));
    // 5. Hexagon
    shapes.push(createPolygonShape(originalWidth, 6));
    // 6. Cross
    shapes.push(createCrossShape(originalWidth));
    // 7. Gear/flower
    shapes.push(createGearShape(originalWidth));
    // 8. Diamond
    shapes.push(createDiamondShape(originalWidth));
    // 9. Wave/spiral
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

    shape.moveTo(size - radius, size);
    shape.lineTo(-size + radius, size);
    shape.quadraticCurveTo(-size, size, -size, size - radius);
    shape.lineTo(-size, -size + radius);
    shape.quadraticCurveTo(-size, -size, -size + radius, -size);
    shape.lineTo(size - radius, -size);
    shape.quadraticCurveTo(size, -size, size, -size + radius);
    shape.lineTo(size, size - radius);
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

    shape.moveTo(-armWidth, armWidth);
    shape.lineTo(-armWidth, size);
    shape.lineTo(armWidth, size);
    shape.lineTo(armWidth, armWidth);
    shape.lineTo(size, armWidth);
    shape.lineTo(size, -armWidth);
    shape.lineTo(armWidth, -armWidth);
    shape.lineTo(armWidth, -size);
    shape.lineTo(-armWidth, -size);
    shape.lineTo(-armWidth, -armWidth);
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

  // Helper function to create extruded geometry
  const createExtrudedShape = (shape: THREE.Shape, originalWidth: number) => {
    const extrudeSettings = {
      steps: 1,
      depth: originalWidth * 0.2,
      bevelEnabled: true,
      bevelThickness: originalWidth * 0.03,
      bevelSize: originalWidth * 0.03,
      bevelSegments: 3,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  };

  // Drive animations every frame
  useFrame((_, delta) => {
    elapsed.current += delta;

    if (multiple && instancedMeshRef.current) {
      // Handle animations for instanced meshes
      switch (config?.animation) {
        case "bounceY": {
          const h = config.bounceHeight!;
          const T = config.bouncePeriod!;
          const ω = Math.PI / T;
          const delay = config.staggerDelay!;

          for (let i = 0; i < instanceCount; i++) {
            const baseY = config.otherPositions[i][1];
            const φ = i * delay * ω;
            const yOff = Math.abs(Math.sin(ω * elapsed.current + φ)) * h;

            dummy.current.position.set(
              config.otherPositions[i][0],
              baseY + yOff,
              config.otherPositions[i][2]
            );
            dummy.current.rotation.set(
              ...((otherRotation ? otherRotation[i] : config.rotation) as [
                number,
                number,
                number
              ])
            );
            dummy.current.scale.set(
              ...(Array.isArray(scale)
                ? (scale as [number, number, number])
                : ([scale, scale, scale] as [number, number, number]))
            );
            dummy.current.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, dummy.current.matrix);

            // Update edges if they exist
            if (edgesInstancedMeshRef.current) {
              edgesInstancedMeshRef.current.setMatrixAt(
                i,
                dummy.current.matrix
              );
            }
          }
          instancedMeshRef.current.instanceMatrix.needsUpdate = true;
          if (edgesInstancedMeshRef.current) {
            edgesInstancedMeshRef.current.instanceMatrix.needsUpdate = true;
          }
          break;
        }

        case "bounceZ": {
          const h = config.bounceHeight!;
          const T = config.bouncePeriod!;
          const ω = Math.PI / T;
          const delay = config.staggerDelay!;

          for (let i = 0; i < instanceCount; i++) {
            const baseZ = config.otherPositions[i][2];
            const phase = i * delay * ω;
            const zOff = Math.abs(Math.sin(ω * elapsed.current + phase)) * h;

            dummy.current.position.set(
              config.otherPositions[i][0],
              config.otherPositions[i][1],
              baseZ + zOff
            );
            dummy.current.rotation.set(
              ...((otherRotation ? otherRotation[i] : config.rotation) as [
                number,
                number,
                number
              ])
            );
            dummy.current.scale.set(
              ...(Array.isArray(scale)
                ? (scale as [number, number, number])
                : ([scale, scale, scale] as [number, number, number]))
            );
            dummy.current.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, dummy.current.matrix);

            // Update edges if they exist
            if (edgesInstancedMeshRef.current) {
              edgesInstancedMeshRef.current.setMatrixAt(
                i,
                dummy.current.matrix
              );
            }
          }
          instancedMeshRef.current.instanceMatrix.needsUpdate = true;
          if (edgesInstancedMeshRef.current) {
            edgesInstancedMeshRef.current.instanceMatrix.needsUpdate = true;
          }
          break;
        }

        case "orbitY": {
          if (!config.pivot) break;

          const pivotVec = new THREE.Vector3(...config.pivot);
          const orbitSpeed = config.orbitSpeed ?? 1;
          const rotPeriod = (2 * Math.PI) / orbitSpeed;
          const cycleDuration = rotPeriod + (config.loopDelay || 0);

          for (let i = 0; i < instanceCount; i++) {
            const initE = initialRotations[i];
            const delayStart = (config.staggerDelay || 0) * i;
            const localT = elapsed.current - delayStart;

            if (localT <= 0 || localT % cycleDuration >= rotPeriod) {
              // Static position
              const pos = config.otherPositions[i] as [number, number, number];
              dummy.current.position.set(pos[0], pos[1], pos[2]);
              dummy.current.rotation.set(initE.x, initE.y, initE.z);
            } else {
              // Orbiting
              const t = localT % cycleDuration;
              const angle = t * config.orbitSpeed!;
              const offset = initialOffsets[i]
                .clone()
                .applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);

              dummy.current.position.copy(pivotVec).add(offset);

              if (config.facePivot) {
                const angleToCenter = Math.atan2(
                  pivotVec.x - dummy.current.position.x,
                  pivotVec.z + dummy.current.position.z
                );
                dummy.current.rotation.set(initE.x, initE.y, angleToCenter);
              } else {
                dummy.current.rotation.set(initE.x, initE.y, initE.z);
              }
            }

            dummy.current.scale.set(
              ...(Array.isArray(scale)
                ? (scale as [number, number, number])
                : ([scale, scale, scale] as [number, number, number]))
            );
            dummy.current.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, dummy.current.matrix);

            // Update edges if they exist
            if (edgesInstancedMeshRef.current) {
              edgesInstancedMeshRef.current.setMatrixAt(
                i,
                dummy.current.matrix
              );
            }
          }
          instancedMeshRef.current.instanceMatrix.needsUpdate = true;
          if (edgesInstancedMeshRef.current) {
            edgesInstancedMeshRef.current.instanceMatrix.needsUpdate = true;
          }
          break;
        }

        default:
          // No animation, keep static positions
          break;
      }
    } else if (singleMeshRef.current) {
      // Handle animations for single meshes
      const ref = singleMeshRef.current;

      switch (config?.animation) {
        case "spinZ":
          if (config?.direction === "left") {
            ref.rotation.z += delta * config?.speed;
          } else {
            ref.rotation.z -= delta * config?.speed;
          }
          break;

        case "clockTick":
          if (config?.delay && elapsed?.current >= config?.delay) {
            const step = config?.stepAngle ?? Math.PI / 30;
            if (config?.direction === "left") {
              ref.rotation.z += step;
            } else {
              ref.rotation.z -= step;
            }
            elapsed.current -= config?.delay;
          }
          break;

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
              originalBounds.current = new THREE.Box3().setFromObject(
                targetMesh
              );
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
            morphProgress.current += delta * 1.5;
            morphProgress.current = Math.min(morphProgress.current, 1);

            // Apply shape change
            if (morphProgress.current > 0.1) {
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

                // Apply scale for smooth transition effect
                const scaleEffect = 0.8 + morphProgress.current * 0.2;
                const origX = targetMesh.userData.originalScale?.x || 1;
                const origY = targetMesh.userData.originalScale?.y || 1;
                const origZ = targetMesh.userData.originalScale?.z || 1;

                targetMesh.scale.set(
                  origX * scaleEffect,
                  origY,
                  origZ * scaleEffect
                );
              }
            } else if (
              morphProgress.current < 0.1 &&
              originalGeometry.current
            ) {
              // At the beginning of transition, return to original
              targetMesh.geometry.dispose();
              targetMesh.geometry = originalGeometry.current.clone();

              // Apply scale
              if (targetMesh.userData.originalScale) {
                const origScale = targetMesh.userData.originalScale;
                targetMesh.scale.set(origScale.x, origScale.y, origScale.z);
              }
            }
          }
          break;
        }

        default:
          break;
      }
    }
  });

  // Clone scene for single mesh usage
  const scene = useMemo(() => {
    const cloned = original.clone(true);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.userData.originalMaterial = mesh.material;
        mesh.geometry = mesh.geometry.toNonIndexed();
        mesh.geometry.computeVertexNormals();
      }
    });

    return cloned;
  }, [original]);

  return (
    <group rotation-y={Math.PI / 1}>
      {multiple ? (
        <>
          <instancedMesh
            ref={instancedMeshRef}
            args={[geometry, currentMaterial, instanceCount]}
            castShadow
            receiveShadow
          />
          {/* Add edge lines for wireframe modes */}
          {(wireframeMode === "edges" || wireframeMode === "outlined") && (
            <instancedMesh
              ref={edgesInstancedMeshRef}
              args={[
                new THREE.EdgesGeometry(geometry, 30),
                wireframeMaterials.edges,
                instanceCount,
              ]}
              renderOrder={1}
            />
          )}
        </>
      ) : (
        <primitive
          ref={singleMeshRef}
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
