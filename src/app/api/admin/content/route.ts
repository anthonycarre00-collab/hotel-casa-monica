// API route: /api/admin/content
// Handles reading and writing content JSON files via GitHub API.
// Password-protected — the GitHub token never reaches the browser.

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'anthonycarre00-collab/hotel-casa-monica';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Simple rate limiting — blocks brute force
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }
  record.count++;
  return {
    allowed: record.count <= MAX_ATTEMPTS,
    remaining: Math.max(0, MAX_ATTEMPTS - record.count),
  };
}

function verifyPassword(provided: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  // Constant-time comparison to prevent timing attacks
  const a = Buffer.from(provided.normalize('NFC'), 'utf8');
  const b = Buffer.from(ADMIN_PASSWORD.normalize('NFC'), 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// GET /api/admin/content?file=hero — read a content file (password-protected)
// POST /api/admin/content — write a content file { file, content, password }
export async function GET(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    );
  }

  // Verify password from X-Admin-Password header
  const providedPassword = req.headers.get('x-admin-password') || '';
  if (!verifyPassword(providedPassword)) {
    return NextResponse.json(
      { error: `Unauthorized. ${rateLimit.remaining} attempts remaining.` },
      { status: 401 }
    );
  }

  const file = req.nextUrl.searchParams.get('file');
  if (!file) {
    return NextResponse.json({ error: 'Missing file parameter' }, { status: 400 });
  }

  // Only allow reading from content/ directory
  if (!file.match(/^[a-zA-Z0-9/_-]+\.json$/) || file.includes('..')) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'Server not configured (GITHUB_TOKEN missing)' }, { status: 500 });
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/content/${file}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `GitHub API error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return NextResponse.json({
      content: JSON.parse(content),
      sha: data.sha, // needed for updating
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { password, file, content, sha, message } = body;

  if (!password || !file || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { error: `Invalid password. ${rateLimit.remaining} attempts remaining.` },
      { status: 401 }
    );
  }

  // Only allow writing to content/ directory
  if (!file.match(/^[a-zA-Z0-9/_-]+\.json$/) || file.includes('..')) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'Server not configured (GITHUB_TOKEN missing)' }, { status: 500 });
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/content/${file}`;
    const encodedContent = Buffer.from(JSON.stringify(content, null, 2), 'utf-8').toString('base64');

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message || `CMS edit: ${file}`,
        content: encodedContent,
        sha: sha, // required for updating existing file
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: `GitHub API error: ${errData.message || res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      sha: data.content.sha,
      commit: data.commit.sha,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
