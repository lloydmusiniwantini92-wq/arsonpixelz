import React from "react";
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

// Pages
import MarketingPage from "./pages/MarketingPage";
import BrandingPage from "./pages/BrandingPage";
import GamingPage from "./pages/GamingPage";
import DevAIPage from "./pages/DevAIPage";
import TierListPage from "./pages/TierListPage";
import ShopPage from "./pages/ShopPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import ContactPage from "./pages/ContactPage";

import { WorkIndexPage } from "./pages/WorkIndexPage";
import { AboutPage } from "./pages/AboutPage";
import { LegalPage } from "./pages/LegalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { CodeWatermark } from "./components/layout/CodeWatermark";

// Home Section
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
                    </div>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;