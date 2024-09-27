/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { AuthProvider } from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import NoteDetail from "../components/NoteDetail";
import { addNewNote, noteLoader, notesLoader } from "../utils/noteUtil.js";
import { folderUtil } from "../utils/folderUtil.js";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet/>
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <Login/>,
        path: "/login",
      },
      {
        element: <ProtectedRoute/>,
        children: [
          {
            element: <Home/>,
            loader: folderUtil,
            path: "/",
            children: [
              {
                element: <NoteList/>,
                path: "folders/:folderId",
                loader: notesLoader, // method to fetch: GET
                action: addNewNote, // use for method PUT/POST
                children: [
                  {
                    element: <NoteDetail/>,
                    path: "note/:noteId",
                    loader: noteLoader,
                  }
                ]
              }
            ],
          },
        ],
      },
    ],
  },
]);
