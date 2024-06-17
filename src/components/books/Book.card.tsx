import { Link } from "react-router-dom";
import cover1 from "../../assets/cover1.jpeg";
import Tag from "../utils/Tag";
import { Book } from "../../models/Book";
import doneIcon from "../../assets/done.svg";
import crossIcon from "../../assets/cross.svg";
import trashIcon from "../../assets/trash.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookDTO } from "../../models/backend/Book.backend";
import { deleteBook, updateBook } from "../../data";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: Partial<Omit<BookDTO, "owner" | "id">>) =>
      updateBook(book.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });
  return (
    <div className="relative">
      <Link
        to={`/books/${book.id}`}
        className="hover:shadow-book  min-h-[270px] h-full border border-[#e4e5e9] rounded-sm p-4 pr-7 flex gap-4"
      >
        <div>
          <img
            src={book.imageUrl ?? cover1}
            className="w-[140px] h-[208px] object-contain"
            alt=""
          />
        </div>
        <div className="flex-1">
          <div>
            <h1 className="text-xl font-medium text-[#3f51b5]">{book.title}</h1>
            <p className="text-sm text-gray-500">{book.author}</p>
            <div className="mt-1 mb-3">
              {book.genres.length > 0 &&
                book.genres
                  .slice(0, 3)
                  .map((genre) => (
                    <Tag
                      key={genre}
                      value={genre}
                      selected={false}
                      onClick={() => {}}
                    />
                  ))}
            </div>
            <p className="text-sm text-[#434449] leading-[1.5]">
              {book.description}
            </p>
          </div>
        </div>
      </Link>
      <div className="translate-x-1/2 -translate-y-[40%] absolute top-1/2 right-[1px] flex flex-col gap-1">
        <button
          onClick={() => mutation.mutate({ done: !book.done })}
          className=" bg-white  border border-[#f1f1f4] w-10 h-10 flex justify-center items-center rounded-full"
          aria-label="Mark as done"
        >
          {book.done ? (
            <img
              src={crossIcon}
              alt=""
              width={28}
              height={28}
              className="opacity-60"
            />
          ) : (
            <img
              src={doneIcon}
              alt=""
              width={14}
              height={14}
              className="opacity-60"
            />
          )}
        </button>

        <button
          onClick={() => deleteMutation.mutate(book.id)}
          className=" bg-white  border border-[#f1f1f4] w-10 h-10 flex justify-center items-center rounded-full"
          aria-label="Mark as done"
        >
          <img src={trashIcon} alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
