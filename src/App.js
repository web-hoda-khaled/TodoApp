import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Notes from "./components/Notes/Notes";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            {" "}
            <Notes />
          </ProtectedRoute>
        ),
      },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
