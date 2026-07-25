// src/react-app/components/About.tsx

export function About() {
	return (
		<section id="origin" className="about">
			<div className="section-head">
				<span className="tag">00 / Origin</span>
				<h2>We&rsquo;ve done this before</h2>
			</div>

			<div className="about__grid">
				<p className="about__lead">
					Re:CombineControl is a full overhaul of CombineControl, not just a reskin. We&rsquo;ve
					hosted CC servers before and watched plenty of others come and go over roughly the
					last decade. This rebuild is what happens when you take all of that and actually fix
					it instead of just talking about it.
				</p>
				<div className="about__facts">
					<div className="fact">
						<span className="fact__value">~10 yrs</span>
						<span className="fact__label">of CC history we&rsquo;re drawing on</span>
					</div>
					<div className="fact">
						<span className="fact__value">1 team</span>
						<span className="fact__label">that&rsquo;s hosted CC servers before</span>
					</div>
					<div className="fact">
						<span className="fact__value">0</span>
						<span className="fact__label">reskins. This is a real rebuild.</span>
					</div>
				</div>
			</div>
		</section>
	);
}
