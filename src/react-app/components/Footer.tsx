// src/react-app/components/Footer.tsx
import { Link } from "react-router-dom";
import { DISCORD_URL } from "../constants";
import { DiscordIcon } from "./icons";

export function Footer() {
	return (
		<footer className="footer">
			<div className="footer__inner">
				<div className="footer__brand">
					<span>Re:CombineControl</span>
				</div>

				<a
					className="footer__discord"
					href={DISCORD_URL}
					target="_blank"
					rel="noreferrer noopener"
					aria-label="Join the Discord"
				>
					<DiscordIcon className="footer__discord-icon" />
				</a>
			</div>
			<p className="footer__fine">
				Re:CombineControl is an independent, fan-made project built on CombineControl,
				originally created by Disseminate. It is not affiliated with Valve Corporation,
				Facepunch Studios, or Disseminate. Source will be released publicly once the project
				is stable and secure.
			</p>
			<div className="footer__legal">
				<Link className="btn btn--ghost btn--small" to="/privacy">
					Privacy Policy
				</Link>
				<Link className="footer__legal-link" to="/terms">
					Terms of Service
				</Link>
			</div>
		</footer>
	);
}
