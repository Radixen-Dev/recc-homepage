// src/react-app/components/Nav.tsx
import { useEffect, useState } from "react";
import { DISCORD_URL } from "../constants";
import { Wordmark } from "./Logo";
import { DiscordIcon } from "./icons";

export function Nav() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
			<div className="nav__inner">
				<a href="/#top" className="nav__brand">
					<Wordmark className="nav__wordmark" />
				</a>
				<nav className="nav__links" aria-label="Primary">
					<a href="/#origin">Origin</a>
					<a href="/#directives">Directives</a>
					<a href="/#status">Status</a>
				</nav>
				<a
					className="btn btn--primary btn--small nav__cta"
					href={DISCORD_URL}
					target="_blank"
					rel="noreferrer noopener"
				>
					<DiscordIcon className="btn__icon" />
					Join Discord
				</a>
			</div>
		</header>
	);
}
