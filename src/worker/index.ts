import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/health", (c) => c.json({ status: "ok" }));

// Serves the built SPA and, when CLARITY_PROJECT_ID is configured on the
// Worker, injects the Microsoft Clarity loader into the document <head>.
// This keeps the tracking ID out of the source tree entirely; it only ever
// exists as a runtime binding set via `wrangler secret put CLARITY_PROJECT_ID`.
app.get("*", async (c) => {
	const assetResponse = await c.env.ASSETS.fetch(c.req.raw);

	const projectId = c.env.CLARITY_PROJECT_ID;
	const contentType = assetResponse.headers.get("content-type") ?? "";
	if (!projectId || !contentType.includes("text/html")) {
		return assetResponse;
	}

	return new HTMLRewriter()
		.on("head", {
			element(element) {
				element.append(clarityLoaderScript(projectId), { html: true });
			},
		})
		.transform(assetResponse);
});

function clarityLoaderScript(projectId: string) {
	const safeId = projectId.replace(/[^a-zA-Z0-9]/g, "");
	return `<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${safeId}");</script>`;
}

export default app;
