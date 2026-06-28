'use client';
import { useLang } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Plane, Bus, Ship, Footprints, Calendar, Thermometer, CloudRain, Music } from 'lucide-react';

export function GettingThere() {
  const { t, lang } = useLang();

  const modes = [
    { icon: Plane,      title: t('get.air.title'),   desc: t('get.air.desc') },
    { icon: Bus,        title: t('get.land.title'),  desc: t('get.land.desc') },
    { icon: Ship,       title: t('get.water.title'), desc: t('get.water.desc') },
    { icon: Footprints, title: t('get.around.title'),desc: t('get.around.desc') },
  ];

  return (
    <section id="getting-there" className="bg-sunset-wash py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('get.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('get.title')}
          </h2>
          <p className="mt-4 text-[var(--wood-soft)] max-w-3xl mx-auto text-base sm:text-lg">
            {t('get.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modes.map((m, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                <div className="w-12 h-12 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mb-4">
                  <m.icon className="w-6 h-6 text-[var(--terracotta)]" />
                </div>
                <h3 className="font-serif text-xl text-[var(--wood)] mb-3">{m.title}</h3>
                <p className="text-sm text-[var(--wood-soft)] leading-relaxed">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Climate() {
  const { t } = useLang();

  const cards = [
    { icon: Calendar,   label: t('climate.best'),      value: t('climate.bestVal') },
    { icon: Thermometer,label: t('climate.hottest'),   value: t('climate.hottestVal') },
    { icon: CloudRain,  label: t('climate.wettest'),   value: t('climate.wettestVal') },
    { icon: Music,      label: t('climate.festivals'), value: t('climate.festivalsVal') },
  ];

  return (
    <section id="climate" className="bg-cal py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('climate.eyebrow')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight max-w-4xl mx-auto">
            {t('climate.title')}
          </h2>
          <p className="mt-4 text-[var(--wood-soft)] max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {t('climate.desc')}
          </p>
          <FiligreeDivider />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-[var(--border)]">
                <c.icon className="w-7 h-7 text-[var(--terracotta)] mx-auto mb-3" />
                <div className="font-serif text-xl sm:text-2xl text-[var(--wood)]">{c.value}</div>
                <div className="text-[11px] tracking-wider uppercase text-[var(--wood-soft)] mt-2 leading-tight">
                  {c.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
