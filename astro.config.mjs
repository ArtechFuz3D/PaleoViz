import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://paleontology-audio-visualiser.artechfuz3d.app/",
  // root: "./src",
  integrations: [tailwind(), icon(), react(), svelte()],
  sets: {
    carbon: '@iconify-json/carbon',
    gameIcons: '@iconify-json/game-icons'
  },
  build: {
    target: 'esnext', // Ensure esnext for modern JavaScript
  },

});
