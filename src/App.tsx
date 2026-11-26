import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Why } from "@/components/sections/why";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

/* The whole site is one page. Sections are in src/components/sections. */
export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Why />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
