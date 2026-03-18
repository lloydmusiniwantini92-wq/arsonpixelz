import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const Core = (props: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useEffect(() => {
        if (!meshRef.current) return;
        
        // Massive, violent entry from deep space
        gsap.fromTo(meshRef.current.scale, 
            { x: 0, y: 0, z: 0 }, 
            { x: 2.5, y: 2.5, z: 2.5, duration: 2.5, ease: 'elastic.out(1, 0.3)', delay: 0.5 }
        );
        
        gsap.fromTo(meshRef.current.position,
            { z: -20 },
            { z: 0, duration: 2, ease: 'power4.out', delay: 0.5 }
        );
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const { clock, mouse } = state;

        // Gentle rotation
        meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;

        // Reactive movement
        const x = (mouse.x * window.innerWidth) / 50;
        const y = (mouse.y * window.innerHeight) / 50;

        // Lerp towards mouse influence
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 2, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 2, 0.1);
    });

    const handlePointerOver = () => {
        setHover(true);
        if (meshRef.current) gsap.to(meshRef.current.scale, { x: 2.2, y: 2.2, z: 2.2, duration: 0.4, ease: 'power2.out' });
    };

    const handlePointerOut = () => {
        setHover(false);
        if (meshRef.current) gsap.to(meshRef.current.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 0.4, ease: 'power2.out' });
    };

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 64, 64]} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} {...props}>
                <MeshDistortMaterial
                    color="#D16D6A"
                    attach="material"
                    distort={0.6} // Strength, 0 disables the effect (default=1)
                    speed={2} // Speed (default=1)
                    roughness={0.2}
                    metalness={0.9}
                    bumpScale={0.005}
                />
            </Sphere>
        </Float>
    );
};

export const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Pointer events none ensures text over it is clickable, but we might want interaction. 
                If we want interaction, we need pointer-events-auto on the canvas and pass-through on the text.
            */}
            <Canvas className="w-full h-full" camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#D16D6A" />

                <Core position={[0, 0, 0]} />

                {/* Environment for reflections */}
                {/* <Environment preset="city" /> */}
            </Canvas>
        </div>
    );
};
