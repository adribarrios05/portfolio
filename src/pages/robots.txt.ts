import { withBase } from '../utils/urls';
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(withBase('/sitemap.xml'), site)}\n`, { headers: { 'Content-Type': 'text/plain' } });
