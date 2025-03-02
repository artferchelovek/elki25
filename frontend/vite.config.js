import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifest = {
  theme_color: "#F6F5F3",
  background_color: "#F6F5F3",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  screenshots: [
    {
      src: "/screenshots/2.png",
      type: "image/png",
      sizes: "2880x1520",
      form_factor: "wide",
    },
    {
      src: "/screenshots/1.png",
      type: "image/png",
      sizes: "620x1332",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  dir: "auto",
  lang: "ru",
  name: "AID.events",
  short_name: "AID",
  start_url: "/",
  description: "AID.events - сервис, позволяющий организовывать мероприятия",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*{html,css,js,ico,png,svg}"],
      },
      manifest: manifest,
    }),
  ],
});
