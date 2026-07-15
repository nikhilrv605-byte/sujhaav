import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InputForm from "@/components/InputForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#030303] text-[#f5f5f7] min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <InputForm />
      <Footer />
    </main>
  );
}