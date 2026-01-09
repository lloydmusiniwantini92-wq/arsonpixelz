import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartDrawer } from "./components/shop/CartDrawer";
import { CartProvider } from './context/CartContext';
import { LoadingSpinner } from "./components/LoadingSpinner";
import { CodeWatermark } from "./components/layout/CodeWatermark";

// Lazy Loaded Pages
const MarketingPage = React.lazy(() => import("./pages/MarketingPage"));
const BrandingPage = React.lazy(() => import("./pages/BrandingPage"));
const GamingPage = React.lazy(() => import("./pages/GamingPage"));
const DevAIPage = React.lazy(() => import("./pages/DevAIPage"));
const TierListPage = React.lazy(() => import("./pages/TierListPage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const TestimonialsPage = React.lazy(() => import("./pages/TestimonialsPage").then(module => ({ default: module.TestimonialsPage })));
const SuccessPage = React.lazy(() => import("./pages/SuccessPage"));
const CancelPage = React.lazy(() => import("./pages/CancelPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const WorkIndexPage = React.lazy(() => import("./pages/WorkIndexPage").then(module => ({ default: module.WorkIndexPage })));
const AboutPage = React.lazy(() => import("./pages/AboutPage").then(module => ({ default: module.AboutPage })));
const LegalPage = React.lazy(() => import("./pages/LegalPage").then(module => ({ default: module.LegalPage })));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage").then(module => ({ default: module.NotFoundPage })));

// Home Section (Keep critical components eager for LCP)
const HomePage = () => (
    <>
        <Hero />
        <About />
        <Services />
        <Work />
    </>
);

const App = () => {
    return (
        <CartProvider>
            <Router>
                <div className="flex flex-col min-h-screen bg-[#EBE9DF]">
                    <CodeWatermark />
                    <Navigation />
                    <CartDrawer />
                    <ScrollToTop />
                    <div className="flex-grow z-10"> {/* Added z-10 to ensure content sits above watermark */}
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/work" element={<WorkIndexPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/legal" element={<LegalPage />} />

                                <Route path="/marketing" element={<MarketingPage />} />
                                <Route path="/branding" element={<BrandingPage />} />
                                <Route path="/gaming" element={<GamingPage />} />
                                <Route path="/dev-ai" element={<DevAIPage />} />
                                <Route path="/shop" element={<ShopPage />} />
                                <Route path="/tier-list" element={<TierListPage />} />
                                <Route path="/transmissions" element={<TestimonialsPage />} />
                                <Route path="/success" element={<SuccessPage />} />
                                <Route path="/cancel" element={<CancelPage />} />
                                <Route path="/contact" element={<ContactPage />} />

                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </div>

                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;