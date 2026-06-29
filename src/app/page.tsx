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
import { Reviews } from '@/components/site/Reviews';
import { Gallery } from '@/components/site/Gallery';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';
import { WhatsAppFloat } from '@/components/site/WhatsAppFloat';
import { MompoxWeather } from '@/components/site/MompoxWeather';
import { AmbientSound } from '@/components/site/AmbientSound';
import { MacondoQuotes } from '@/components/site/MacondoQuotes';
import { MompoxDictionary } from '@/components/site/MompoxDictionary';

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
          {/* v2.0: Momposino dictionary */}
          <MompoxDictionary />
          <Gallery />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
        {/* v2.0: Floating atmospheric features */}
        <div className="hidden lg:flex flex-col gap-3 fixed right-4 top-24 z-30 w-64">
          <MompoxWeather />
          <AmbientSound />
        </div>
        {/* v2.0: Magical realism quotes toast */}
        <MacondoQuotes />
      </div>
    </LangProvider>
  );
}
