import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBook, updateBook } from "../../data";
import cover1 from "../../assets/cover1.jpeg";
import Tag from "../utils/Tag";
import doneIcon from "../../assets/done.svg";
import crossIcon from "../../assets/cross.svg";
import trashIcon from "../../assets/trash.svg";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { BookDTO } from "../../models/backend/Book.backend";

export default function BookDetails() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>()
    const { data: book, isPending } = useQuery({
        queryKey: ["books", id],
        queryFn: () => getBook(Number(id as string)),
    });

    const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: Partial<Omit<BookDTO, "owner" | "id">>) =>
      updateBook(book?.id as number, data),
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
      navigate("/")
    },
  });
    if (isPending) {
        return <div>Loading...</div>
    }
    return (
        <div className="relative">
        <div
          className=" min-h-[270px] h-full border border-[#e4e5e9] rounded-sm p-4 pr-7 flex gap-4"
        >
          <div>
            <img
              src={book?.imageUrl ?? cover1}
              className="w-[140px] h-[208px] object-contain"
              alt=""
            />
          </div>
          <div className="flex-1">
            <div>
              <h1 className="text-xl font-medium text-[#3f51b5]">{book?.title}</h1>
              <p className="text-sm text-gray-500">{book?.author}</p>
              <div className="mt-1 mb-3">
                {book && book?.genres.length > 0 &&
                  book?.genres
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
                {book?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="translate-x-1/2 -translate-y-[40%] absolute top-1/2 right-[1px] flex flex-col gap-1">
          <button
            onClick={() => mutation.mutate({ done: !book?.done })}
            className=" bg-white  border border-[#f1f1f4] w-10 h-10 flex justify-center items-center rounded-full"
            aria-label="Mark as done"
          >
            {book?.done ? (
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
            onClick={() => deleteMutation.mutate(book?.id as number)}
            className=" bg-white  border border-[#f1f1f4] w-10 h-10 flex justify-center items-center rounded-full"
            aria-label="Mark as done"
          >
            <img src={trashIcon} alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    )
}