"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei";

// Loader Component
function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        {/* Circle Loader */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        {/* Percentage */}
        <p className="mt-3 text-white text-sm font-medium">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

// 3D Model Component
function Model() {
  const { scene } = useGLTF("/models/model1.glb");
  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI, 0]} // model still facing forward
    />
  );
}

export default function Dashboard() {
  // Convert 200° → radians
  const angle = (200 * Math.PI) / 180;
  const radius = 2; // zoom distance

  return (
    <div className="flex h-screen w-screen bg-black">
      <Canvas
        camera={{
          position: [Math.sin(angle) * radius, 0, Math.cos(angle) * radius],
          fov: 45,
        }}
      >
        {/* Lights */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />
        <pointLight position={[0, 3, 3]} intensity={1.2} />
        <hemisphereLight intensity={0.6} groundColor="black" />

        {/* Loader + Model */}
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>

        <OrbitControls enableZoom />
      </Canvas>
    </div>
  );
}
