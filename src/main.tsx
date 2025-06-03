import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import AuthProvider from "./auth/straive-auth.tsx";
import { Provider } from "react-redux";
import { store } from "./redux-store/store.tsx";
import { QueryProvider } from "./context/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
