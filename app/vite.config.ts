import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')

    return {

        plugins: [react()],
        // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
        //
        // 1. prevent vite from obscuring rust errors
        clearScreen: false,
        // 2. tauri expects a fixed port, fail if that port is not available
        server: {
            port: 3000,
            host: true,
            strictPort: true,
            watch: {
                usePolling: true,
                include: ["src/**/*.ts", "src/**/*.tsx"],
                // 3. tell vite to ignore watching `src-tauri`
                ignored: ["**/src-tauri/**"],
            },
        },
        // 3. to make use of `TAURI_DEBUG` and other env variables
        // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
        envPrefix: ["APP_", "API_", "NODE_", "TAURI_"],

        // vite config
        define: {
            VITE_: JSON.stringify(env.APP_ENV)
        }
    }
});
