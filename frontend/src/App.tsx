import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ChungjuMap from './components/ChungjuMap';
import ShopInfo from './components/ShopInfo';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  return (
    <div className="App h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              🏪 충주 3D 상점 탐험
            </h1>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* 3D Scene */}
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 75 }}
          className="h-full w-full"
        >
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ChungjuMap />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Shop Info Panel */}
      <ShopInfo />
    </div>
  );
}

export default App;
