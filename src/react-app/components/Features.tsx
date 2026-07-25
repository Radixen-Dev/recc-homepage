// src/react-app/components/Features.tsx
import { LockIcon } from "./icons";

const FEATURES: {
	tag: string;
	title: string;
	body: string;
	badge?: string;
	locked?: boolean;
}[] = [
	{
		tag: "N.01",
		title: "Cross-server travel",
		body: "Move between our servers without losing your progress. One connected network, not a handful of silos.",
		badge: "Confirmed",
	},
	{
		tag: "N.02",
		title: "Rebuilt foundations",
		body: "The codebase is being rewritten from the inside out, for stability and performance the original was never built to handle.",
	},
	{
		tag: "N.03",
		title: "Balance, reconsidered",
		body: "Years of watching what breaks a CC server have gone into rethinking how factions, objectives, and progression play off each other.",
	},
	{
		tag: "N.04",
		title: "Hardened & accountable",
		body: "Stronger exploit protection and better admin tooling, built with security in mind from day one — a requirement before anything goes public.",
	},
	{
		tag: "N.05",
		title: "Quality of life",
		body: "The small fixes and conveniences that a decade of server owners kept meaning to get to.",
	},
	{
		tag: "N.06",
		title: "More, classified",
		body: "Some of what we're building is staying under wraps for now. Early details surface in Discord before anywhere else.",
		locked: true,
	},
];

export function Features() {
	return (
		<section id="directives" className="features">
			<div className="section-head">
				<span className="tag">01 / Directives</span>
				<h2>What&rsquo;s changing</h2>
				<p className="section-head__sub">
					We&rsquo;re staying quiet on the finer details for now — but here&rsquo;s the shape
					of what&rsquo;s coming.
				</p>
			</div>

			<ul className="features__grid">
				{FEATURES.map((f) => (
					<li className="feature-card" key={f.tag}>
						<div className="feature-card__head">
							<span className="feature-card__num">{f.tag}</span>
							{f.badge && <span className="feature-card__badge">{f.badge}</span>}
							{f.locked && <LockIcon className="feature-card__lock" />}
						</div>
						<h3>{f.title}</h3>
						<p>{f.body}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
