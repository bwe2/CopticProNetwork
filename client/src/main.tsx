import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Ensure dark mode is applied globally
document.documentElement.classList.add('dark');
document.body.style.background = 'linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 100%)';
document.body.style.color = '#f5f5f5';
document.body.style.minHeight = '100vh';

createRoot(document.getElementById("root")!).render(<App />);
