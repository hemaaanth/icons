import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "dialkit/styles.css";
import "../src/generated/styles.css";
import "./builder.css";
import BuilderApp from "./BuilderApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BuilderApp />
  </StrictMode>,
);
