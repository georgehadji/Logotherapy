import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import TherapistIntro from "@/components/sections/TherapistIntro";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Steps from "@/components/sections/Steps";
import SpaceGallery from "@/components/sections/SpaceGallery";
import ArticleTeasers from "@/components/sections/ArticleTeasers";
import Trust from "@/components/sections/Trust";
import Faq from "@/components/sections/Faq";
import ContactBlock from "@/components/sections/ContactBlock";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Steps />
        <ServicesGrid limit={6} />
        <TherapistIntro />
        <SpaceGallery />
        <ArticleTeasers limit={3} />
        <Trust />
        <Faq />
        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
