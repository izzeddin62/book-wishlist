export type BookDTO = {
    id: number;
    title: string;
    author: string;
    owner: string;
    description: string;
    genres: string[];
    imageUrl: string | null;
    done: boolean
}