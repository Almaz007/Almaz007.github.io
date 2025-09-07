import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { AppRouter } from "./providers";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </StrictMode>
);
