import Tag from "../utils/Tag";
import { useOutletContext } from "react-router-dom";

interface SearchProps {
    value: string;
    filterBy: "title" | "author";
    changeValue: (value: string) => void;
    changeFilterBy: (value: "title" | "author") => void;
}

export default function Search({ value, filterBy, changeFilterBy, changeValue}: SearchProps) {
  const { genres, changeGenres } = useOutletContext<{
    genres: { name: string; selected: boolean }[];
    changeGenres: (value: string) => void;
  }>();

  return (
    <div className="mt-3">
      <form className="flex items-center gap-2" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <div className="flex-1">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              value={value}
              onChange={(e) => changeValue(e.target.value)}
              className="block w-full p-[14px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </div>
        <div>
          <select
            id="filter-by"
            value={filterBy}
            onChange={(e) => changeFilterBy(e.target.value as "title" | "author")}
            className="bg-gray-50 border h-full border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-[15px]"
          >
            <option disabled>Filter by</option>
            <option value="title">
              Book title
            </option>
            <option value="author">Author</option>
          </select>
        </div>
      </form>

      <div className="mt-2">
        {genres.map((genre) => (
          <Tag
            key={genre.name}
            onClick={changeGenres}
            value={genre.name}
            selected={genre.selected}
          />
        ))}
      </div>
    </div>
  );
}
