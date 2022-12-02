import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// Import routes
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Profile } from "./Profile";
import { CreatePoll } from "./CreatePoll";
import { CreateChoice } from "./CreateChoices";
import { Poll } from "./Poll";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/u/:userId" element={<Profile />} />
        <Route path="/poll/cp/:userId" element={<CreatePoll />} />
        <Route
          path="/poll/choices/:pollId/:userId"
          element={<CreateChoice />}
        />
        <Route path="/poll/vote/:pollId/:userId" element={<Poll />} />
      </Routes>
    </BrowserRouter>
  );
};
