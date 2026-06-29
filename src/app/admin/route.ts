// Serve the Decap CMS admin page at /admin
// This route ONLY handles the exact /admin path.
// Static files like /admin/config.yml are served from public/admin/ by Next.js.

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
