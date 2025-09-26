import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import PageNOTFound from "./components/404.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement:<PageNOTFound />,
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store ={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
