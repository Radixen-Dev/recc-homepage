# Re:CombineControl — Homepage

The landing page for **Re:CombineControl (Re:CC)**, a ground-up overhaul and
expansion of the CombineControl Garry's Mod gamemode.

Built with React, Vite, Hono, and deployed on Cloudflare Workers.

<!-- dash-content-start -->

The site is a single-page landing site: a hero introduction, background on the
project, a teaser of upcoming changes, current development status, and a call
to action to join the Discord server.

<!-- dash-content-end -->

## Development

Install dependencies:

```bash
npm install
```

Start the development server with:

```bash
npm run dev
```

Your application will be available at [http://localhost:5173](http://localhost:5173).

## Production

Build your project for production:

```bash
npm run build
```

Preview your build locally:

```bash
npm run preview
```

Deploy your project to Cloudflare Workers:

```bash
npm run build && npm run deploy
```

Monitor your workers:

```bash
npx wrangler tail
```

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [Hono Documentation](https://hono.dev/)
