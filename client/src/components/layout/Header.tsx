import { Container } from "../Container";
import { BiMenu } from "react-icons/bi";

export const Header: React.FC = () => {
  return (
    <header className="bg-black text-white">
      <Container>
        <nav className="flex justify-between items-center">
          <p className="font-bold">OpenVote</p>
          <BiMenu fontSize={26} />
        </nav>
      </Container>
    </header>
  );
};
