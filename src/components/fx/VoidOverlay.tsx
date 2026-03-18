import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, ChromaticAberration, Bloom, Noise, Vignette, TiltShift, Grid } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useIgnition } from '../layout/IgnitionRuntime';

const Effects = () => {
    const { getPhysics } = useIgnition();
    const chromaRef = React.useRef<any>(null);
    const vignetteRef = React.useRef<any>(null);

    React.useEffect(() => {
        // Loop to update effects based on physics/scroll velocity
        const loop = () => {
            const { velocity } = getPhysics();

            if (chromaRef.current) {
                // Velocity-based Chromatic Aberration ("Hyperspace Warp")
                const shift = Math.min(velocity * 0.002, 0.05);
                chromaRef.current.offset.x = shift;
                chromaRef.current.offset.y = shift;
            }

            if (vignetteRef.current) {
                // Tunnel Vision: Vignette gets darker/tightens when speeding
                const darkness = 0.3 + Math.min(velocity * 0.02, 0.5);
                vignetteRef.current.darkness = darkness;
            }
            requestAnimationFrame(loop);
        };

        const raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [getPhysics]);

    return (
        <EffectComposer>
            <Vignette
                ref={vignetteRef}
                eskil={false}
                offset={0.1}
                darkness={0.3} // Base value, animated in loop
            />
            {/* Hyperspace Warp - Driven by Scroll Velocity */}
            <ChromaticAberration
                ref={chromaRef}
                offset={[0.002, 0.002]} // Base subtle shift
                blendFunction={BlendFunction.NORMAL}
                radialModulation={false}
                modulationOffset={0}
            />

            {/* "Liquid Glass" Refraction - Replaces Tunnel Vision */}
            {/* We use a subtle Grid distortion to simulate heat haze/fabric ripple */}
            <Grid
                scale={0.5}
                lineWidth={0.0} // Invisible grid, we just want the distortion if possible, 
            // actually Grid in postprocessing is a line effect. 
            // Better to use "WaterEffect" or custom.
            // Sticking to ChromaticAberration for "Glass" feel + High Bloom
            />

            {/* High Intensity Bloom for "Glow" */}
            <Bloom
                luminanceThreshold={0.8}
                luminanceSmoothing={0.5}
                intensity={0.6}
                mipmapBlur
            />

            {/* Tilt Shift for "Miniature/Portal" feel */}
            <TiltShift blur={0.05} />
        </EffectComposer>
    );
};

export const VoidOverlay = () => {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen">
            <Canvas
                orthographic
                camera={{ position: [0, 0, 1], zoom: 1 }}
                gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}
            >
                {/* 
                   NOTE: Direct post-processing of HTML is generally not performant via R3F 
                   unless we render the HTML into the canvas. 
                   
                   Instead, this overlay provides "Atmospheric" FX on top of the DOM.
                   Real "Gravitational Lensing" of the DOM requires CSS filters or 
                   SVG filters synced to mouse.
                */}
                <Effects />
            </Canvas>
        </div>
    );
};
