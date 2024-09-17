import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import GlobalProvider from "./store/GlobalPrvider/GlobalProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalProvider>
    <RouterProvider router={routes} />;
  </GlobalProvider>
);

/*
Hooks => [useState, useEffct, useContext]
Vertual Dom => 
optmize app => inhanace peorformance

*/
