// src/react-app/components/CookieConsent.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CLARITY_CONSENT_COOKIE } from "../constants";

declare global {
	interface Window {
		/** Exposed by the Clarity loader injected in src/worker/index.ts. */
		__clarityInit?: () => void;
	}
}

function readCookie(name: string): string | null {
	const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : null;
}

function writeConsentCookie(value: "granted" | "denied") {
	const maxAgeSeconds = 60 * 60 * 24 * 180; // ~180 days
	document.cookie = `${CLARITY_CONSENT_COOKIE}=${value}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function CookieConsent() {
	const [visible, setVisible] = useState(() => readCookie(CLARITY_CONSENT_COOKIE) === null);

	if (!visible) return null;

	const accept = () => {
		writeConsentCookie("granted");
		window.__clarityInit?.();
		setVisible(false);
	};

	const decline = () => {
		writeConsentCookie("denied");
		setVisible(false);
	};

	return (
		<div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
			<p className="cookie-banner__text">
				We use Microsoft Clarity to see how visitors use this site (clicks, scrolling, session
				recordings). It only runs if you accept. See our{" "}
				<Link to="/privacy">Privacy Policy</Link> for details.
			</p>
			<div className="cookie-banner__actions">
				<button type="button" className="btn btn--ghost btn--small" onClick={decline}>
					Decline
				</button>
				<button type="button" className="btn btn--primary btn--small" onClick={accept}>
					Accept
				</button>
			</div>
		</div>
	);
}
