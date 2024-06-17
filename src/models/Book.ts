import { BookDTO } from "./backend/Book.backend";

export class Book {
    id: number;
    title: string;
    author: string;
    owner: string;
    description: string;
    genres: string[];
    imageUrl: string | null;
    done: boolean;

    constructor(data: BookDTO) {
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.owner = data.owner;
        this.description = data.description;
        this.genres = data.genres;
        this.imageUrl = data.imageUrl;
        this.done = data.done;
    }

}