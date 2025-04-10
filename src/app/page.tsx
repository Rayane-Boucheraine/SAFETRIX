import About from "@/components/Landing/About";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import Services from "@/components/Landing/Services";
import Trust from "@/components/Landing/Trust";
// Import other sections when ready
// import WhyUs from "@/components/Landing/WhyUs";
// import Testimonial from "@/components/Landing/Testimonial";
// import Pricing from "@/components/Landing/Pricing";
import FAQ from "@/components/Landing/FAQ";

export default function Home() {
  return (
    <div className="bg-[#080808] text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <About />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
