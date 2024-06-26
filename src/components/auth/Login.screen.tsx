/* eslint-disable react-refresh/only-export-components */
import { useMutation } from "@tanstack/react-query";
import { login } from "../../data";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export function loader() {
    const token = localStorage.getItem('token');
    
    if (token) {
        return redirect("/")
    }
    return null;
    
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      login(data.email, data.password),
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
    });
  };

  return (
    <div className="h-screen bg-[#00000054] flex justify-center items-center">
      <div className="bg-white w-full max-w-[450px] h-[400px] px-8 pt-8 pb-14 rounded-sm">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center mb-5 mt-5">Login</h1>
          {mutation.error instanceof AxiosError && mutation.error.response?.status === 401 && (<h2 className="text-red-400" >Wrong email or password</h2>)}
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
          <button disabled={mutation.isPending} className="bg-[#324191] text-white py-2.5 px-4 mt-4 rounded-sm">
            {mutation.isPending ? "Loading..." : "Login"}
          </button>
          <p className="mt-2 text-gray-600">Not yet joined. Signup <Link to="/signup" className="text-blue-700 underline">here</Link> </p>
        </form>
      </div>
    </div>
  );
}
