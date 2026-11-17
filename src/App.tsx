import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// reducedMotion="user" respects the visitor's "reduce motion" OS setting.
const App = () => (
  <LanguageProvider>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  </LanguageProvider>
);

export default App;
