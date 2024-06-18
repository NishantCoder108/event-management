import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";

console.log = () => {};
console.warn = () => {};
console.error = () => {};
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
        <ToastContainer />
    </React.StrictMode>
);
