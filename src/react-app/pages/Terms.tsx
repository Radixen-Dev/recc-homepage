// src/react-app/pages/Terms.tsx
import { Link } from "react-router-dom";
import { PRIVACY_CONTACT_EMAIL } from "../constants";

/**
 * Placeholder page. We don't have a real Terms of Service yet; this exists so the
 * link isn't a dead end and to make the gap visible until real ToS content ships.
 */
export function Terms() {
	return (
		<section className="legal">
			<div className="section-head">
				<span className="tag">Legal / Terms of Service</span>
				<h1>Terms of Service</h1>
				<p className="section-head__sub">Coming soon</p>
			</div>

			<div className="legal__body">
				<p>
					We haven&rsquo;t published a formal Terms of Service yet. Once servers and accounts
					are further along, this page will cover things like acceptable use, account rules, and
					disclaimers for playing on Re:CombineControl servers.
				</p>
				<p>
					In the meantime, see our{" "}
					<Link to="/privacy">Privacy Policy</Link> for how this website handles data, or reach
					out at <a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a> with any
					questions.
				</p>

				<p className="legal__back">
					<Link to="/">&larr; Back to home</Link>
				</p>
			</div>
		</section>
	);
}
