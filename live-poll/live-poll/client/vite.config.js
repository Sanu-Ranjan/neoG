import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // In dev, the page is on :5173 but the server is on :3000.
    // This forwards ws://localhost:5173/ws to ws://localhost:3000/ws
    proxy: { "/ws": { target: "ws://localhost:3000", ws: true } },
  },
});
