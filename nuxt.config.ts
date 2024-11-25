import { createServer } from "http";
import websocketServer from "./server/websocket.cjs";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Qontak Technical Assesment",
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        // { src: "https://awesome-lib.js" },
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        // { rel: "stylesheet", href: "https://awesome-lib.css" },
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>
        // { children: ":root { color: red }", type: "text/css" },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
    },
    // baseURL: "/your-site-route",
    pageTransition: { name: "fade", mode: "out-in" },
  },
  experimental: {
    componentIslands: false, //for global components
  },

  components: [
    { path: "~/components", extensions: ["vue"] },
    { path: "~/components/pages", extensions: ["vue"] },
    { path: "~/components/ui", extensions: ["vue"] },
  ],
  css: ["@/styles/scss/main.scss", "@mdi/font/css/materialdesignicons.min.css"],

  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  plugins: ["@/plugins/vuetify.client.ts", "@/plugins/v-toast.client.ts"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/scss/_variables.scss" as *;',
        },
      },
    },
  },
  imports: {
    dirs: [
      "data",
      // Scan top-level modules composables
      "composables",
      // ... or scan modules nested one level deep with a specific name and file extension
      "composables/*/index.{ts,js,mjs,mts}",
      // ... or scan all modules within given directory
      "composables/**",
    ],
  },
  pinia: {
    storesDirs: [
      //Pinia storage
      "data",
    ],
  },
  piniaPluginPersistedstate: {
    key: "qontak_%id_persisted",
  },
  runtimeConfig: {
    server: {},
    public: {
      socketUrl: process.env.SOCKET_URL || "http://localhost:3001",
    },
  },
  hooks: {
    listen: (nuxtServer) => {
      const httpServer = createServer(nuxtServer);
      websocketServer(httpServer);
      httpServer.listen(3001, () => {
        console.log("Server running on http://localhost:3001");
      });
    },
  },
});
