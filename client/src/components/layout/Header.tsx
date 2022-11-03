import { useState } from "react";
import { Container } from "../Container";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { Link } from "react-router-dom";
import { setAccessToken } from "../../token";

export const Header: React.FC = () => {
  // Get user currently logged in
  const { loading, data } = useMeQuery();

  // Log user out
  const [logout, { client }] = useLogoutMutation();

  // Mobile menu state
  const [mobileMenu, setMobileMenu] = useState<Boolean>(false);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <header className="bg-black text-white relative">
      <Container>
        <nav className="flex justify-between items-center">
          <Link to="/" className="font-bold">
            OpenVote
          </Link>
          <div className="md:hidden" onClick={() => setMobileMenu(true)}>
            <RiMenuLine fontSize={26} />
          </div>
          {data && data.me ? (
            <ul className="hidden md:flex flex-col">
              <li>
                <Link
                  className="font-bold text-lg"
                  to={`/profile/u/${data.me.id}`}
                >
                  {data?.me?.username}
                </Link>
              </li>
              <li>
                <p
                  className="cursor-pointer"
                  onClick={async () => {
                    await logout();
                    setAccessToken("");
                    await client.resetStore();
                  }}
                >
                  Logout
                </p>
              </li>
            </ul>
          ) : (
            <ul className="hidden md:flex gap-x-10">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          )}
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`absolute right-0 transition-all ease-out duration-300 ${
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
          <div onClick={() => setMobileMenu(false)}>
            {data && data.me ? (
              <ul className="flex flex-col gap-y-6 font-bold">
                <li>
                  <Link className="text-3xl" to="/">
                    {data.me?.username}
                  </Link>
                </li>
                <li>
                  <p
                    onClick={async () => {
                      await logout();
                      setAccessToken("");
                      await client.resetStore();
                    }}
                  >
                    Logout
                  </p>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-y-6 text-3xl font-bold">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            )}
            <div className="my-12 h-0.5 bg-neutral-800"></div>
            <ul className="flex flex-col font-bold text-xl gap-y-6">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </header>
  );
};
