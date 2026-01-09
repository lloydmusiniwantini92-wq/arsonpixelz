import React from 'react';
import { useLocation } from 'react-router-dom';

const LIGHT_BACKGROUND_ROUTES = ['/', '/marketing', '/branding', '/contact', '/about', '/work', '/legal'];

export const CodeWatermark = () => {
  const location = useLocation();
  const isLightMode = LIGHT_BACKGROUND_ROUTES.includes(location.pathname);

  // Z-Index: 40 (Overlaying content for visibility, but subtle)
  // Style: "Marketing" Original (Red, text-xs) - NO BLEND MODE for consistency

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[40] flex select-none">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(${isLightMode ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLightMode ? '#000' : '#fff'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Code Wall - 5 Columns (No Gaps) */}
      <div className={`w-full h-full grid grid-cols-5 gap-0 p-0 transition-opacity duration-1000 ${isLightMode ? 'opacity-[0.045]' : 'opacity-[0.068]'}`}>

        {/* Column 1 */}
        <div className="overflow-hidden">
          <pre className={`text-[#D16D6A] text-[10px] md:text-xs leading-relaxed font-mono whitespace-pre`}>
            {`const engine_V1 = {
  core: 'active',
  speed: 'max'
};
// SYSTEM CHECK
// ......

async function init() {
  return await boot();
}

export default engine_V1;`.repeat(50)}
          </pre>
        </div>

        {/* Column 2 (Left) */}
        <div className="overflow-hidden">
          <pre className={`text-[#D16D6A] text-[10px] md:text-xs leading-relaxed font-mono whitespace-pre`}>
            {`const leftEngine = {
  identity: true,
  craft: 'always'
};

async function designLogo() {
  return await forge();
}

export default leftEngine;`.repeat(50)}
          </pre>
        </div>

        {/* Column 3 (Center) */}
        <div className="overflow-hidden">
          <pre className={`text-[#D16D6A] text-[10px] md:text-xs leading-relaxed font-mono whitespace-pre`}>
            {`const centerCore = {
  status: 'active',
  brand: 'ignited'
};
// OPTIMIZING...
// ...
async function buildIdentity() {
  return await create();
}

export default centerCore;`.repeat(50)}
          </pre>
        </div>

        {/* Column 4 (Right) */}
        <div className="overflow-hidden">
          <pre className={`text-[#D16D6A] text-[10px] md:text-xs leading-relaxed font-mono whitespace-pre`}>
            {`const rightSystem = {
  voice: true,
  impact: 'infinite'
};

async function amplifyBrand() {
  return await launch();
}

export default rightSystem;`.repeat(50)}
          </pre>
        </div>

        {/* Column 5 */}
        <div className="overflow-hidden">
          <pre className={`text-[#D16D6A] text-[10px] md:text-xs leading-relaxed font-mono whitespace-pre`}>
            {`const engine_V2 = {
  scale: 'global',
  mode: 'god'
};
// FINALIZING...

async function deploy() {
  return await execute();
}

export default engine_V2;`.repeat(50)}
          </pre>
        </div>
      </div>
    </div>
  );
};
