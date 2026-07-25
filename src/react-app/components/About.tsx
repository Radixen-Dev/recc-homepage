// src/react-app/components/About.tsx

export function About() {
	return (
		<section id="origin" className="about">
			<div className="section-head">
				<span className="tag">00 / Origin</span>
				<h2>Built on a decade in the trenches</h2>
			</div>

			<div className="about__grid">
				<p className="about__lead">
					Re:CombineControl is an overhaul and expansion of CombineControl — not a reskin,
					not a fork left to rot. We&rsquo;re rebuilding the gamemode with the benefit of
					nearly ten years of Combine Control history to learn from: server owners who came
					before us, the servers we used to run ourselves, and the parts of the format that
					never got the attention they deserved.
				</p>
				<div className="about__facts">
					<div className="fact">
						<span className="fact__value">~10 yrs</span>
						<span className="fact__label">of CC history behind this build</span>
					</div>
					<div className="fact">
						<span className="fact__value">1 team</span>
						<span className="fact__label">that&rsquo;s run CC servers before</span>
					</div>
					<div className="fact">
						<span className="fact__value">0</span>
						<span className="fact__label">reskins — this is a real rebuild</span>
					</div>
				</div>
			</div>
		</section>
	);
}
