import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
