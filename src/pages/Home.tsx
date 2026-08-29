import Hero from "../components/home/Hero";
import Pillars from "../components/home/Pillars";
import WhoWeAreSection from "../components/home/WhoWeAreSection";
import ServicesSection from "../components/home/ServicesSection";
import IndustriesSection from "../components/home/IndustriesSection";
import ApproachSection from "../components/home/ApproachSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import LearningResourcesSection from "../components/home/LearningResourcesSection";
import GallerySection from "../components/home/GallerySection";
import CaseStudiesSection from "../components/home/CaseStudiesSection";
import FinalCTA from "../components/home/FinalCTA";
import SEO from "../components/ui/SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="Leading Safety, Security & Sustainability Consulting"
        description="3Sconsulting delivers international consulting, NEBOSH study modules, ISO 45001 certification readiness, enterprise risk management, and ESG sustainability advisory by P.V Sharma."
        canonicalUrl="https://www.3sconsulting.com/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "3Sconsulting",
          url: "https://www.3sconsulting.com",
          logo: "https://www.3sconsulting.com/images/logo.png",
          founder: {
            "@type": "Person",
            name: "P.V Sharma",
            jobTitle: "Founder & Principal Consultant",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9831800143",
            contactType: "customer service",
            areaServed: ["IN", "GB", "US", "AE", "Worldwide"],
            availableLanguage: ["English", "Hindi"],
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Prem Kuteer, VPO – SHivala Kalan",
            addressLocality: "Bijnor",
            addressRegion: "Uttar Pradesh",
            postalCode: "246734",
            addressCountry: "IN",
          },
        }}
      />
      <Hero />
      <Pillars />
      <WhoWeAreSection />
      <ServicesSection />
      <IndustriesSection />
      <ApproachSection />
      <FeaturedProjects />
      <LearningResourcesSection />
      <GallerySection />
      <CaseStudiesSection />
      <FinalCTA />
    </>
  );
}
