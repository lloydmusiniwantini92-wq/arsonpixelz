/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Footer } from "./components/Footer";

// Pages
import MarketingPage from "./pages/MarketingPage";
import BrandingPage from "./pages/BrandingPage";
import GamingPage from "./pages/GamingPage";
import DevAIPage from "./pages/DevAIPage";
import TierListPage from "./pages/TierListPage";

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
        <div className="min-h-screen w-full bg-arson-beige selection:bg-[#D16D6A] selection:text-white">
            <Navigation />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/marketing" element={<MarketingPage />} />
                    <Route path="/branding" element={<BrandingPage />} />
                    <Route path="/gaming" element={<GamingPage />} />
                    <Route path="/dev-ai" element={<DevAIPage />} />
                    <Route path="/tier-list" element={<TierListPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;