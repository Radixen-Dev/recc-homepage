// src/react-app/components/Logo.tsx

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
