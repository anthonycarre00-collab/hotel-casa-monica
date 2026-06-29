'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '@/lib/i18n';
import { Volume2, VolumeX, Waves, Wind, Bell } from 'lucide-react';

type SoundKey = 'river' | 'fan' | 'bells' | null;

export function AmbientSound() {
  const { t } = useLang();
  const [active, setActive] = useState<SoundKey>(null);
  const [open, setOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    master?: GainNode;
    cleanup?: () => void;
  }>({});

  // Lazy init AudioContext on first user interaction
  function getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      try {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AC();
      } catch {
        return null;
      }
    }
    return audioCtxRef.current;
  }

  // Build a river sound: filtered white noise + slow LFO on filter cutoff
  function buildRiver(ctx: AudioContext, master: GainNode) {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    // Brown-ish noise (deeper than white)
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 0.7;

    // LFO modulates filter for "lapping water" feel
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const riverGain = ctx.createGain();
    riverGain.gain.value = 0.18;

    noise.connect(filter);
    filter.connect(riverGain);
    riverGain.connect(master);

    noise.start();
    lfo.start();

    return () => {
      try { noise.stop(); } catch {}
      try { lfo.stop(); } catch {}
      noise.disconnect(); filter.disconnect(); riverGain.disconnect();
      lfo.disconnect(); lfoGain.disconnect();
    };
  }

  // Build a ceiling fan sound: low oscillator + tremolo + slight noise
  function buildFan(ctx: AudioContext, master: GainNode) {
    // Base hum
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 60; // mains hum-ish
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.02;

    // Lowpass to soften
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;

    // Tremolo — the "chop" of fan blades
    const tremolo = ctx.createOscillator();
    tremolo.frequency.value = 7; // ~7Hz = fan blade speed
    const tremoloGain = ctx.createGain();
    tremoloGain.gain.value = 0.4;
    const tremoloOffset = ctx.createConstantSource();
    tremoloOffset.offset.value = 0.6;

    const fanAmp = ctx.createGain();
    fanAmp.gain.value = 0.08;

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(fanAmp);

    tremolo.connect(tremoloGain);
    tremoloGain.connect(fanAmp.gain);
    tremoloOffset.connect(fanAmp.gain);

    fanAmp.connect(master);

    osc.start(); tremolo.start(); tremoloOffset.start();

    return () => {
      try { osc.stop(); } catch {}
      try { tremolo.stop(); } catch {}
      try { tremoloOffset.stop(); } catch {}
      osc.disconnect(); filter.disconnect(); oscGain.disconnect();
      tremolo.disconnect(); tremoloGain.disconnect(); tremoloOffset.disconnect();
      fanAmp.disconnect();
    };
  }

  // Build church bells: schedule random bell tones
  function buildBells(ctx: AudioContext, master: GainNode) {
    let stopped = false;
    let timer: any = null;

    function playBell() {
      if (stopped) return;
      // Bell — 3 inharmonic partials
      const now = ctx.currentTime;
      const fundamental = 220 + Math.random() * 80; // A3 to ~E4
      const partials = [1, 2.4, 3.8, 5.2];
      const amps = [0.5, 0.3, 0.2, 0.1];

      partials.forEach((p, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = fundamental * p;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(amps[i] * 0.3, now + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 4);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + 4.5);
      });

      // Schedule next bell in 15-45 seconds (rare, atmospheric)
      timer = setTimeout(playBell, 15000 + Math.random() * 30000);
    }

    // First bell after 2 seconds
    timer = setTimeout(playBell, 2000);

    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }

  const stopAll = useCallback(() => {
    if (nodesRef.current.cleanup) {
      nodesRef.current.cleanup();
      nodesRef.current.cleanup = undefined;
    }
    if (nodesRef.current.master) {
      try { nodesRef.current.master.disconnect(); } catch {}
      nodesRef.current.master = undefined;
    }
  }, []);

  const play = useCallback((key: Exclude<SoundKey, null>) => {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    stopAll();

    const master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(ctx.destination);
    nodesRef.current.master = master;

    let cleanup: () => void = () => {};
    if (key === 'river') cleanup = buildRiver(ctx, master);
    else if (key === 'fan') cleanup = buildFan(ctx, master);
    else if (key === 'bells') cleanup = buildBells(ctx, master);

    nodesRef.current.cleanup = () => {
      cleanup();
      try { master.disconnect(); } catch {}
    };

    setActive(key);
  }, [stopAll]);

  const stop = useCallback(() => {
    stopAll();
    setActive(null);
  }, [stopAll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAll();
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, [stopAll]);

  const sounds: { key: Exclude<SoundKey, null>; icon: typeof Waves; label: string }[] = [
    { key: 'river', icon: Waves, label: t('sound.river') },
    { key: 'fan',   icon: Wind,  label: t('sound.fan') },
    { key: 'bells', icon: Bell,  label: t('sound.bells') },
  ];

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-shadow overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between gap-3"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-[var(--terracotta)] text-white' : 'bg-[var(--cream-100)] text-[var(--terracotta)]'}`}>
            {active ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--wood-soft)] font-medium">
              {t('sound.title')}
            </div>
            <div className="font-serif text-sm text-[var(--wood)]">
              {active ? sounds.find(s => s.key === active)?.label : t('sound.off')}
            </div>
          </div>
        </div>
        <span className={`text-[var(--wood-soft)] transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="px-3 pb-3 grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-3">
          {sounds.map(s => (
            <button
              key={s.key}
              onClick={() => active === s.key ? stop() : play(s.key)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                active === s.key
                  ? 'bg-[var(--terracotta)] text-white shadow-md'
                  : 'bg-[var(--cream-100)] text-[var(--wood)] hover:bg-[var(--gold-soft)]/40'
              }`}
            >
              <s.icon className="w-4 h-4" />
              <span className="text-[10px] font-medium text-center leading-tight">{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
