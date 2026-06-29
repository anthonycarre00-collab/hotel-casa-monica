'use client';
import { useState } from 'react';
import { useLang, WHATSAPP_NUMBER } from '@/lib/i18n';
import { Reveal, FiligreeDivider, Eyebrow } from './Reveal';
import { Calendar, Users, BedDouble, MessageCircle, User, StickyNote } from 'lucide-react';

export function BookingForm() {
  const { t, lang } = useLang();
  const [name, setName] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState('2');
  const [room, setRoom] = useState('any');
  const [notes, setNotes] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const guestsLabel: Record<string, string> = {
      '1': t('booking.guests.one'),
      '2': t('booking.guests.two'),
      '3': t('booking.guests.three'),
      '4': t('booking.guests.four'),
      '5': t('booking.guests.five'),
    };
    const roomLabel: Record<string, string> = {
      any: t('booking.room.any'),
      triple: t('booking.room.triple'),
      twin: t('booking.room.twin'),
      amenities: t('booking.room.amenities'),
    };

    const notesLine = notes ? `\n📝 ${lang === 'es' ? 'Notas' : 'Notes'}: ${notes}` : '';

    const msg = t('booking.messageTemplate')
      .replace('{name}', name || (lang === 'es' ? '(sin nombre)' : '(no name)'))
      .replace('{checkin}', checkin || '?')
      .replace('{checkout}', checkout || '?')
      .replace('{guests}', guestsLabel[guests] || guests)
      .replace('{room}', roomLabel[room] || room)
      .replace('{notes}', notesLine);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="bg-sunset-wash py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>{t('booking.title')}</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--wood)] leading-tight">
            {t('booking.title')}
          </h2>
          <p className="mt-3 text-[var(--wood-soft)] text-base sm:text-lg">
            {t('booking.subtitle')}
          </p>
          <FiligreeDivider />
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border)] space-y-5"
          >
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--wood)] mb-1.5">
                <User className="w-4 h-4 text-[var(--terracotta)]" />
                {t('booking.name')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('booking.namePlaceholder')}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] focus:border-transparent text-[var(--wood)]"
                required
              />
            </div>

            {/* Dates — checkin + checkout */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--wood)] mb-1.5">
                  <Calendar className="w-4 h-4 text-[var(--terracotta)]" />
                  {t('booking.checkin')}
                </label>
                <input
                  type="date"
                  value={checkin}
                  min={today}
                  onChange={(e) => setCheckin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] focus:border-transparent text-[var(--wood)]"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--wood)] mb-1.5">
                  <Calendar className="w-4 h-4 text-[var(--terracotta)]" />
                  {t('booking.checkout')}
                </label>
                <input
                  type="date"
                  value={checkout}
                  min={checkin || today}
                  onChange={(e) => setCheckout(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] focus:border-transparent text-[var(--wood)]"
                  required
                />
              </div>
            </div>

            {/* Guests + Room */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--wood)] mb-1.5">
                  <Users className="w-4 h-4 text-[var(--terracotta)]" />
                  {t('booking.guests')}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] focus:border-transparent text-[var(--wood)]"
                >
                  <option value="1">{t('booking.guests.one')}</option>
                  <option value="2">{t('booking.guests.two')}</option>
                  <option value="3">{t('booking.guests.three')}</option>
                  <option value="4">{t('booking.guests.four')}</option>
                  <option value="5">{t('booking.guests.five')}</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[var(--wood)] mb-1.5">
                  <BedDouble className="w-4 h-4 text-[var(--terracotta)]" />
                  {t('booking.room')}
                </label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] focus:border-transparent text-[var(--wood)]"
                >
                  <option value="any">{t('booking.room.any')}</option>
                  <option value="triple">{t('booking.room.triple')}</option>
                  <option value="twin">{t('booking.room.twin')}</option>
                  <option value="amenities">{t('booking.room.amenities')}</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--wood)] mb-1.5">
                <StickyNote className="w-4 h-4 text-[var(--terracotta)]" />
                {t('booking.notes')}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('booking.notesPlaceholder')}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--cream-50)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] focus:border-transparent text-[var(--wood)] resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              {t('booking.submit')}
            </button>

            <p className="text-xs text-[var(--wood-soft)] text-center italic">
              {lang === 'es'
                ? 'No cobramos comisiones — reserva directa con Fredy o Mónica.'
                : 'No commissions — book directly with Fredy or Mónica.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
