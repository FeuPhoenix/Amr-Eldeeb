import dynamic from 'next/dynamic';
import { navItems } from "@/data";

// Static imports for components that don't use browser APIs
import Footer from "@/components/Footer";
//import RecentProjects from "@/components/RecentProjects";

// Dynamic imports for components that use browser APIs
const FloatingNav = dynamic(() => import("@/components/ui/FloatingNav"), {
  ssr: false,
});

const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
});

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
});

const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});

const Approach = dynamic(() => import("@/components/Approach"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-x-hidden">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
