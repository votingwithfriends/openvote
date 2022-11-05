import React from "react";
import { Container } from "../Container";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Main: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
};
