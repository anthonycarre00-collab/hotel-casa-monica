// Serve Decap CMS admin page
// This route serves the static HTML from /public/admin/index.html
// Decap CMS needs a plain HTML page, not a React component

import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-static';

export async function GET() {
  const html = readFileSync(join(process.cwd(), 'public', 'admin', 'index.html'), 'utf-8');
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
