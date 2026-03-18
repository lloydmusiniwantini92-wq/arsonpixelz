import React from 'react';
import { useLocation } from 'react-router-dom';

const LIGHT_BACKGROUND_ROUTES = ['/', '/marketing', '/branding', '/contact', '/about', '/work', '/legal'];

export const CodeWatermark = () => {
  const location = useLocation();
  const isLightMode = LIGHT_BACKGROUND_ROUTES.includes(location.pathname);

  // Z-Index: 40 (Overlaying content for visibility, but subtle)
  // Style: "Marketing" Original (Red, text-xs) - NO BLEND MODE for consistency

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1] flex select-none">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `linear-gradient(${isLightMode ? '#000' : '#fff'} 1px, transparent 1px), linear-gradient(90deg, ${isLightMode ? '#000' : '#fff'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Code Wall - 5 Columns (No Gaps) */}
      <div className={`w-full h-full grid grid-cols-5 gap-0 p-0 transition-opacity duration-1000 ${isLightMode ? 'opacity-[0.02]' : 'opacity-[0.035]'}`}>

        {[1, 2, 3, 4, 5].map((col) => {
          let codeSnippet = '';
          switch(col) {
            case 1: codeSnippet = `const engine_V1 = { core: 'active', speed: 'max' }; async function init() { return await boot(); }`; break;
            case 2: codeSnippet = `const leftEngine = { identity: true, craft: 'always' }; async function designLogo() { return await forge(); }`; break;
            case 3: codeSnippet = `const centerCore = { status: 'active', brand: 'ignited' }; async function buildIdentity() { return await create(); }`; break;
            case 4: codeSnippet = `const rightSystem = { voice: true, impact: 'infinite' }; async function amplifyBrand() { return await launch(); }`; break;
            case 5: codeSnippet = `const engine_V2 = { scale: 'global', mode: 'god' }; async function deploy() { return await execute(); }`; break;
          }
          
          return (
            <div key={col} className="h-full overflow-hidden">
              <pre className="text-[#D16D6A] text-[10px] md:text-xs leading-relaxed font-mono whitespace-pre h-full">
                {Array(20).fill(codeSnippet).join('\n\n')}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};
