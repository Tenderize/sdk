import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig(({ mode }) => {
  mode;
  return {
    plugins: [react(), dts({ include: ["lib", "src"] }), libInjectCss()],
    build: {
      target: 'es2020',
      copyPublicDir: false,
      lib: {
        fileName: "main",
        entry: resolve(__dirname, "lib/main.ts"),
        formats: ["es"],
      },
      rollupOptions: {
        external: ["react", "react/jsx-runtime"],
        // input: Object.fromEntries(
        //   glob.sync('lib/**/*.{ts,tsx,css}').map(file => [
        //     // The name of the entry point
        //     // lib/nested/foo.ts becomes nested/foo
        //     relative(
        //       'lib',
        //       file.slice(0, file.length - extname(file).length)
        //     ),
        //     // The absolute path to the entry file
        //     // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
        //     fileURLToPath(new URL(file, import.meta.url))
        //   ])
        // ),
        // output: {
        //   chunkFileNames: 'chunks/[name].[hash].js',
        //   assetFileNames: 'assets/[name][extname]',
        //   entryFileNames: '[name].js',
        // }
      },
    },
    resolve: {
      alias: {
        "@lib": resolve(__dirname, "./lib"),
      },
    },
  };
});

// https://vitejs.dev/config/
// export default defineConfig({
//   define: { "process.env": process.env },
//   plugins: [react(), dts({ include: ["lib"] }), libInjectCss()],
//   build: {
//     copyPublicDir: false,
//     lib: {
//       fileName: "main",
//       entry: resolve(__dirname, "lib/main.ts"),
//       formats: ["es"],
//     },
//     rollupOptions: {
//       external: ["react", "react/jsx-runtime"],
//       // input: Object.fromEntries(
//       //   glob.sync('lib/**/*.{ts,tsx,css}').map(file => [
//       //     // The name of the entry point
//       //     // lib/nested/foo.ts becomes nested/foo
//       //     relative(
//       //       'lib',
//       //       file.slice(0, file.length - extname(file).length)
//       //     ),
//       //     // The absolute path to the entry file
//       //     // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
//       //     fileURLToPath(new URL(file, import.meta.url))
//       //   ])
//       // ),
//       // output: {
//       //   chunkFileNames: 'chunks/[name].[hash].js',
//       //   assetFileNames: 'assets/[name][extname]',
//       //   entryFileNames: '[name].js',
//       // }
//     },
//   },
//   resolve: {
//     alias: {
//       "@lib": resolve(__dirname, "./lib"),
//     },
//   },
// });
