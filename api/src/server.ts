import appFramework from './app.js'
import type {SERVER} from "./types.js";

async function serve() {
    // Trigger the application framework to load
    const app = await appFramework() as SERVER

    // Start the server
    return await app.listen({
        port: app.config.HTTP_PORT,
        host: app.config.HTTP_HOST
    }).then(() => {
        app.log.info(`Server listening on ${app.config.HTTP_HOST}:${app.config.HTTP_PORT}`)
    }).catch(error => {
        app.log.error(error)
        process.exit(1)
    })
}

serve().catch(error => console.error(error))
