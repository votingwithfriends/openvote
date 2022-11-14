import { FormEventHandler } from "react";

interface Props {
  onSubmit?: FormEventHandler;
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export const Form: React.FC<Props> = ({ onSubmit, title, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white w-full md:w-auto p-8 rounded-lg border-2 border-blue-500"
    >
      {title && (
        <h2 className="text-center font-bold text-2xl mb-8">{title}</h2>
      )}
      <div className="flex flex-col gap-y-10">{children}</div>
    </form>
  );
};
