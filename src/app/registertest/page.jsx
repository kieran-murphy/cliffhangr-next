"use client";

import React, { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username: username,
      email: email,
      password: password,
    };

    if (password === confirmPassword) {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: formData }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert("Successful registered");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          alert("Submission failed");
        }
      } catch (error) {
        console.error("There was an error submitting the form data", error);
        alert("There was an error submitting the form data");
      }
    } else {
      alert("Passwords dont match");
    }
  };

  return (
    <div className="App bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4 text-gray-600">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-black"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
