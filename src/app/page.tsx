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
          <Gallery />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LangProvider>
  );
}
