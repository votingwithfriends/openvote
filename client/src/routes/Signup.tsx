import { Link } from "react-router-dom";
export const Signup: React.FC = () => {
  return (
    <section>
      <p>Signup page</p>
      <form>
        <div className="flex flex-col gap-y-4">
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="bg-blue-700 p-2 text-white" type="submit">
            Create Account
          </button>
          <Link to="/login">Log in instead</Link>
        </div>
      </form>
    </section>
  );
};
