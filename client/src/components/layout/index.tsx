import React from "react";
import { Container } from "../Container";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="font-google-fonts h-full bg-blue-50 grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};
