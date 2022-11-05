import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Main } from "../components/layout/Main";
import React from "react";

// Import routes
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Profile } from "./Profile";
import { CreatePoll } from "./CreatePoll";
import { CreateChoice } from "./CreateChoices";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="font-google-fonts h-full grid grid-rows-[auto_1fr_auto]">
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/u/:userId" element={<Profile />} />
            <Route path="/poll/cp/:userId" element={<CreatePoll />} />
            <Route path="/poll/choices/:userId" element={<CreateChoice />} />
          </Routes>
        </Main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
