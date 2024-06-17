/* eslint-disable react-refresh/only-export-components */
import {
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import backend from "../../data/instance";
import { UserDTO } from "../../models/backend/User.backend";
import genres from "../../data/genres";
import { useState } from "react";

const navigationLinks = [
  {
    name: "My wishlist",
    path: ".",
  },
  {
    name: "Add book",
    path: "add-book",
  },
  {
    name: "archive",
    path: "archive",
  },
];

export async function loader() {
  console.log("I got here too");
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }
  const user = await backend
    .get<{ user: UserDTO }>("/auth/me")
    .then((res) => res.data.user);
  return user;
}

export default function BookDashboard() {
  const data = useLoaderData() as UserDTO;
  const navigate = useNavigate();
  const [bookGenres, setBookGenres] = useState<
    { name: string; selected: boolean }[]
  >(genres.map((genre) => ({ ...genre, selected: false })));

  const changeBookGenresFilter = (value: string) => {
    setBookGenres((prev) =>
      prev.map((prevGenre) =>
        prevGenre.name === value
          ? { ...prevGenre, selected: !prevGenre.selected }
          : prevGenre
      )
    );
  }

  return (
    <div className="min-h-screen pb-5">
      <div className="flex justify-end items-center gap-4 mt-3 px-4">
        <h1>
          Welcome, {data?.firstName} {data?.lastName}
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-[#f1f2f7]  text-[#434449] px-[15px] py-1.5 rounded-sm"
        >
          Logout
        </button>
      </div>

      <div className="max-w-[840px] w-full mx-auto flex relative gap-4 mt-5">
        <div className="w-[190px] sticky top-2 h-min py-4 px-6 border border-[#f1f1f4]">
          {navigationLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `block my-[5px] border-l-4 border-transparent px-4 py-2 ${
                  isActive ? "border-[#3f51b5] bg-[#f1f1f4]" : ""
                }`
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="flex-1 ">
          <Outlet context={{ genres: bookGenres, changeGenres: changeBookGenresFilter }} />
        </div>
      </div>
    </div>
  );
}
