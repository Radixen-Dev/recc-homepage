import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/health", (c) =>
	c.json({
		project: "Re:CombineControl",
		status: "ok",
	}),
);

export default app;
