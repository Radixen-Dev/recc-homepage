import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
	const { pathname, hash } = useLocation();

	useLayoutEffect(() => {
		if (hash) {
			const target = document.querySelector(hash);
			if (target instanceof HTMLElement) {
				target.scrollIntoView();
				return;
			}
		}

		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, [pathname, hash]);

	return null;
}
