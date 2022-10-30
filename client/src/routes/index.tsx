import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Main } from "../components/layout/Main";

// Import routes
import { Home } from "./Home";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="font-google-fonts h-full grid grid-rows-[auto_1fr_auto]">
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
