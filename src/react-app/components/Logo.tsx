// src/react-app/components/Logo.tsx

/** Small angular mark used in the nav and footer. Echoes the hex-bolt motif of the original CombineControl badge. */
export function Mark(props: { className?: string }) {
	return (
		<svg
			className={props.className}
			viewBox="0 0 40 40"
			aria-hidden="true"
		>
			<polygon
				points="20,2 35,10.5 35,29.5 20,38 5,29.5 5,10.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			/>
			<path d="M14 14 L21 20 L14 26" fill="none" stroke="currentColor" strokeWidth="2.2" />
			<line x1="21" y1="20" x2="28" y2="20" stroke="var(--red)" strokeWidth="2.6" />
		</svg>
	);
}

/** The wordmark: "RE:" + outlined "COMBINE" + solid "CONTROL", styled after the original logo. */
export function Wordmark(props: { className?: string; stacked?: boolean }) {
	return (
		<span className={`wordmark ${props.stacked ? "wordmark--stacked" : ""} ${props.className ?? ""}`}>
			<span className="wordmark__prefix">Re:</span>
			<span className="wordmark__combine">Combine</span>
			<span className="wordmark__control">Control</span>
		</span>
	);
}
