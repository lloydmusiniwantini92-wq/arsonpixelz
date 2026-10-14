import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageTransition } from "./components/fx/PageTransition";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { ClothTear } from "./components/fx/ClothTear";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Footer } from "./components/Footer";
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from "./components/LoadingScreen";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartDrawer } from "./components/shop/CartDrawer";
import { CartProvider } from './context/CartContext';
import { IntelligenceProvider } from './context/IntelligenceContext';
import { CodeWatermark } from "./components/layout/CodeWatermark";
import { MagneticCursor } from "./components/fx/MagneticCursor";

// Active Pages
const SuccessPage = React.lazy(() => import("./pages/SuccessPage"));
const CancelPage = React.lazy(() => import("./pages/CancelPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const LegalPage = React.lazy(() => import("./pages/LegalPage").then(module => ({ default: module.LegalPage })));
const ArchivePage = React.lazy(() => import("./pages/ArchivePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage").then(module => ({ default: module.NotFoundPage })));

// Decoupled sub-pages (preserved in codebase, not compiled into build)
// const MarketingPage = React.lazy(() => import("./pages/MarketingPage"));
// const BrandingPage = React.lazy(() => import("./pages/BrandingPage"));
// const GamingPage = React.lazy(() => import("./pages/GamingPage"));
// const DevAIPage = React.lazy(() => import("./pages/DevAIPage"));
// const ServicesIndexPage = React.lazy(() => import("./pages/ServicesIndexPage"));
// const ShopPage = React.lazy(() => import("./pages/ShopPage"));
// const TestimonialsPage = React.lazy(() => import("./pages/TestimonialsPage").then(module => ({ default: module.TestimonialsPage })));
// const AboutPage = React.lazy(() => import("./pages/AboutPage").then(module => ({ default: module.AboutPage })));

import { ServiceMatrix } from "./components/shop/ServiceMatrix/ServiceMatrix";

const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="bg-[#000000] relative overflow-hidden">
        <Work />
      </div>
      {/* Agency Capabilities and Product Ranking from Shop */}
      <ServiceMatrix />
    </>
  );
};

const FooterWrapper = () => {
    const loc = useLocation();
    if (loc.pathname === '/shop') return null;
    return <Footer />;
};

import { useAudioDesign } from './hooks/useAudioDesign';

// Static, fixed architectural background across the entire app (50% opacity, motionless)
const AtmosphericBackground = () => (
    <>
        <div 
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            style={{ position: 'fixed', transform: 'none' }}
        >
            <img 
                src="/site-static/shop/matrix_monolith.webp" 
                alt="" 
                className="w-full h-full object-cover opacity-50 brightness-90 contrast-125"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div 
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    </>
);

const GlobalShell = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    useAudioDesign();
    
    return (
        <>
            <AtmosphericBackground />
            <CustomCursor />
            <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
            <CartDrawer />
        </>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                
                {/* Utility / Essential routes kept active */}
                <Route path="/legal" element={<PageTransition><LegalPage /></PageTransition>} />
                <Route path="/success" element={<PageTransition><SuccessPage /></PageTransition>} />
                <Route path="/cancel" element={<PageTransition><CancelPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/archive/:id" element={<PageTransition><ArchivePage /></PageTransition>} />

                {/* Decoupled sub-pages (preserved for future scaling)
                <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                <Route path="/marketing" element={<PageTransition><MarketingPage /></PageTransition>} />
                <Route path="/branding" element={<PageTransition><BrandingPage /></PageTransition>} />
                <Route path="/gaming" element={<PageTransition><GamingPage /></PageTransition>} />
                <Route path="/dev-ai" element={<PageTransition><DevAIPage /></PageTransition>} />
                <Route path="/services" element={<PageTransition><ServicesIndexPage /></PageTransition>} />
                <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
                <Route path="/transmissions" element={<PageTransition><TestimonialsPage /></PageTransition>} />
                */}

                <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    React.useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        gsap.registerPlugin(ScrollTrigger);

        let raf1 = 0;
        let raf2 = 0;

        const refreshScroll = () => {
            raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => {
                    ScrollTrigger.clearScrollMemory();
                    ScrollTrigger.sort();
                    ScrollTrigger.refresh();
                });
            });
        };

        const handleLoad = () => refreshScroll();
        const handleResize = () => refreshScroll();

        window.addEventListener("load", handleLoad);
        window.addEventListener("resize", handleResize);

        refreshScroll();

        return () => {
            if (raf1) cancelAnimationFrame(raf1);
            if (raf2) cancelAnimationFrame(raf2);
            window.removeEventListener("load", handleLoad);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <IntelligenceProvider>
        <CartProvider>
            <Router>
                <div className="relative flex min-h-screen flex-col overflow-hidden w-full max-w-full bg-[#000000] text-[#FFFFFF]">
                    <MagneticCursor />
                    <GlobalShell isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
                    <ScrollToTop />

                    <div className="flex-grow z-10">
                        <ClothTear>
                            <Suspense fallback={null}>
                                <AnimatedRoutes />
                            </Suspense>
                        </ClothTear>
                    </div>

                    <FooterWrapper />
                </div>
            </Router>
        </CartProvider>
        </IntelligenceProvider>
    );
};

export default App;
