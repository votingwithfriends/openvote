import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

export const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [register] = useRegisterMutation();

  const navigator = useNavigate();
  let passwordsMatch = password === confirmPw;

  useEffect(() => {
    passwordsMatch = password === confirmPw;
  }, [confirmPw]);

  return (
    <section>
      <p>Signup page</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await register({
            variables: {
              username,
              email,
              password,
            },
          });
          console.log(response);
          navigator("/");
        }}
      >
        <div className="flex flex-col gap-y-4">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
          <p className="text-rose-500">
            {passwordsMatch ? "" : "Passwords do not match"}
          </p>
          <button
            disabled={!passwordsMatch || confirmPw === ""}
            className={`${
              passwordsMatch && confirmPw !== ""
                ? "bg-blue-700"
                : "bg-neutral-600"
            } p-2 text-white`}
            type="submit"
          >
            Create Account
          </button>
          <Link to="/login">Log in instead</Link>
        </div>
      </form>
    </section>
  );
};
