'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ToastError from '@/components/ToastError';

const Home = (): React.JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    if (password === confirmPassword) {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: formData }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Successful registered');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        if (data?.error) {
          toast.custom(() => (
            <ToastError
              message={
                data.error?.includes('Unique constraint failed')
                  ? 'Username or email already taken'
                  : data.error
              }
            />
          ));
        }
      }
    } else {
      toast.custom(() => <ToastError message={'Passwords do not match. Please try again.'} />);
    }
  };

  return (
    <div className="text-center w-full md:w-1/2 mx-auto">
      <h1 className="text-2xl my-8">Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-control w-full max-w">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="username"
              placeholder="Type here"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
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
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary w-full mt-4 gap-2" type="submit">
            Register
          </button>
          <br />
          <br />
          <span>Already have an account? </span>
          <Link href="/signIn">
            <span style={{ color: 'teal', textDecoration: 'underline' }}>Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
