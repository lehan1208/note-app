import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import "./firebass/config";

import { Container } from "@mui/material"

createRoot(document.getElementById("root")).render(
  <Container maxWidth="lg" sx={{textAlign: "center", marginTop: "50px"}}>
    <RouterProvider router={router}/>
  </Container>
);
