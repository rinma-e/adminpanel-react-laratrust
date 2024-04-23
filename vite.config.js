import { defineConfig, loadEnv } from "vite";
import { compression } from "vite-plugin-compression2";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs";

const env = loadEnv("all", process.cwd());

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
        compression({
            algorithm: "brotliCompress",
            exclude: [/\.(br)$/, /\.(gz)$/],
            // deleteOriginalAssets: true,
        }),
    ],
    server: {
        host: true,
        port: env.VITE_ASSET_PORT,
        strictPort: true,
        hmr: {
            host: env.VITE_ASSET_HOST,
            port: env.VITE_ASSET_PORT,
        },
        https: {
            key: fs.readFileSync(env.VITE_PRIVKEY_PATH, "utf8"),
            cert: fs.readFileSync(env.VITE_CERT_PATH, "utf8"),
        },
        cors: true,
    },
});
