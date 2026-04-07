import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from '../Layout/MainLayout';
import Homepage from '../pages/homepage/Homepage';
import Books from '../books/Books';

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
   ]
  },
  
]);