// src/react-app/components/CookieConsent.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CLARITY_CONSENT_COOKIE } from "../constants";

declare global {
	interface Window {
		/** Present once the Microsoft Clarity loader (src/worker/index.ts) has run. */
		clarity?: (...args: unknown[]) => void;
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

	const dismiss = () => {
		writeConsentCookie("granted");
		setVisible(false);
	};

	const optOut = () => {
		writeConsentCookie("denied");
		// Stops the current session immediately and erases Clarity's cookies;
		// the server also skips injecting the loader on future page loads.
		window.clarity?.("consent", false);
		setVisible(false);
	};

	return (
		<div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie notice">
			<p className="cookie-banner__text">
				This site uses Microsoft Clarity analytics. <Link to="/privacy">Privacy Policy</Link>
			</p>
			<div className="cookie-banner__actions">
				<button
					type="button"
					className="btn btn--ghost btn--small cookie-banner__optout"
					onClick={optOut}
				>
					Opt out
				</button>
				<button
					type="button"
					className="btn btn--primary btn--small cookie-banner__ok"
					onClick={dismiss}
					aria-label="Dismiss"
				>
					OK
				</button>
			</div>
		</div>
	);
}
