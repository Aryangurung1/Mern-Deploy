import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
import App from "./App.jsx";
import "./index.css";
import AuthContext from "./context/authContext.jsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthContext>
      <App />
    </AuthContext>
  </QueryClientProvider>
);
