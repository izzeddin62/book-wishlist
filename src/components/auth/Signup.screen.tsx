/* eslint-disable react-refresh/only-export-components */
import { useMutation } from "@tanstack/react-query";
import { register } from "../../data";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export function loader() {
  const token = localStorage.getItem("token");

  if (token) {
    return redirect("/");
  }
  return null;
}

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    mutationKey: ["user"],
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
      firstName,
      lastName
    });
  };

  return (
    <div className="h-screen bg-[#00000054] flex justify-center items-center shadow-lg">
      <div className="bg-white w-full max-w-[450px] min-h-[400px] px-8 pt-8 pb-14">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center mb-5 mt-5">Signup</h1>
          <div className="mb-4">
            <label htmlFor="first-name" className="block mb-1 text-lg">
              First name
            </label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="eg. John"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last-name" className="block mb-1 text-lg">
              Last name
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="eg. John"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="xx@xx.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-lg">
              Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="password"
              required
            />
          </div>
          <button className="bg-[#324191] text-white py-2.5 px-4 mt-4 rounded-sm">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
