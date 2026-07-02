import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Features from "@/components/Features";
import About from "@/components/About";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import InputForm from "@/components/InputForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#030303] text-[#f5f5f7] min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Statistics />
      <About />
      <Features />
      <Products />
      <Services />
      <Testimonials />
      <InputForm />
      <Footer />
    </main>
  );
}