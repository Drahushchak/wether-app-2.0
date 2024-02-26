import React from "react";
import ReactDOM from "react-dom/client";
import App, { appLoader } from "./App.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.ts";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Login from "@/pages/Login";
import Home from "@/pages/Home/index.tsx";
import Register from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} loader={appLoader}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
