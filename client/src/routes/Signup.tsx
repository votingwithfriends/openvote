import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";
import { Form } from "../components/Form";
import { InputField } from "../components/InputField";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../token";

export const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [register] = useRegisterMutation();

  const [login] = useLoginMutation();

  const navigator = useNavigate();
  let passwordsMatch = password === confirmPw;

  useEffect(() => {
    passwordsMatch = password === confirmPw;
  }, [confirmPw]);

  return (
    <section className="flex flex-col mt-24 justify-center items-center">
      <Form
        title="Create new account"
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await register({
            variables: {
              username,
              email,
              password,
            },
          });
          const loginRes = await login({
            variables: {
              email,
              password,
            },
            // Update Apollo Cache
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user,
                },
              });
            },
          });
          if (loginRes && loginRes.data) {
            setAccessToken(loginRes.data.login.accessToken);
          }
          navigator("/");
        }}
      >
        <InputField
          labelText="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          labelText="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          labelText="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          labelText="Confirm password"
          type="password"
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
          } p-3 rounded text-white`}
          type="submit"
        >
          Create Account
        </button>
        <p className="text-sm text-center">
          Already have an account?
          <Link className="ml-2 text-blue-500 underline" to="/login">
            Log in
          </Link>
        </p>
      </Form>
    </section>
  );
};
