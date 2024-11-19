import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AuthPage from "./Components/Auth/AuthPage.jsx";
import { getCurrentUser } from "./utils/auth.js";
import audioVerseStore from "./store/store.js";
import App from "./Components/App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: getCurrentUser,
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={audioVerseStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
