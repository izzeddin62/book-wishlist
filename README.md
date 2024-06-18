# Book wishlist frontend
This is the frontend for the book wishlist project. It is a simple React app that allows users to add books to a wishlist.

It is built with React, React-router, tanstack query and tailwindcss.

If you want to look at the backend, you can find it [here](https://github.com/izzeddin62/book-wishlist-backend)

## Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and copy the contents of `.env.example` into it
4. update the `VITE_BACKEND_URL` variable in the `.env` file to point to the backend server
5. Run `npm run dev` to start the development server

## Build
To build the project, run `npm run build`. The build files will be in the `dist` directory.

## Project structure
- `src` contains the source code
  - `components` contains the react components
  - `auth` contains the all the component related to authentication(login screen, register screen, etc)
  - `books` contains the all the component related to books(books list, book details, etc)
  - `utils` contains utility components ex: Tag
  - `data` contains all the methods to communicate with the backend
  - `App.tsx` is the main component(setup the routes and the query client)
  - `index.tsx` is the entry point
```
