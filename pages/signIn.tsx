import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ToastError from '@/components/ToastError';

const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { query, replace } = useRouter();
  const callbackUrl = typeof query.callbackUrl === 'string' ? query.callbackUrl : '/';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const res = await signIn('credentials', {
      callbackUrl,
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.custom(() => (
        <ToastError
          message={res.error === 'CredentialsSignin' ? 'Invalid email or password.' : res.error}
        />
      ));
    } else if (res?.url) {
      replace(res.url); // 👈 this cleans the URL (instead of push, which keeps ?callbackUrl)
    }
  };

  return (
    <div className="text-center w-full md:w-1/2 mx-auto">
      <h1 className="text-2xl my-8">Login</h1>
      <form onSubmit={handleSubmit}>
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
