import { createBrowserRouter } from "react-router";   // ← Fixed import
import { RouterProvider } from "react-router";       // ← Fixed import

import MainLayout from '../Layout/MainLayout';
import Homepage from '../pages/homepage/Homepage';
import Books from '../books/Books';
import ErrorPage from "../pages/errorpage/errorpage";
import BookDetails from "../pages/BookDetails/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/bookDetails/:bookId",     // ← Fixed: changed :id to :bookId
        element: <BookDetails />          // ← Use 'element' (not Component)
      },
    ]
  }
]);