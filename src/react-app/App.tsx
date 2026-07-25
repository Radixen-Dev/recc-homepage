// src/App.tsx
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { Roadmap } from "./components/Roadmap";
import { CtaBanner } from "./components/CtaBanner";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
	return (
		<>
			<Nav />
			<main>
				<Hero />
				<About />
				<Features />
				<Roadmap />
				<CtaBanner />
			</main>
			<Footer />
		</>
	);
}

export default App;
