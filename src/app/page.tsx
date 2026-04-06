import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { WhyTorvi } from "@/components/landing/WhyTorvi";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { RolePaths } from "@/components/landing/RolePaths";
import { FourWeekPath } from "@/components/landing/FourWeekPath";
import { WhatYouLeaveWith } from "@/components/landing/WhatYouLeaveWith";
import { Pricing } from "@/components/landing/Pricing";
import { WaitlistCapture } from "@/components/landing/WaitlistCapture";
import { FAQ } from "@/components/landing/FAQ";
import { LandingCTA } from "@/components/landing/LandingCTA";

export default function LandingPage() {
  return (
    <>
      <Navbar variant="public" />
      <main>
        <Hero />
        <WaitlistCapture />
        <WhyTorvi />
        <WhoItsFor />
        <RolePaths />
        <FourWeekPath />
        <WhatYouLeaveWith />
        <Pricing />
        <FAQ />
        <LandingCTA />
      </main>
      <Footer />
    </>
  );
}
