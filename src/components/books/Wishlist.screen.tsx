import { useQuery } from "@tanstack/react-query";
import BookCard from "./Book.card";
import { getBooks } from "../../data";
import Search from "./Search";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Wishlist() {
  const { isPending, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState<"title" | "author">("title");
  const { genres } = useOutletContext<{
    genres: { name: string; selected: string }[];
  }>();
  const selectedGenres = genres
    .filter((genre) => genre.selected)
    .map((genre) => genre.name);

  console.log(value, filterBy);

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log(books);
  return (
    <div>
      <h1 className="text-xl text-[#434449]">Welcome to your wishlist</h1>
      <h2 className="text-gray-500 text-sm">
        What are you going to read today?
      </h2>
      <div>
        <Search
          value={value}
          changeValue={setValue}
          filterBy={filterBy}
          changeFilterBy={setFilterBy}
        />
      </div>
      <div className="mt-5 flex flex-col gap-5">
        {books
          ?.filter((book) => {
            if (value === "") return true;
            return book[filterBy].toLowerCase().includes(value.toLowerCase());
          })
          .filter((book) => {
            if (selectedGenres.length === 0) return true;
            return book.genres.some((genre) => selectedGenres.includes(genre));
          })
          .filter((book) => !book.done)
          .reverse()
          .map((book) => {
            return <BookCard key={book.id} book={book} />;
          })}
      </div>
    </div>
  );
}
