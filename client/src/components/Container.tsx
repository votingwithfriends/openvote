interface Props {
  padding?: string;
  children: JSX.Element | JSX.Element[];
}

export const Container: React.FC<Props> = ({ padding, children }) => {
  return (
    <div
      className={`w-full max-w-screen-xl mx-auto ${padding ? padding : "p-6"}`}
    >
      {children}
    </div>
  );
};
