import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import { extname, join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Compress HTML/CSS/JS responses (gzip/brotli via Accept-Encoding negotiation).
 * Images and the hero video are already compressed formats, so this mainly
 * shrinks the SSR'd HTML and JS bundles in transit.
 */
app.use(compression());

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Prerendered routes (e.g. `/portfolio`) are stored on disk as
 * `portfolio/index.html`. `express.static`'s directory/index resolution only
 * kicks in for URLs with a trailing slash, and `redirect: false` below means
 * it won't 301 `/portfolio` to `/portfolio/` to get there. Rewrite the
 * request internally (no visible redirect, URL bar stays the same) so
 * extension-less GETs still resolve to their prerendered `index.html`.
 */
app.use((req, _res, next) => {
  if (req.method === 'GET' && !extname(req.path) && !req.path.endsWith('/')) {
    req.url = req.url.replace(req.path, `${req.path}/`);
  }
  next();
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
