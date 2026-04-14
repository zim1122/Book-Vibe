import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from '../Layout/MainLayout';
import Homepage from '../pages/homepage/Homepage';
import Books from '../books/Books';
import ErrorPage from "../pages/errorpage/errorpage";

export const router = createBrowserRouter([
  {
   path:"/",
   element:<MainLayout></MainLayout>,
   children:[
    {
      index:true,
      element:<Homepage></Homepage>
    },
    {
      path:"/books",
      element: <Books></Books>
    }
   ],
   errorElement: <ErrorPage></ErrorPage>
  },
  
]);