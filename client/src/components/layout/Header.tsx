import { useState } from "react";
import { Container } from "../Container";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  // Mobile menu state
  const [mobileMenu, setMobileMenu] = useState<Boolean>(false);

  return (
    <header className="bg-black text-white relative">
      <Container>
        <nav className="flex justify-between items-center">
          <Link to="/" className="font-bold">
            OpenVote
          </Link>
          <div onClick={() => setMobileMenu(true)}>
            <RiMenuLine fontSize={26} />
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`absolute right-0 transition-all ease-out duration-700 ${
          mobileMenu
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } top-0 bg-black text-white w-full h-screen z-50`}
      >
        <section className="flex flex-col p-6">
          <div
            className="inline-block ml-auto mb-12"
            onClick={() => setMobileMenu(false)}
          >
            <RiCloseLine fontSize={40} />
          </div>
          <ul
            onClick={() => setMobileMenu(false)}
            className="flex flex-col gap-y-6 text-3xl font-bold"
          >
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
          <div className="my-12 h-0.5 bg-neutral-800"></div>
          <ul
            onClick={() => setMobileMenu(false)}
            className="flex flex-col font-bold text-xl gap-y-6"
          >
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </section>
      </div>
    </header>
  );
};
