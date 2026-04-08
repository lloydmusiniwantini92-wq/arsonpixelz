import React from 'react';

export const ShopNavbar: React.FC = () => {
    return (
        <header className="sticky top-0 z-[40] w-full border-b border-white/5 backdrop-blur-xl bg-[#080808]/95 pointer-events-none">
            <div className="flex items-center justify-between px-6 md:px-10 h-[58px] max-w-[1600px] mx-auto gap-6 opacity-0">
                {/* Logo and links are now handled by the global floating Navigation */}
            </div>
        </header>
    );
};

export default ShopNavbar;
