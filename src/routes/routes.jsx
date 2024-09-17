import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Home from "../pages/home/Home";
// import About from "../pages/About/About";
import { lazy, Suspense } from "react";
import Layout from "../pages/Auth/Layout/Layout";
import {
  AuthProtectedRoute,
  UserProtectedRoute,
} from "../components/ProtectedRoute/ProtectedRoute";
// const Layout = lazy(() => import("../pages/Auth/Layout/Layout"));
const Signup = lazy(() => import("../pages/Auth/Signup/Signup"));
const Signin = lazy(() => import("../pages/Auth/Signin/Signin"));
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/About/About"));
//spliting code
//lazy loading
//supense
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>it's is invalid route</h1>,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <UserProtectedRoute>
            <Suspense fallback={<h1>loading... </h1>}>
              <About />
            </Suspense>
          </UserProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthProtectedRoute>
        <Layout />
      </AuthProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routes;
