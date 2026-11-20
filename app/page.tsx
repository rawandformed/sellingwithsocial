import { Nav } from "@/components/site/nav";
import { AgencyMonth } from "@/components/sections/agency-month";
import { Hero } from "@/components/sections/hero";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AgencyMonth />
      </main>
    </>
  );
}
