import React, { useEffect, useRef } from 'react';
import { Engine, Scene, Vector2, ShaderMaterial, Effect, PostProcess, Color4, MeshBuilder, Texture, FreeCamera, Vector3 } from '@babylonjs/core';
const customFragmentShader = `
    precision highp float;
    varying vec2 vUV;
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;

    // Classic Perlin 3D Noise 
    // by Stefan Gustavson
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

    float cnoise(vec3 P){
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod(Pi0, 289.0);
      Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;

      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);

      vec4 gx0 = ixy0 / 7.0;
      vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);

      vec4 gx1 = ixy1 / 7.0;
      vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);

      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;

      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);

      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }

    void main(void) {
        vec2 st = vUV;
        st.x *= resolution.x / resolution.y;

        // Base noise for fluid feeling
        float n = cnoise(vec3(st * 3.0, time * 0.2));
        
        // Mouse distortion
        float d = distance(vUV, mouse);
        float mouseEffect = smoothstep(0.4, 0.0, d);
        
        n += mouseEffect * 2.0;
        
        // Liquid color mapping (E6E4DD base with subtle variations)
        vec3 colorBase = vec3(0.902, 0.894, 0.867); // #E6E4DD
        vec3 colorHighlight = vec3(0.95, 0.94, 0.91);
        vec3 colorDark = vec3(0.85, 0.84, 0.81);
        
        vec3 finalColor = mix(colorBase, colorHighlight, n);
        finalColor = mix(finalColor, colorDark, smoothstep(0.5, 1.0, n) * mouseEffect);

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

export const WebGLBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Engine | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const engine = new Engine(canvasRef.current, true);
        engineRef.current = engine;
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.902, 0.894, 0.867, 1); // #E6E4DD
        const camera = new FreeCamera("camera1", new Vector3(0, 0, -10), scene);

        Effect.ShadersStore['liquidPixelShader'] = customFragmentShader;

        const postProcess = new PostProcess(
            'liquidEffect',
            'liquid',
            ['time', 'mouse', 'resolution'],
            null,
            1.0,
            scene.activeCamera,
            Texture.BILINEAR_SAMPLINGMODE,
            engine,
            false,
            null,
            Engine.TEXTURETYPE_UNSIGNED_INT
        );

        let time = 0;
        let mousePos = new Vector2(0.5, 0.5);
        let targetMousePos = new Vector2(0.5, 0.5);

        window.addEventListener('mousemove', (e) => {
            targetMousePos.x = e.clientX / window.innerWidth;
            targetMousePos.y = 1.0 - (e.clientY / window.innerHeight);
        });

        postProcess.onApply = (effect) => {
            time += 0.01;
            // Lerp mouse for smoothness
            mousePos.x += (targetMousePos.x - mousePos.x) * 0.1;
            mousePos.y += (targetMousePos.y - mousePos.y) * 0.1;

            effect.setFloat('time', time);
            effect.setVector2('mouse', mousePos);
            effect.setVector2('resolution', new Vector2(engine.getRenderWidth(), engine.getRenderHeight()));
        };

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener('resize', () => {
            engine.resize();
        });

        return () => {
            engine.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-50"
            style={{ mixBlendMode: 'multiply' }}
        />
    );
};
