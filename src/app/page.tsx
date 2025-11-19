import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/Menu";
import { ReserveContact } from "@/components/sections/ReserveContact";
import { Footer } from "@/components/sections/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Hero />
      <MenuSection />
      <ReserveContact />
      <Footer />
    </main>
  );
}
