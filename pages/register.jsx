'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    if (password === confirmPassword) {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: formData }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert('Successful registered');
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          alert('Submission failed');
        }
      } catch (error) {
        console.error('There was an error submitting the form data', error);
        alert('There was an error submitting the form data');
      }
    } else {
      alert('Passwords dont match');
    }
  };

  return (
    <div className="text-center w-full md:w-1/2 mx-auto">
      <h1 className="text-2xl my-8">Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="username"
              placeholder="Type here"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered input-error w-full max-w-xs"
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
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered input-error w-full max-w-xs"
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
}
