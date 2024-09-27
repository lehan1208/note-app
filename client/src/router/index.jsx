/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { AuthProvider } from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import NoteDetail from "../components/NoteDetail";
import { noteLoader, notesLoader } from "../utils/noteUtil.js";
import { folderUtil } from "../utils/folderUtil.js";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet/>
    </AuthProvider>
  );
};

const BASE_URL = "http://localhost:4000/graphql";
const optionsRequest = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
}

const fetchAction = (url = BASE_URL, options = optionsRequest) => {
  return fetch(url, options).then((res) => res.json());
}

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
            loader: async () => {
              return await folderUtil(fetchAction, optionsRequest, BASE_URL)
            },
            path: "/",
            children: [
              {
                element: <NoteList/>,
                path: "folders/:folderId",
                loader: async ({params: {folderId}}) => {
                  return await notesLoader(folderId)
                },
                children: [
                  {
                    element: <NoteDetail/>,
                    path: "note/:noteId",
                    loader: async({params: {noteId}}) => {
                      return await noteLoader(noteId)
                    },
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
