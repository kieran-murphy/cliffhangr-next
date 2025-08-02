import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      // callbackUrl: '/',
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="text-center w-full md:w-1/2 mx-auto">
      <h1 className="text-2xl my-8">Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500">{error}</div>}
        <div className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Type here"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
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
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full mt-4 gap-2" type="submit">
          Sign In
        </button>
        <br />
        <br />
        <span>Don&#39;t have an account? </span>
        <Link href="/register">
          <span style={{ color: 'teal', textDecoration: 'underline' }}>Register</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
