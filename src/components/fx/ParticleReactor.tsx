import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
attribute float aRandom;
attribute vec3 aRandomVec;

varying vec3 vColor;
varying float vAlpha;

// Simplex/Perlin noise helper would go here, 
// using simple sin/cos turbulance for performance in this demo

void main() {
  vec3 pos = position;
  
  // 1. Orbital Rotation
  float angle = uTime * 0.1 * aRandom;
  float s = sin(angle);
  float c = cos(angle);
  
  // Rotate around Y
  float x = pos.x * c - pos.z * s;
  float z = pos.x * s + pos.z * c;
  pos.x = x;
  pos.z = z;

  // 2. Mouse Repulsion/Attraction (The Singularity)
  // Converting mouse screen space to rough world space approximation
  vec3 mousePos = vec3(uMouse.x * 10.0, uMouse.y * 10.0, 0.0);
  float dist = distance(pos, mousePos);
  
  // "God Mode" Interaction:
  // If hover, particles get sucked in/blown out aggressively
  float force = 1.0 / (dist * dist + 0.1); // Inverse square falloff for sharper gravity
  vec3 dir = normalize(pos - mousePos);
  
  // Mixed behavior:
  // Always have some "gravity" towards mouse (or repulsion)
  // Base movement (breathing)
  vec3 basePos = aRandomVec * sin(uTime + aRandom * 10.0) * 0.1;

  // Interactive movement
  // Pull towards mouse (singularity) with turbulence
  vec3 interaction = dir * sin(uTime * 5.0 + aRandom) * 3.0 * force;

  // Blend them: 
  // If mouse is close, interaction dominates.
  // We don't rely on uHover anymore, just distance.
  float influence = smoothstep(5.0, 0.0, dist); // Influence fades out at distance 5
  
  pos += mix(basePos, interaction, influence * 0.8);

  // 3. Size Attenuation based on depth & energy
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Dynamic Size
  gl_PointSize = (100.0 * aRandom + 50.0) * (1.0 / -mvPosition.z);

  // 4. Color Injection
  // Base: Arson Red (#D16D6A) -> Vec3(0.82, 0.42, 0.41)
  // Core (Hot): White
  // Void (Cold): Black/Deep Red
  
  float energy = sin(uTime * 2.0 + aRandom * 10.0);
  
  vec3 colorCold = vec3(0.1, 0.05, 0.05); // Charred Black
  vec3 colorBase = vec3(0.82, 0.42, 0.41); // Arson Red
  vec3 colorHot = vec3(1.0, 1.0, 1.0);     // White Hot

  vColor = mix(colorBase, colorHot, abs(energy) * force * 2.0);
  if (dist < 2.0) {
      vColor = mix(vColor, colorHot, 0.8); // Mouse glow
  }

  vAlpha = 0.6 + 0.4 * sin(uTime * 3.0 + aRandom);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular particle
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  if(ll > 0.5) discard;

  // Soft edge glow
  float glow = 1.0 - (ll * 2.0);
  
  // Output
  gl_FragColor = vec4(vColor, vAlpha * glow);
}
`;

export const ParticleReactor = () => {
    const meshRef = useRef<THREE.Points>(null);
    const count = 1200; // Particle count (Optimized for stability)

    const { positions, randoms, randomVecs } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count);
        const randomVecs = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Sphere distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 2.5 + Math.random() * 1.5; // Radius

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            randoms[i] = Math.random();
            randomVecs[i * 3] = (Math.random() - 0.5);
            randomVecs[i * 3 + 1] = (Math.random() - 0.5);
            randomVecs[i * 3 + 2] = (Math.random() - 0.5);
        }
        return { positions, randoms, randomVecs };
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 },
    }), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const shaderMaterial = meshRef.current.material as THREE.ShaderMaterial;
        shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();

        // Damping mouse movement
        const targetX = state.mouse.x;
        const targetY = state.mouse.y;

        // Simple lerp for uniforms
        const currentX = shaderMaterial.uniforms.uMouse.value.x;
        const currentY = shaderMaterial.uniforms.uMouse.value.y;

        shaderMaterial.uniforms.uMouse.value.x = THREE.MathUtils.lerp(currentX, targetX, 0.1);
        shaderMaterial.uniforms.uMouse.value.y = THREE.MathUtils.lerp(currentY, targetY, 0.1);

        // Flythrough Logic: 
        // We aren't moving the particles, we are moving the camera in Hero.tsx
        // But we want the particles to "open up" slightly to avoid clipping
        const time = state.clock.getElapsedTime();

        // Warp Drive Effect (Optional: Stretch particles based on speed if we had velocity prop)
        // For now, standard turbulence is fine.
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    count={count}
                    array={randoms}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aRandomVec"
                    count={count}
                    array={randomVecs}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
};
