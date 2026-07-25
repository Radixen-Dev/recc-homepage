// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { CookieConsent } from "./components/CookieConsent";
import { Home } from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { WhatIsCC } from "./pages/WhatIsCC";
import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";

function App() {
	return (
		<>
			<ScrollToTop />
			<Nav />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/what-is-cc" element={<WhatIsCC />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
			<Footer />
			<CookieConsent />
		</>
	);
}

export default App;
