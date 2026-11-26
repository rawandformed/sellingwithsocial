import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Why } from "@/components/sections/why";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Why />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
