// src/react-app/pages/WhatIsCC.tsx
import { DISCORD_URL } from "../constants";
import { CtaBanner } from "../components/CtaBanner";
import { ArrowIcon } from "../components/icons";

const BRIEFING_FACTS: { label: string; value: string }[] = [
	{ label: "Setting", value: "Half-Life 2, under Combine control" },
	{ label: "Structure", value: "Persistent, no rounds or matches" },
	{ label: "Playable roles", value: "Civilian, CP, Overwatch, business owner" },
	{ label: "History", value: "~10 years across community servers" },
];

const ROLES: { title: string; clearance: string; body: string }[] = [
	{
		title: "Civilian",
		clearance: "Open to everyone",
		body: "Hold a job, keep your head down, and get by under occupation. Or don't, and see what happens.",
	},
	{
		title: "Civil Protection",
		clearance: "Issued, not earned",
		body: "Enforce Combine law on the streets. Order comes at a price, and you're the one collecting it.",
	},
	{
		title: "Overwatch",
		clearance: "Restricted",
		body: "The Combine's own. Higher authority, higher stakes, and even less patience for problems.",
	},
	{
		title: "Business owner",
		clearance: "Licensed",
		body: "Pay for a license, open a shop, and build something in the city that's actually yours.",
	},
];

const COMPARISONS: { before: string; after: string }[] = [
	{
		before: "Gunfights typed out, one /roll at a time",
		after: "Real combat, with voice chat if you want it",
	},
	{
		before: "One seriousness level, whether you like it or not",
		after: "Servers can run different RP intensity, if the community wants it",
	},
	{
		before: "Persistence that never quite held",
		after: "Persistence built to actually last",
	},
	{
		before: "Nothing to do once the roleplay dies down",
		after: "Systemic content, so the city holds up on its own",
	},
];

export function WhatIsCC() {
	return (
		<>
			<section className="briefing">
				<div className="section-head">
					<span className="tag">Briefing</span>
					<h1>What is CombineControl?</h1>
					<p className="section-head__sub">
						CombineControl drops you into a Half-Life 2 city under Combine occupation, and
						lets you decide who you are in it. Here&rsquo;s the rundown, no prior experience
						required.
					</p>
				</div>

				<div className="briefing__grid">
					<p className="briefing__lead">
						CombineControl (CC) is a Garry&rsquo;s Mod gamemode built on the Half-Life 2
						universe. There&rsquo;s no single objective and no round timer, just a city, a
						Combine occupation running it, and whatever role you decide to play inside that.
						Civilians get by, Civil Protection enforces order, Overwatch answers to no one,
						and anyone with the coin can open a shop and build something of their own.
						It&rsquo;s been running in different forms across community-hosted servers for
						roughly a decade, and Re:CC is our attempt at doing it properly.
					</p>

					<div className="briefing__panel">
						<div className="briefing__panel-head">At a glance</div>
						{BRIEFING_FACTS.map((f) => (
							<div className="briefing__row" key={f.label}>
								<span className="briefing__row-label">{f.label}</span>
								<span className="briefing__row-value">{f.value}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="roles">
				<div className="section-head">
					<span className="tag">Who You Can Be</span>
					<h2>Pick a role in the city</h2>
					<p className="section-head__sub">
						These are the paths CC has always offered. What you do with them is up to you.
					</p>
				</div>

				<div className="role-list">
					{ROLES.map((r) => (
						<div className="role-card" key={r.title}>
							<div className="role-card__id">
								<h3>{r.title}</h3>
								<span className="role-card__clearance">{r.clearance}</span>
							</div>
							<p className="role-card__body">{r.body}</p>
						</div>
					))}
				</div>
			</section>

			<section className="playbook">
				<div className="section-head">
					<span className="tag">How It Actually Plays</span>
					<h2>No rounds, no script</h2>
				</div>

				<p className="playbook__intro">
					There&rsquo;s no match structure. Servers just run, and the story of the city gets
					written by whoever&rsquo;s logged in. Historically, that&rsquo;s happened through
					chat:
				</p>

				<div className="chatlog">
					<div className="chatlog__line">
						<span className="chatlog__cmd">/me</span>
						<span className="chatlog__me"> kicks the crate open, checking what&rsquo;s inside.</span>
					</div>
					<div className="chatlog__line">
						<span className="chatlog__cmd">/it</span>
						<span className="chatlog__it"> the crate creaks &mdash; empty, except for a stack of old newspaper.</span>
					</div>
					<div className="chatlog__line">
						<span className="chatlog__cmd">/roll</span>
						<span className="chatlog__roll"> 2 to see if CP noticed the noise.</span>
					</div>
				</div>
				<p className="playbook__caption">
					<strong>/me</strong> is what your character does. <strong>/it</strong> is what&rsquo;s
					happening around them, no name attached, just the scene. <strong>/roll</strong>{" "}
					settles anything left to chance.
				</p>

				<div className="playbook__body">
					<p>
						Admins aren&rsquo;t just moderators here, either. They shape the world directly:
						triggering events, roleplaying as characters passing through, and spawning NPCs
						to push the city&rsquo;s story forward in ways no round timer could.
					</p>
					<p>
						The honest version: CC has always been at its best when people are actively
						playing off each other, and quiet when they&rsquo;re not. That gap is exactly
						what we&rsquo;re building Re:CC to close.
					</p>
				</div>
			</section>

			<section className="changes">
				<div className="section-head">
					<span className="tag">What Re:CC Changes</span>
					<h2>Same city, fewer growing pains</h2>
				</div>

				<div className="compare">
					{COMPARISONS.map((c) => (
						<div className="compare__row" key={c.before}>
							<span className="compare__before">{c.before}</span>
							<ArrowIcon className="compare__arrow" />
							<span className="compare__after">{c.after}</span>
						</div>
					))}
				</div>
			</section>

			<section className="requirements">
				<div className="section-head">
					<span className="tag">Before You Jump In</span>
					<h2>What you&rsquo;ll need</h2>
				</div>

				<div className="requirements__pills">
					<span className="pill">Garry&rsquo;s Mod (Steam)</span>
					<span className="pill">No server live yet</span>
					<span className="pill">Discord for updates</span>
				</div>

				<p className="requirements__body">
					CombineControl runs on Garry&rsquo;s Mod, you&rsquo;ll need to own it on Steam to
					play. There&rsquo;s no server live yet; development is ongoing, and everything
					else, testing, access, launch, gets announced on{" "}
					<a href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
						Discord
					</a>{" "}
					first.
				</p>
			</section>

			<CtaBanner />
		</>
	);
}
