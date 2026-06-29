import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Dynamic Open Graph image generator
// Usage: /api/og?title=...&subtitle=...
// Returns a 1200x630 PNG with the Casa Mónica brand styling.

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Hotel Casa Mónica';
  const subtitle = searchParams.get('subtitle') || 'Siéntete como en casa en Mompox';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #FDF6E8 0%, #F4E6C8 50%, #E8D6A0 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* Top brand bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: '#C8542A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FDF6E8',
              fontSize: 32,
              fontFamily: 'cursive',
            }}
          >
            CM
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 28, color: '#A0431F', fontFamily: 'cursive' }}>
              Casa Mónica
            </div>
            <div style={{ fontSize: 14, color: '#6B4A2B', letterSpacing: 4, textTransform: 'uppercase' }}>
              Mompox · Bolívar
            </div>
          </div>
        </div>

        {/* Main title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#3D2817',
              lineHeight: 1.05,
              fontFamily: 'serif',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#7A5A35',
              fontStyle: 'italic',
              fontFamily: 'serif',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom badges */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              background: '#C8542A',
              color: '#FDF6E8',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            UNESCO 1995
          </div>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              background: '#3D2817',
              color: '#C9A961',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            ★ 9.2/10
          </div>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              border: '2px solid #C9A961',
              color: '#6B4A2B',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            +57 300 310 0299
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
