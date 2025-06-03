import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/common/root-layout";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,

    // errorElement: <ErrorPage />, // Crucial for error handling
    children: [
      {
        path: "/",
        element: <App />,
      },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
      // {
      //   path: "*", // Catch-all for unmatched routes
      //   element: <ErrorPage />,
      // },
    ],
  },
]);
