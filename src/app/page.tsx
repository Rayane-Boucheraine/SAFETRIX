import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";

export default function Home() {
  return (
    <div className="relative bg-[#0A0A0A] h-screen w-screen overflow-hidden">
      <Header />
      <Hero />
      <div className="absolute w-[600px] h-[600px] bottom-[-540px] left-[50%] translate-x-[-50%] bg-[#D8DFE6] rounded-[50%] blur-[100px] z-[50]"></div>
      <div className="absolute w-screen h-screen bottom-[-640px] left-[50%] translate-x-[-50%] bg-[#0ACF83] rounded-[50%] blur-[100px]"></div>
    </div>
  );
}
