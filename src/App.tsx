import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import LearningResources from "./pages/LearningResources";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import WriteBlog from "./pages/WriteBlog";
import Gallery from "./pages/Gallery";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="industries" element={<Industries />} />
          <Route path="industries/:slug" element={<IndustryDetail />} />
          <Route path="learning-resources" element={<LearningResources />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/write" element={<WriteBlog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="blogs/:slug" element={<BlogDetail />} />
          <Route path="gallery" element={<Gallery />} />
          {/* Backward compatibility redirects from insights */}
          <Route path="insights" element={<Navigate to="/gallery" replace />} />
          <Route path="insights/:slug" element={<Navigate to="/gallery" replace />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
