import { useState } from "react";
import "./App.css";

const doctrinePillars = [
	{
		id: "players",
		label: "For players",
		title: "A city that gives you something to push against",
		copy:
			"Routine should feel oppressive, not empty. Street-level life, faction pressure, and quiet character moments all need room to matter before an event siren ever goes off.",
		points: [
			"Strong baseline RP without needing staff to force momentum every night.",
			"Systems that reward consistency, memory, and consequences instead of grind for grind's sake.",
			"Conflict that escalates cleanly, so tension feels earned instead of random.",
		],
	},
	{
		id: "units",
		label: "For factions",
		title: "Authority and resistance both need real texture",
		copy:
			"Civil Protection, citizens, loyalists, and organized opposition should all have pressure, procedure, and leverage. Nobody should be reduced to standing around waiting for permission to play.",
		points: [
			"Clear faction identity without trapping people in dead-end loops.",
			"Mechanical support for patrols, shortages, investigations, and retaliation.",
			"A server rhythm that keeps both order and dissent active at the same time.",
		],
	},
	{
		id: "staff",
		label: "For staff",
		title: "Less firefighting, more deliberate stewardship",
		copy:
			"Moderation and event tooling should lower admin fatigue, not create it. A healthy server survives ordinary nights, bad actors, and burnout without needing constant heroics behind the curtain.",
		points: [
			"Cleaner policy edges around consent, escalation, and punishment.",
			"Event support that helps staff direct tone without railroading outcomes.",
			"Fewer hidden pain points that usually pile up after the honeymoon phase.",
		],
	},
];

const buildTracks = [
	{
		name: "Street pressure",
		description:
			"Ration lines, patrol routes, scarcity, and social risk should shape the day-to-day mood of the city instead of existing as flavor text.",
	},
	{
		name: "Character permanence",
		description:
			"Choices need memory. Not every mistake should be fatal, but very little should feel disposable.",
	},
	{
		name: "Event discipline",
		description:
			"Events should land like a change in weather, not a disconnected mini-game dropped on top of the setting.",
	},
	{
		name: "Faction tooling",
		description:
			"Command, investigation, contraband, logistics, and public order all need systems that create hooks instead of paperwork.",
	},
	{
		name: "Staff resilience",
		description:
			"Policies, permissions, and workflows should be built to survive months of operation, not just opening week enthusiasm.",
	},
	{
		name: "World consistency",
		description:
			"The setting should feel coherent from the first CID check to the largest city-wide crackdown.",
	},
];

const faultLines = [
	"Empty downtime that kills tension between events",
	"Faction loops that turn key roles into chores",
	"Rules that look strict on paper but collapse under pressure",
	"Admin workflows held together by memory and goodwill alone",
];

function App() {
	const [activePillar, setActivePillar] = useState(doctrinePillars[0].id);

	const selectedPillar =
		doctrinePillars.find((pillar) => pillar.id === activePillar) ??
		doctrinePillars[0];

	return (
		<div className="shell">
			<div className="shell__noise" aria-hidden="true" />
			<header className="topbar">
				<a className="brand" href="#top" aria-label="Re:CombineControl home">
					<span className="brand__prefix">RE:</span>
					<span className="brand__name">COMBINECONTROL</span>
				</a>
				<nav className="topbar__nav" aria-label="Section navigation">
					<a href="#premise">Premise</a>
					<a href="#doctrine">Doctrine</a>
					<a href="#tracks">Build tracks</a>
					<a href="#closing">Intent</a>
				</nav>
			</header>

			<main id="top">
				<section className="hero panel">
					<div className="hero__lead">
						<p className="hero__kicker">Half-Life 2 roleplay, rebuilt on purpose.</p>
						<h1>
							The old shape is familiar.
							<span> The weak points are not coming back.</span>
						</h1>
						<p className="hero__summary">
							Re:CombineControl is a one-page promise to do the hard part
							properly: take the last decade of HL2RP lessons, keep what gave
							the genre its pull, and cut the habits that made so many servers
							feel brittle, exhausting, or hollow.
						</p>
						<div className="hero__actions">
							<a className="button button--primary" href="#doctrine">
								Read the doctrine
							</a>
							<a className="button button--ghost" href="#tracks">
								See what is being built
							</a>
						</div>
					</div>

					<div className="signal-card" aria-label="Project positioning">
						<div className="signal-card__header">
							<span>Planning signal</span>
							<span>Ongoing</span>
						</div>
						<div className="signal-card__wordmark" aria-hidden="true">
							<span>RE:</span>
							<span>CC</span>
						</div>
						<p>
							This is not a nostalgia project wearing new paint. The aim is a
							server with stronger daily play, cleaner faction friction, and
							enough operational discipline to last past the opening rush.
						</p>
						<ul className="signal-card__list">
							<li>Grounded systemic pressure</li>
							<li>Serious roleplay without dead air</li>
							<li>Tools and policy designed for longevity</li>
						</ul>
					</div>
				</section>

				<section className="premise-grid panel" id="premise">
					<div className="premise-grid__intro">
						<p className="section-mark">Why this exists</p>
						<h2>
							Too many HL2RP servers know exactly how to open strong and exactly
							how to wear themselves out.
						</h2>
					</div>
					<div className="premise-grid__body">
						<p>
							The genre still works because the setting does a rare thing well:
							it makes ordinary life feel tense before anyone even draws a
							weapon. The trick is preserving that pressure without sinking the
							server under repetitive routines, unclear expectations, or staff
							burnout.
						</p>
						<p>
							Re:CombineControl is being shaped around that reality. Less
							posturing. Less mechanical clutter. Fewer systems that only look
							good during week one. More trust in pacing, consequence, and the
							kinds of small interactions people actually remember months later.
						</p>
					</div>
					<ul className="fault-lines" aria-label="Pain points being addressed">
						{faultLines.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</section>

				<section className="doctrine panel" id="doctrine">
					<div className="doctrine__header">
						<p className="section-mark">Doctrine</p>
						<h2>Different people feel the same server fail in different ways.</h2>
						<p>
							So the rebuild has to hold up from more than one angle. Pick a
							lens and the priorities shift, but the standard stays the same:
							the city should keep producing believable pressure without
							grinding everyone involved into dust.
						</p>
					</div>

					<div className="doctrine__layout">
						<div
							className="tablist"
							role="tablist"
							aria-label="Audience lenses for the project doctrine"
						>
							{doctrinePillars.map((pillar) => {
								const isActive = pillar.id === activePillar;
								return (
									<button
										key={pillar.id}
										type="button"
										id={`tab-${pillar.id}`}
										role="tab"
										aria-controls={`panel-${pillar.id}`}
										aria-selected={isActive}
										className={isActive ? "tab tab--active" : "tab"}
										onClick={() => setActivePillar(pillar.id)}
									>
										<span>{pillar.label}</span>
										<strong>{pillar.title}</strong>
									</button>
								);
							})}
						</div>

						<article
							className="doctrine-card"
							id={`panel-${selectedPillar.id}`}
							role="tabpanel"
							aria-labelledby={`tab-${selectedPillar.id}`}
						>
							<p className="section-mark section-mark--muted">
								{selectedPillar.label}
							</p>
							<h3>{selectedPillar.title}</h3>
							<p>{selectedPillar.copy}</p>
							<ul>
								{selectedPillar.points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</article>
					</div>
				</section>

				<section className="tracks panel" id="tracks">
					<div className="tracks__intro">
						<p className="section-mark">Build tracks</p>
						<h2>The project is being defined around operational pressure points.</h2>
						<p>
							Not every system needs to be loud to matter. The best HL2RP
							structures are the ones players feel constantly, even when they
							never stop to name them.
						</p>
					</div>
					<div className="tracks__grid">
						{buildTracks.map((track, index) => (
							<article className="track-card" key={track.name}>
								<span className="track-card__index">
									{String(index + 1).padStart(2, "0")}
								</span>
								<h3>{track.name}</h3>
								<p>{track.description}</p>
							</article>
						))}
					</div>
				</section>

				<section className="closing panel" id="closing">
					<div className="closing__quote">
						<p className="section-mark">Intent</p>
						<h2>
							Build the kind of city where even a quiet shift feels like part of
							something larger.
						</h2>
					</div>
					<div className="closing__body">
						<p>
							That means patience where patience matters, sharper taste where
							taste matters, and a refusal to confuse extra systems with better
							roleplay. Re:CombineControl is being planned to feel oppressive,
							alive, and sustainable all at once.
						</p>
						<p>
							If that lands, the result will not just look like CombineControl.
							It will remember why people cared about it in the first place.
						</p>
						<a className="button button--primary" href="#top">
							Back to top
						</a>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
