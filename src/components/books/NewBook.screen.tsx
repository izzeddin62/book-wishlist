import { useState } from "react";
import genres from "../../data/genres";
import Tag from "../utils/Tag";
import { useMutation } from "@tanstack/react-query";
import { BookDTO } from "../../models/backend/Book.backend";
import { addBook } from "../../data";
import { useNavigate } from "react-router-dom";

export default function NewBook() {
  const navigate = useNavigate();
  const [bookGenres, setBookGenres] = useState<
    { name: string; selected: boolean }[]
  >(genres.map((genre) => ({ ...genre, selected: false })));
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    imageUrl: "",
    description: "",
  });

  const mutation = useMutation({
    mutationFn: (data: Omit<BookDTO, "owner" | "id" | "done">) => {
      return addBook(data);
    },
    onSuccess: () => {
      setFormData({
        title: "",
        author: "",
        imageUrl: "",
        description: "",
      });
      setBookGenres((prev) =>
        prev.map((genre) => ({ ...genre, selected: false }))
      );
      navigate("/");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const genres = bookGenres
      .filter((genre) => genre.selected)
      .map((genre) => genre.name);
    mutation.mutate({
      title: formData.title.trim(),
      author: formData.author.trim(),
      imageUrl: formData.imageUrl.trim() === "" ? null : formData.imageUrl.trim(),
      description: formData.description.trim(),
      genres,
    });
  };

  return (
    <div>
      <h1 className="text-2xl">Add to wishlist</h1>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-5">
          <p className="block mb-2 text-sm font-medium text-gray-900 ">Genre</p>
          <div>
            {bookGenres.map((genre) => (
              <Tag
                key={genre.name}
                onClick={(value: string) => {
                  setBookGenres((prev) =>
                    prev.map((prevGenre) =>
                      prevGenre.name === value
                        ? { ...prevGenre, selected: !prevGenre.selected }
                        : prevGenre
                    )
                  );
                }}
                value={genre.name}
                selected={genre.selected}
              />
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Book title*
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="eg: The Alchemist"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Book author*
          </label>
          <input
            type="text"
            id="author"
            title="space only are not allowed"
            value={formData.author}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            placeholder="eg: Paulo Coelho"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="imageUrl"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Book cover image link
          </label>
          <input
            type="text"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Book description*
          </label>
          <textarea
            required
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="description..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {mutation.isPending ? "Adding..." : "Add book"}
        </button>
      </form>
    </div>
  );
}
