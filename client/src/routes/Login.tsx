import { useState } from "react";
import { setAccessToken } from "../token";
import { Link, useNavigate } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [login] = useLoginMutation();

  const navigator = useNavigate();

  return (
    <section>
      <p>Login page</p>
      <form
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
            setAccessToken(response.data!.login.accessToken);
            navigator("/");
          } catch (error) {
            setLoginError(true);
            console.log(error);
          }
          setEmail("");
          setPassword("");
        }}
      >
        <div className="flex flex-col gap-y-4">
          {loginError && (
            <span className="text-rose-500">Incorrect email or password</span>
          )}
          <input
            type="email"
            placeholder="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-700 p-2 text-white" type="submit">
            Login
          </button>
          <Link to="/signup">Create an account</Link>
        </div>
      </form>
    </section>
  );
};
