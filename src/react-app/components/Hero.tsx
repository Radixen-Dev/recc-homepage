// src/react-app/components/Hero.tsx
import { DISCORD_URL } from "../constants";
import { DiscordIcon, ArrowIcon } from "./icons";

export function Hero() {
	return (
		<section id="top" className="hero">
			<div className="hero__grid" aria-hidden="true" />
			<div className="hero__inner">
				<h1 className="hero__title">
					<span className="hero__prefix">Re:</span>
					<span className="hero__combine">Combine</span>
					<span className="hero__control">Control</span>
				</h1>

				<p className="hero__lede">
					The gamemode a generation of HL2 servers grew up on is getting rebuilt.
				</p>

				<p className="hero__body">
					We used to run Combine Control servers ourselves, back when the format was at its
					peak. This is us finally doing something about all the stuff we complained about
					back then.
				</p>

				<div className="hero__actions">
					<a
						className="btn btn--primary"
						href={DISCORD_URL}
						target="_blank"
						rel="noreferrer noopener"
					>
						<DiscordIcon className="btn__icon" />
						Join the Discord
					</a>
					<a className="btn btn--ghost" href="#directives">
						See what&rsquo;s changing
						<ArrowIcon className="btn__icon btn__icon--trail" />
					</a>
				</div>

				<p className="hero__note">
					No release date yet. Updates on servers, features, and testing show up in
					Discord first.
				</p>
			</div>
		</section>
	);
}
