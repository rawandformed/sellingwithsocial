import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { AgencyMonth } from "@/components/sections/agency-month";
import { Compare } from "@/components/sections/compare";
import { Faq } from "@/components/sections/faq";
import { Founders } from "@/components/sections/founders";
import { Hero } from "@/components/sections/hero";
import { Offer } from "@/components/sections/offer";
import { SixJobs } from "@/components/sections/six-jobs";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AgencyMonth />
        <SixJobs />
        <Compare />
        <Founders />
        <Offer />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
