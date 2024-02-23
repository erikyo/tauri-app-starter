import fastifyPlugin from 'fastify-plugin'
import Session from 'supertokens-node/recipe/session/index.js'

async function routes (server, options) {
    server.get('/', () => {
        return 'hello world '
    })

    server.get('/authorized/', async (request, reply) => {
        const session = await Session.getSession(request, reply)
        return session ? { message: 'authorized' } : { message: 'unauthorized' }
    })
}

export default fastifyPlugin(routes)
