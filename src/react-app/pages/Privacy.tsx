// src/react-app/pages/Privacy.tsx
import { Link } from "react-router-dom";
import { PRIVACY_CONTACT_EMAIL, PRIVACY_GOVERNING_LAW, PRIVACY_LAST_UPDATED } from "../constants";

export function Privacy() {
	return (
		<section className="legal">
			<div className="section-head">
				<span className="tag">Legal / Privacy Policy</span>
				<h1>Privacy Policy</h1>
				<p className="section-head__sub">Last updated: {PRIVACY_LAST_UPDATED}</p>
			</div>

			<div className="legal__body">
				<p>
					Re:CombineControl (&ldquo;Re:CC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
					&ldquo;our&rdquo;) is an independent, fan-made project. This policy explains what
					information this website collects when you visit it, why we collect it, and the
					choices you have. It covers <strong>this website only</strong>. It does not cover
					Discord, or any game servers we may operate in the future, each of which have their
					own privacy practices.
				</p>

				<h2>Information we collect</h2>
				<p>
					We don&rsquo;t require an account to browse this site, and we don&rsquo;t run any
					sign-up forms, so we don&rsquo;t collect information like your name or email address
					through the site itself. The only data collected today comes from analytics:
				</p>
				<ul>
					<li>
						<strong>Usage &amp; interaction data</strong> via{" "}
						<a href="https://clarity.microsoft.com/" target="_blank" rel="noreferrer noopener">
							Microsoft Clarity
						</a>
						, including approximate device/browser type, pages viewed, clicks, scrolling, and
						session recordings that let us see how the site is used.
					</li>
					<li>
						<strong>Technical data</strong> such as IP address and general location, collected
						automatically by our hosting provider (Cloudflare) and by Clarity as part of normal
						web traffic handling.
					</li>
				</ul>
				<p>
					We don&rsquo;t knowingly collect payment information, government IDs, or other
					sensitive personal data through this website.
				</p>

				<h2>Cookies &amp; Microsoft Clarity</h2>
				<p>
					This site uses <strong>Microsoft Clarity</strong>, a session-recording and heatmap
					analytics tool, to understand how visitors use the site so we can improve it. Clarity
					sets cookies and collects usage data in the visitor&rsquo;s browser on our behalf.
					Microsoft may use this data as described in the{" "}
					<a
						href="https://privacy.microsoft.com/en-us/privacystatement"
						target="_blank"
						rel="noreferrer noopener"
					>
						Microsoft Privacy Statement
					</a>{" "}
					and{" "}
					<a href="https://clarity.microsoft.com/terms" target="_blank" rel="noreferrer noopener">
						Clarity Terms of Use
					</a>
					.
				</p>
				<p>
					When you first visit, a small banner lets you know this is running and gives you the
					option to opt out. Opting out stops Clarity for that browser going forward and clears
					its cookies; you can also opt out later by clearing your cookies for this site (the
					banner will reappear), or block cookies entirely through your browser settings, though
					this may affect how the site behaves.
				</p>

				<h2>How we use information</h2>
				<p>We use the data described above only to:</p>
				<ul>
					<li>Understand how visitors use the site (which pages, what they click, where they drop off).</li>
					<li>Diagnose bugs, layout issues, and broken flows.</li>
					<li>Keep the site secure and prevent abuse.</li>
				</ul>
				<p>We do not sell personal data, and we do not use it for advertising.</p>

				<h2>Who we share data with</h2>
				<p>We rely on a small number of third-party services to run this site:</p>
				<ul>
					<li>
						<strong>Microsoft Clarity</strong> &mdash; analytics and session recording (see
						above).
					</li>
					<li>
						<strong>Cloudflare</strong> &mdash; hosting, content delivery, and DDoS protection.
					</li>
					<li>
						<strong>Discord</strong> &mdash; if you follow a link to our Discord server, your
						activity there is governed by Discord&rsquo;s own privacy policy, not this one.
					</li>
				</ul>
				<p>We don&rsquo;t sell your data, and we don&rsquo;t share it for third-party advertising.</p>

				<h2>Data retention</h2>
				<p>
					We keep analytics data only as long as it&rsquo;s useful for the purposes above.
					Microsoft Clarity retains data according to its own retention schedule; see
					Microsoft&rsquo;s documentation for details. We don&rsquo;t maintain a separate
					database of personal data for this website.
				</p>

				<h2>Your rights &amp; choices</h2>
				<p>
					Depending on where you live, you may have rights under laws like the GDPR (EEA/UK) or
					the CCPA/CPRA (California) to access, correct, delete, or object to the processing of
					personal data we hold about you, and to opt out of analytics tracking. Because this
					site collects very little personal data to begin with, most requests can be satisfied
					simply by clicking &ldquo;Opt out&rdquo; on the cookie banner or clearing your cookies.
					For anything else, contact us at{" "}
					<a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a> and we&rsquo;ll
					do our best to help.
				</p>

				<h2>Children&rsquo;s privacy</h2>
				<p>
					This website is intended for users aged 13 and older. We do not knowingly collect
					personal data from children under 13. If you believe a child under 13 has provided us
					with personal data, contact us and we&rsquo;ll remove it.
				</p>

				<h2>International visitors</h2>
				<p>
					This site is accessible worldwide, and the third-party services we use (such as
					Microsoft Clarity and Cloudflare) may process data in countries other than your own,
					including the United States. By using this site, you understand your information may
					be processed in those locations.
				</p>

				<h2>Changes to this policy</h2>
				<p>
					We may update this policy as the project evolves (for example, if we add accounts or
					game servers later). We&rsquo;ll update the &ldquo;Last updated&rdquo; date above when
					we do. Material changes will be called out on our{" "}
					<a
						href="https://discord.gg/wzVTkgTENk"
						target="_blank"
						rel="noreferrer noopener"
					>
						Discord
					</a>
					.
				</p>

				<h2>Contact us</h2>
				<p>
					Questions about this policy? Email{" "}
					<a href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>. Re:CombineControl
					is currently run as an independent, informal project (not a registered company); to
					the extent any dispute requires a governing law, we default to {PRIVACY_GOVERNING_LAW}.
				</p>

				<p className="legal__back">
					<Link to="/">&larr; Back to home</Link>
				</p>
			</div>
		</section>
	);
}
