// src/react-app/pages/Home.tsx
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Features } from "../components/Features";
import { Roadmap } from "../components/Roadmap";
import { CtaBanner } from "../components/CtaBanner";

export function Home() {
	return (
		<>
			<Hero />
			<About />
			<Features />
			<Roadmap />
			<CtaBanner />
		</>
	);
}
