import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen, {
  loader as loginLoader,
} from "./components/auth/Login.screen";
import BookDashboard, { loader } from "./components/books/BookDashboard.screen";
import Wishlist from "./components/books/Wishlist.screen";
import NewBook from "./components/books/NewBook.screen";
import Archive from "./components/books/Archive.screen";
import SignupScreen from "./components/auth/Signup.screen";
import BookDetails from "./components/books/BookDetails.screen";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BookDashboard />,
    children: [
      {
        index: true,
        element: <Wishlist />,
      },
      {
        path: "add-book",
        element: <NewBook />,
      },
      {
        path: "archive",
        element: <Archive />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      }
    ],
    loader,
  },
  {
    path: "/login",
    element: <LoginScreen />,
    loader: loginLoader,
  },
  {
    path: "/signup",
    element: <SignupScreen />,
    loader: loginLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
