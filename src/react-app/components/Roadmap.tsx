// src/react-app/components/Roadmap.tsx

const STEPS: { label: string; body: string; state: "done" | "active" | "next" }[] = [
	{
		label: "Development",
		body: "Core systems being rebuilt and rebalanced.",
		state: "active",
	},
	{
		label: "Closed testing",
		body: "Small-scale playtests with trusted hands.",
		state: "next",
	},
	{
		label: "Server launch",
		body: "Public servers go live, cross-server travel included.",
		state: "next",
	},
	{
		label: "Open source",
		body: "Released publicly once it's stable and secure.",
		state: "next",
	},
];

export function Roadmap() {
	return (
		<section id="status" className="roadmap">
			<div className="section-head">
				<span className="tag">02 / Status</span>
				<h2>Where things stand</h2>
				<p className="section-head__sub">
					Re:CC stays closed-source while it&rsquo;s being built. Once it&rsquo;s proven
					stable and secure, we intend to open it up.
				</p>
			</div>

			<ol className="roadmap__steps">
				{STEPS.map((s, i) => (
					<li className={`roadmap__step roadmap__step--${s.state}`} key={s.label}>
						<span className="roadmap__index">{String(i + 1).padStart(2, "0")}</span>
						<span className="roadmap__label">{s.label}</span>
						<span className="roadmap__body">{s.body}</span>
					</li>
				))}
			</ol>
		</section>
	);
}
