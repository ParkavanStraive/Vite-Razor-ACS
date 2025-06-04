import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,

    // errorElement: <ErrorPage />, // Crucial for error handling
    children: [
      {
        path: "/acs_razor",
        element: <App />,
      },
      {
        path: "*",
        element: <Navigate to="/acs_razor" replace />,
      },
    ],
  },
]);
