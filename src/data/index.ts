import { BookDTO } from "../models/backend/Book.backend";
import { UserDTO } from "../models/backend/User.backend";
import { Book } from "../models/Book";
import { User } from "../models/User";
import backend from "./instance";


export async function login(email: string, password: string) {
  const response = await backend.post<{ user: UserDTO; token: string; }>("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return new User(response.data.user);
}

export async function register(user: Omit<UserDTO, 'id'> & { password: string }) {
    const response = await backend.post<{ user: UserDTO; token: string; }>("/auth/signup", user);
    localStorage.setItem("token", response.data.token);
    return new User(response.data.user);
}

export async function addBook(book: Omit<BookDTO, 'owner' | 'id' | 'done'>) {
    const response = await backend.post<{ book: BookDTO }>("/books", book);
    return new Book(response.data.book);
}

export async function getBook(bookId: number) {
    const response = await backend.get<{ book: BookDTO }>(`/books/${bookId}`);
    return new Book(response.data.book);

}


export async function getBooks() {
    const response = await backend.get<{ books: BookDTO[] }>("/books");
    return response.data.books.map(book => new Book(book));
}

export async function updateBook(bookId: number, book: Partial<Omit<BookDTO, 'owner' | 'id'>>) {
    const response = await backend.patch<{ book: BookDTO }>(`/books/${bookId}`, book);
    return new Book(response.data.book);
}

export async function deleteBook(bookId: number) {
    await backend.delete(`/books/${bookId}`);
}