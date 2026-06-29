'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/i18n';
import { getWmo } from '@/lib/v2-data';
import { Sun, Droplets, Wind, RefreshCw } from 'lucide-react';

type WeatherData = {
  temperature: number;
  apparent: number;
  humidity: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  localtime: string;
};

const MOMPOX_TZ = 'America/Bogota';

export function MompoxWeather() {
  const { t, lang } = useLang();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [clock, setClock] = useState<string>('');

  async function fetchWeather() {
    setLoading(true);
    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=9.2414&longitude=-74.4258&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=America%2FBogota';
      const res = await fetch(url);
      const json = await res.json();
      setData({
        temperature: Math.round(json.current.temperature_2m),
        apparent: Math.round(json.current.apparent_temperature),
        humidity: json.current.relative_humidity_2m,
        weatherCode: json.current.weather_code,
        isDay: json.current.is_day === 1,
        windSpeed: Math.round(json.current.wind_speed_10m),
        localtime: json.current.time,
      });
    } catch (e) {
      // silent fail — widget will show fallback
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 10 minutes
    const w = setInterval(fetchWeather, 10 * 60 * 1000);
    // Update clock every second
    const updateClock = () => {
      try {
        const now = new Date();
        const fmt = new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', {
          timeZone: MOMPOX_TZ,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setClock(fmt.format(now));
      } catch {
        setClock('');
      }
    };
    updateClock();
    const c = setInterval(updateClock, 1000);
    return () => { clearInterval(w); clearInterval(c); };
  }, [lang]);

  // Determine "siesta hour" / walking recommendation + contextual activity suggestion
  function getMood(temp: number, code: number) {
    if (code >= 51 && code < 80) return { key: 'rain', icon: '🌧️', recKey: 'indoor' };
    if (temp >= 33) return { key: 'siesta', icon: '🥵', recKey: 'filigree' };
    if (temp >= 28) return { key: 'hot', icon: '☀️', recKey: 'river' };
    if (temp >= 24 && code <= 2) return { key: 'perfect', icon: '🌅', recKey: 'walking' };
    return { key: 'perfect', icon: '🌅', recKey: 'riverCruise' };
  }

  if (loading && !data) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-[var(--border)] flex items-center gap-3">
        <RefreshCw className="w-4 h-4 animate-spin text-[var(--terracotta)]" />
        <span className="text-sm text-[var(--wood-soft)]">{t('weather.title')}...</span>
      </div>
    );
  }

  if (!data) {
    return null; // silent fail
  }

  const wmo = getWmo(data.weatherCode);
  const mood = getMood(data.temperature, data.weatherCode);
  const moodTitle = t(`weather.${mood.key}`);
  const moodDesc = t(`weather.${mood.key}Desc`);
  const recommendation = t(`weatherRec.${mood.recKey}`);

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-[var(--border)] hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--wood-soft)] font-medium">
            {t('weather.title')}
          </div>
          <div className="font-script text-2xl text-[var(--terracotta-dark)]">Mompox</div>
        </div>
        <div className="text-right">
          <div className="font-serif text-2xl text-[var(--wood)] tabular-nums">{clock}</div>
          <div className="text-[10px] text-[var(--wood-soft)]">
            {data.isDay ? (lang === 'es' ? 'día' : 'day') : (lang === 'es' ? 'noche' : 'night')}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-4xl">{wmo.icon}</div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl text-[var(--wood)]">{data.temperature}°</span>
            <span className="text-xs text-[var(--wood-soft)]">C</span>
          </div>
          <div className="text-xs text-[var(--wood-soft)]">
            {lang === 'es' ? wmo.label : wmo.labelEn}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[var(--border)] text-center">
        <div>
          <div className="flex items-center justify-center gap-1 text-[var(--wood-soft)]">
            <Sun className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-wider">{t('weather.feels')}</span>
          </div>
          <div className="font-serif text-sm text-[var(--wood)]">{data.apparent}°</div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-[var(--wood-soft)]">
            <Droplets className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-wider">{t('weather.humidity')}</span>
          </div>
          <div className="font-serif text-sm text-[var(--wood)]">{data.humidity}%</div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-[var(--wood-soft)]">
            <Wind className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-wider">{lang === 'es' ? 'Viento' : 'Wind'}</span>
          </div>
          <div className="font-serif text-sm text-[var(--wood)]">{data.windSpeed}</div>
        </div>
      </div>

      {/* Mood line */}
      <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-start gap-2">
        <span className="text-lg leading-none">{mood.icon}</span>
        <div>
          <div className="font-serif text-sm text-[var(--terracotta-dark)] italic">{moodTitle}</div>
          <div className="text-[11px] text-[var(--wood-soft)] leading-tight">{moodDesc}</div>
        </div>
      </div>

      {/* Weather-based recommendation */}
      <div className="mt-2 pt-2 border-t border-[var(--border)]/50 flex items-start gap-2">
        <span className="text-sm leading-none">💡</span>
        <div>
          <div className="text-[9px] uppercase tracking-[0.2em] text-[var(--wood-soft)] mb-0.5">
            {t('weatherRec.title')}
          </div>
          <div className="text-[11px] text-[var(--wood)] leading-snug">{recommendation}</div>
        </div>
      </div>
    </div>
  );
}
