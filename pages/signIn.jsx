import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        callbackUrl: "/",
        email,
        password,
      });
    } catch (error) {
      alert("signIn error = ", error);
    }
  };

  return (
    <div className="text-center w-full md:w-1/2 mx-auto">
      <h1 className="text-2xl my-8">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Type here"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-error w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-error w-full max-w-xs"
          />
        </div>

        <button className="btn btn-primary w-full mt-4 gap-2" type="submit">
          Sign In
        </button>
        <br />
        <br />
        <span>Don&#39;t have an account? </span>
        <Link href="/register">
          <span style={{ color: "teal", textDecoration: "underline" }}>
            Register
          </span>
        </Link>
      </form>
    </div>
  );
}
