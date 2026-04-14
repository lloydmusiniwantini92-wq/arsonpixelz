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
import { ArsBot } from "./components/ArsBot";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartDrawer } from "./components/shop/CartDrawer";
import { CartProvider } from './context/CartContext';
import { IntelligenceProvider } from './context/IntelligenceContext';
import { CodeWatermark } from "./components/layout/CodeWatermark";
import { HorizontalScrollSection } from "./components/fx/HorizontalScrollSection";
import { MagneticCursor } from "./components/fx/MagneticCursor";
import { ReverseVoidSystem } from "./components/fx/ReverseVoidSystem";

// Lazy Loaded Pages
const MarketingPage = React.lazy(() => import("./pages/MarketingPage"));
const BrandingPage = React.lazy(() => import("./pages/BrandingPage"));
const GamingPage = React.lazy(() => import("./pages/GamingPage"));
const DevAIPage = React.lazy(() => import("./pages/DevAIPage"));

const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const TestimonialsPage = React.lazy(() => import("./pages/TestimonialsPage").then(module => ({ default: module.TestimonialsPage })));
const SuccessPage = React.lazy(() => import("./pages/SuccessPage"));
const CancelPage = React.lazy(() => import("./pages/CancelPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
// Removed WorkIndexPage for section targeting instead of page.
const AboutPage = React.lazy(() => import("./pages/AboutPage").then(module => ({ default: module.AboutPage })));
const LegalPage = React.lazy(() => import("./pages/LegalPage").then(module => ({ default: module.LegalPage })));
const ArchivePage = React.lazy(() => import("./pages/ArchivePage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage").then(module => ({ default: module.NotFoundPage })));

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* 
        Phase 2 Fix: Unifying horizontal and work sections within a persistent 
        dark background container to mask the transparent .pin-spacers 
        and visually eliminate the "Spatial Void" during the scroll transition.
      */}
      <div className="bg-[#000000] relative overflow-hidden">
        {/* <HorizontalScrollSection /> */}
        <Work />
      </div>
      <Services />
    </>
  );
};

const FooterWrapper = () => {
    const loc = useLocation();
    if (loc.pathname === '/shop') return null;
    return <Footer />;
};

const GlobalShell = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
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
                {/* Standalone work page removed in favor of Section on homepage */}
                <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                <Route path="/legal" element={<PageTransition><LegalPage /></PageTransition>} />

                <Route path="/marketing" element={<PageTransition><MarketingPage /></PageTransition>} />
                <Route path="/branding" element={<PageTransition><BrandingPage /></PageTransition>} />
                <Route path="/gaming" element={<PageTransition><GamingPage /></PageTransition>} />
                <Route path="/dev-ai" element={<PageTransition><DevAIPage /></PageTransition>} />
                <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />

                <Route path="/transmissions" element={<PageTransition><TestimonialsPage /></PageTransition>} />
                <Route path="/success" element={<PageTransition><SuccessPage /></PageTransition>} />
                <Route path="/cancel" element={<PageTransition><CancelPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/archive/:id" element={<PageTransition><ArchivePage /></PageTransition>} />

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
    const [botLoaded, setBotLoaded] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setBotLoaded(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <IntelligenceProvider>
        <CartProvider>
            <Router>
                <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#000000] text-[#FFFFFF]">
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
                    <ArsBot loaded={botLoaded} isMenuOpen={isMenuOpen} />
                </div>
            </Router>
        </CartProvider>
        </IntelligenceProvider>
    );
};

export default App;
