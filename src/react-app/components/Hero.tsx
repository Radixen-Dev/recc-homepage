// src/react-app/components/Hero.tsx
import { DISCORD_URL } from "../constants";
import { DiscordIcon, ArrowIcon } from "./icons";

export function Hero() {
	return (
		<section id="top" className="hero">
			<div className="hero__grid" aria-hidden="true" />
			<div className="hero__inner">
				<p className="eyebrow">
					<span className="eyebrow__dot" />
					In active development
				</p>

				<h1 className="hero__title">
					<span className="hero__prefix">Re:</span>
					<span className="hero__combine">Combine</span>
					<span className="hero__control">Control</span>
				</h1>

				<p className="hero__lede">
					The Garry&rsquo;s Mod gamemode that shaped a generation of Half&#8209;Life&nbsp;2
					roleplay servers is getting rebuilt from the ground up.
				</p>

				<p className="hero__body">
					We&rsquo;ve spent years running and playing on Combine Control servers. Re:CC takes
					everything that history taught us — the good, the broken, and the never&#8209;quite&#8209;fixed
					— and puts it into a version worth building on.
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
					No release date yet — word on servers, features, and testing travels through
					Discord first.
				</p>
			</div>
		</section>
	);
}
