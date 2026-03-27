/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans antialiased selection:bg-[#D16D6A]/30">
          <Navigation />
          
          <main className="pt-32 px-6 max-w-7xl mx-auto min-h-[200vh]">
            <Routes>
              <Route path="/" element={<div className="text-4xl font-bold tracking-tight">Home</div>} />
              <Route path="/marketing" element={<div className="text-4xl font-bold tracking-tight">Marketing</div>} />
              <Route path="/branding" element={<div className="text-4xl font-bold tracking-tight">Branding</div>} />
              <Route path="/gaming" element={<div className="text-4xl font-bold tracking-tight">Gaming</div>} />
              <Route path="/dev-ai" element={<div className="text-4xl font-bold tracking-tight">Dev / AI</div>} />
              <Route path="/shop" element={<div className="text-4xl font-bold tracking-tight">Shop</div>} />
              <Route path="/transmissions" element={<div className="text-4xl font-bold tracking-tight">Transmissions</div>} />
              <Route path="/about" element={<div className="text-4xl font-bold tracking-tight">About</div>} />
              <Route path="/work" element={<div className="text-4xl font-bold tracking-tight">Work</div>} />
              <Route path="/contact" element={<div className="text-4xl font-bold tracking-tight">Contact</div>} />
              <Route path="*" element={<div className="text-4xl font-bold tracking-tight">404 Not Found</div>} />
            </Routes>
            
            {/* Dummy content to allow scrolling */}
            <div className="mt-24 space-y-12 opacity-20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-32 bg-neutral-800 rounded-2xl w-full" />
              ))}
            </div>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}
