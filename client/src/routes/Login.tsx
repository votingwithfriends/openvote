import { useState } from "react";
import { setAccessToken } from "../token";
import { Link, useNavigate } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { Form } from "../components/Form";
import { InputField } from "../components/InputField";
export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [login] = useLoginMutation();

  const navigator = useNavigate();

  return (
    <section className="flex flex-col mt-24 justify-center items-center">
      <Form
        title="Login"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await login({
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
            if (response && response.data) {
              setAccessToken(response.data.login.accessToken);
            }
            navigator("/");
          } catch (error) {
            setLoginError(true);
            setPassword("");
          }
        }}
      >
        <>
          {loginError && (
            <span className="text-rose-500">Incorrect email or password</span>
          )}
        </>
        <InputField
          labelText="Email"
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          labelText="Password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-700 rounded p-3 text-white" type="submit">
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?
          <Link className="ml-2 underline text-blue-500" to="/signup">
            Create one
          </Link>
        </p>
      </Form>
    </section>
  );
};
