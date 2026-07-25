// src/react-app/pages/WhatIsCC.tsx
import { DISCORD_URL } from "../constants";
import { CtaBanner } from "../components/CtaBanner";

const FACTIONS: { tag: string; title: string; body: string }[] = [
	{
		tag: "01",
		title: "Civilian",
		body: "Hold a job, keep your head down, and get by under occupation. Or don't, and see what happens.",
	},
	{
		tag: "02",
		title: "Civil Protection",
		body: "Enforce Combine law on the streets. Order comes at a price, and you're the one collecting it.",
	},
	{
		tag: "03",
		title: "Overwatch",
		body: "The Combine's own. Higher authority, higher stakes, and even less patience for problems.",
	},
	{
		tag: "04",
		title: "Business owner",
		body: "Pay for a license, open a shop, and build something in the city that's actually yours.",
	},
];

const DIFFERENCES: { label: string; body: string }[] = [
	{
		label: "Combat, not commentary",
		body: "A gunfight used to mean typing it out. We're building in real combat, with optional voice chat, so the action can move as fast as you want it to.",
	},
	{
		label: "Pick your intensity",
		body: "Not everyone wants the same server. If the community wants it, we'll run servers at different seriousness levels, from strict roleplay to shoot-on-sight.",
	},
	{
		label: "Persistence, done properly",
		body: "What you build and who you are in the city is meant to stick, with deeper, more reliable persistence than CC servers have managed before.",
	},
	{
		label: "Always something to do",
		body: "CC has always been light on things to do outside of active roleplay with other people. We're building in systemic content so the city holds up even when it's quiet.",
	},
];

export function WhatIsCC() {
	return (
		<>
			<section className="explainer-intro">
				<div className="section-head">
					<span className="tag">Start Here</span>
					<h1>What is CombineControl?</h1>
					<p className="section-head__sub">
						A persistent Half-Life 2 city under Combine occupation, and the people caught in
						between. Here&rsquo;s what you&rsquo;re actually signing up for.
					</p>
				</div>

				<div className="about__grid">
					<p className="about__lead">
						CombineControl (CC) is a Garry&rsquo;s Mod gamemode set in the Half-Life 2 universe.
						Players live out roles in a city under Combine control: civilians scraping by, Civil
						Protection enforcing order, Overwatch defending Combine interests, and business
						owners carving out a living in between. It&rsquo;s been running in different forms
						across community-hosted servers for roughly a decade, and it&rsquo;s always been
						more about who you become in that city than any single objective.
					</p>
					<div className="about__facts">
						<div className="fact">
							<span className="fact__value">~10 yrs</span>
							<span className="fact__label">of community history behind CC</span>
						</div>
						<div className="fact">
							<span className="fact__value">No rounds</span>
							<span className="fact__label">servers just run, persistently</span>
						</div>
						<div className="fact">
							<span className="fact__value">4+ paths</span>
							<span className="fact__label">civilian, CP, Overwatch, business owner</span>
						</div>
					</div>
				</div>
			</section>

			<section className="features">
				<div className="section-head">
					<span className="tag">Who You Can Be</span>
					<h2>Pick a role in the city</h2>
					<p className="section-head__sub">
						These are the core paths CC has always offered. What you do with them is up to
						you and whoever else is on the server.
					</p>
				</div>

				<ul className="features__grid">
					{FACTIONS.map((f) => (
						<li className="feature-card" key={f.tag}>
							<div className="feature-card__head">
								<span className="feature-card__num">{f.tag}</span>
							</div>
							<h3>{f.title}</h3>
							<p>{f.body}</p>
						</li>
					))}
				</ul>
			</section>

			<section>
				<div className="section-head">
					<span className="tag">How It Actually Plays</span>
					<h2>No rounds, no script</h2>
				</div>

				<div className="prose">
					<p>
						There&rsquo;s no match structure. Servers just run, persistently, and the story of
						the city is written by whoever&rsquo;s logged in. Historically, that story has been
						told through chat: in-character dialogue, <strong>/me</strong> for actions,{" "}
						<strong>/it</strong> for item descriptions, and <strong>/roll</strong> to settle
						anything left to chance, from a trade to a firefight.
					</p>
					<p>
						Admins aren&rsquo;t just moderators here. They shape the world directly, triggering
						events, roleplaying as characters passing through, and spawning NPCs to push the
						city&rsquo;s story forward in ways no round timer could.
					</p>
					<p>
						The honest version: CC has always been at its best when players are actively
						engaged with each other, and light on things to do when they&rsquo;re not. That
						gap is exactly what we&rsquo;re building Re:CC to close.
					</p>
				</div>
			</section>

			<section className="roadmap">
				<div className="section-head">
					<span className="tag">What Re:CC Changes</span>
					<h2>Same city, fewer growing pains</h2>
				</div>

				<ol className="roadmap__steps">
					{DIFFERENCES.map((d, i) => (
						<li className="roadmap__step" key={d.label}>
							<span className="roadmap__index">{String(i + 1).padStart(2, "0")}</span>
							<span className="roadmap__label">{d.label}</span>
							<span className="roadmap__body">{d.body}</span>
						</li>
					))}
				</ol>
			</section>

			<section>
				<div className="section-head">
					<span className="tag">Before You Jump In</span>
					<h2>What you&rsquo;ll need</h2>
				</div>
				<div className="prose">
					<p>
						CombineControl runs on <strong>Garry&rsquo;s Mod</strong>, you&rsquo;ll need to own
						it on Steam to play. There&rsquo;s no server live yet; development is ongoing, and
						server details, testing, and how to get in all get announced on{" "}
						<a href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
							Discord
						</a>{" "}
						first.
					</p>
				</div>
			</section>

			<CtaBanner />
		</>
	);
}
