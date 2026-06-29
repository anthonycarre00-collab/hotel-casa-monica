'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { MapPin, Car, Star, Quote } from 'lucide-react';

export function About() {
  const { t, lang } = useLang();

  const stats = [
    { icon: Star,  label: t('about.stats.rating'),   value: '9.2/10' },
    { icon: Star,  label: t('about.stats.reviews'),  value: '55' },
    { icon: MapPin,label: t('about.stats.location'), value: '★' },
    { icon: Car,   label: t('about.stats.parking'),  value: '✓' },
  ];

  const owners = [
    {
      img: '/owner-fredy.png',
      name: t('about.fredy.name'),
      role: t('about.fredy.role'),
      tagline: t('about.fredy.tagline'),
      bio: t('about.fredy.bio'),
      monogram: 'F',
      accent: 'terracotta',
    },
    {
      img: '/owner-monica.png',
      name: t('about.monica.name'),
      role: t('about.monica.role'),
      tagline: t('about.monica.tagline'),
      bio: t('about.monica.bio'),
      monogram: 'M',
      accent: 'brick',
    },
  ];

  return (
    <section id="about" className="bg-cal py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('about.title')}
          </h2>
          <FiligreeDivider />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          {/* Real uploaded images only — day facade + night facade */}
          <Reveal className="relative">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="mt-8">
                <img
                  src="/hotel-exterior-day.png"
                  alt="Fachada de Hotel Casa Mónica con un músico tocando acordeón"
                  className="rounded-2xl shadow-xl w-full aspect-[4/5] object-cover img-lift"
                />
              </div>
              <div>
                <img
                  src="/hotel-exterior-night.png"
                  alt="Fachada de Hotel Casa Mónica iluminada en la noche"
                  className="rounded-2xl shadow-xl w-full aspect-[4/5] object-cover img-lift"
                />
              </div>
            </div>

            {/* Floating ornaments */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[var(--gold-soft)]/30 -z-10 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[var(--terracotta)]/15 -z-10 blur-3xl" />
          </Reveal>

          {/* Text */}
          <Reveal delay={120}>
            <div className="space-y-5 text-[var(--wood)] text-base sm:text-lg leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 80} className="text-center p-4 rounded-xl bg-[var(--cream-100)]/60 border border-[var(--border)]">
                  <s.icon className="w-5 h-5 text-[var(--terracotta)] mx-auto mb-2" />
                  <div className="font-serif text-xl text-[var(--wood)]">{s.value}</div>
                  <div className="text-[10px] tracking-wider uppercase text-[var(--wood-soft)] mt-1 leading-tight">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Owner cards — Fredy & Mónica */}
        <Reveal className="mt-20 text-center">
          <Eyebrow>{t('about.owner.title')}</Eyebrow>
          <h3 className="font-script text-4xl sm:text-5xl text-[var(--terracotta-dark)] mb-2">
            Fredy <span className="text-[var(--gold)] mx-1">&</span> Mónica
          </h3>
          <p className="text-sm text-[var(--wood-soft)] italic max-w-xl mx-auto">
            {t('about.owners.note')}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mt-10 max-w-5xl mx-auto">
          {owners.map((owner, i) => (
            <Reveal key={i} delay={i * 150}>
              <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                {/* Portrait with monogram fallback */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--cream-100)]">
                  <img
                    src={owner.img}
                    alt={owner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Warm vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--wood)]/40 via-transparent to-transparent pointer-events-none" />
                  {/* Monogram badge */}
                  <div className={`absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center font-script text-3xl text-white shadow-lg ${owner.accent === 'terracotta' ? 'bg-[var(--terracotta)]' : 'bg-[var(--brick)]'}`}>
                    {owner.monogram}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="font-serif text-2xl text-[var(--wood)]">{owner.name}</h4>
                    <span className="text-xs uppercase tracking-wider text-[var(--wood-soft)]">{owner.role}</span>
                  </div>
                  <p className={`font-serif italic text-base leading-snug mb-3 ${owner.accent === 'terracotta' ? 'text-[var(--terracotta-dark)]' : 'text-[var(--brick)]'}`}>
                    {owner.tagline}
                  </p>
                  <p className="text-sm text-[var(--wood-soft)] leading-relaxed">{owner.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Original owner quote — kept, but warmer placement */}
        <Reveal className="mt-12 max-w-3xl mx-auto">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border-l-4 border-[var(--gold)] shadow-md">
            <Quote className="w-8 h-8 text-[var(--gold)] mb-2" />
            <p className="font-serif italic text-[var(--wood)] text-lg leading-relaxed">
              {t('about.owner.quote')}
            </p>
            <p className="mt-3 text-sm text-[var(--wood-soft)] font-medium">
              — {t('about.owner.name')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
