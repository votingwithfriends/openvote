import { FormEventHandler } from "react";
import { Container } from "../components/Container";

interface Props {
  onSubmit?: FormEventHandler;
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export const Form: React.FC<Props> = ({ onSubmit, title, children }) => {
  return (
    <Container padding="p-8">
      <form
        onSubmit={onSubmit}
        className="w-full md:w-96 md:mx-auto rounded-lg"
      >
        {title && (
          <h2 className="text-center font-bold text-2xl mb-8">{title}</h2>
        )}
        <div className="flex flex-col gap-y-6">{children}</div>
      </form>
    </Container>
  );
};
