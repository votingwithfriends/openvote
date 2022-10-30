import { Link } from "react-router-dom";
export const Login: React.FC = () => {
  return (
    <section>
      <p>Login page</p>
      <form>
        <div className="flex flex-col gap-y-4">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="bg-blue-700 p-2 text-white" type="submit">
            Login
          </button>
          <Link to="/signup">Create an account</Link>
        </div>
      </form>
    </section>
  );
};
