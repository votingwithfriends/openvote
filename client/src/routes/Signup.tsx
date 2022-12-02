import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useIsEmailUsedLazyQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { Form } from "../components/Form";
import { InputField } from "../components/InputField";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../token";
import logo from "../assets/openvote.svg";

export const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [checkEmail] = useIsEmailUsedLazyQuery();
  const [dupEmailError, setDupEmailError] = useState(false);

  const [register] = useRegisterMutation();

  const [login] = useLoginMutation();

  const navigator = useNavigate();
  let passwordsMatch = password === confirmPw;

  useEffect(() => {
    passwordsMatch = password === confirmPw;
  }, [confirmPw]);

  return (
    <div className="flex bg-slate-100 h-full flex-col justify-center items-center">
      <Link to={"/"}>
        <img className="h-14" src={logo} alt="openvote logo link" />
      </Link>
      <Form
        title="Create new account"
        onSubmit={async (e) => {
          e.preventDefault();
          await register({
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
          onBlur={async () => {
            const { data, loading } = await checkEmail({
              variables: {
                email,
              },
            });
            if (data?.isEmailUsed) {
              setDupEmailError(true);
            } else {
              setDupEmailError(false);
            }
          }}
        >
          <p className="text-rose-500 h-5 text-sm">
            {dupEmailError ? "This email is already in use" : ""}
          </p>
        </InputField>
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
        <p className="text-rose-500 h-5">
          {passwordsMatch ? "" : "Passwords do not match"}
        </p>
        <button
          disabled={!passwordsMatch || confirmPw === "" || dupEmailError}
          className={`${
            passwordsMatch && confirmPw !== "" && !dupEmailError
              ? "bg-black"
              : "bg-slate-300"
          } p-4 rounded-md text-white`}
          type="submit"
        >
          Create Account
        </button>
        <p className="text-sm text-center">
          Already have an account?
          <Link className="ml-2 text-teal-500 underline" to="/login">
            Log in
          </Link>
        </p>
      </Form>
    </div>
  );
};
