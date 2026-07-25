// src/react-app/components/CtaBanner.tsx
import { DISCORD_URL } from "../constants";
import { DiscordIcon } from "./icons";

export function CtaBanner() {
	return (
		<section className="cta">
			<div className="cta__panel">
				<h2>Follow the signal</h2>
				<p>
					Progress updates, early previews, and eventually, servers to join. It all shows up
					on Discord first.
				</p>
				<a
					className="btn btn--primary btn--large"
					href={DISCORD_URL}
					target="_blank"
					rel="noreferrer noopener"
				>
					<DiscordIcon className="btn__icon" />
					Join the Discord
				</a>
			</div>
		</section>
	);
}
