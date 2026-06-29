'use client';

import { LangProvider } from '@/lib/i18n';
import { Nav } from '@/components/site/Nav';
import { Hero } from '@/components/site/Hero';
import { About } from '@/components/site/About';
import { Rooms } from '@/components/site/Rooms';
import { Location } from '@/components/site/Location';
import { MompoxStory } from '@/components/site/MompoxStory';
import { ThingsToDo } from '@/components/site/ThingsToDo';
import { Food } from '@/components/site/Food';
import { GettingThere, Climate } from '@/components/site/GettingThere';
import { FestivalCalendar } from '@/components/site/FestivalCalendar';
import { Reviews } from '@/components/site/Reviews';
import { Gallery } from '@/components/site/Gallery';
import { InstagramFeed } from '@/components/site/InstagramFeed';
import { BookingForm } from '@/components/site/BookingForm';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';
import { WhatsAppFloat } from '@/components/site/WhatsAppFloat';
import { MacondoQuotes } from '@/components/site/MacondoQuotes';
import { MompoxDictionary } from '@/components/site/MompoxDictionary';
import { AtmospherePanel } from '@/components/site/AtmospherePanel';

export default function Home() {
  return (
    <LangProvider>
      <div className="site-shell bg-background">
        <Nav />
        <main className="flex-1">
          <Hero />
          <About />
          <Rooms />
          <Location />
          <MompoxStory />
          <ThingsToDo />
          <Food />
          <GettingThere />
          <Climate />
          {/* v2.1: Festival calendar */}
          <FestivalCalendar />
          {/* v2.0: Momposino dictionary */}
          <MompoxDictionary />
          <Gallery />
          {/* v2.1: Instagram feed */}
          <InstagramFeed />
          <Reviews />
          {/* v2.1: Booking inquiry form */}
          <BookingForm />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
        {/* v2.0: Collapsible atmosphere panel (weather + sound) — bottom-left */}
        <AtmospherePanel />
        {/* v2.0: Magical realism quotes toast */}
        <MacondoQuotes />
      </div>
    </LangProvider>
  );
}
