import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import express from 'express'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import Resolvers from './gql/resolvers'
import TypeDefs from './gql/typedefs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware';
import Permissions from './gql/middleware'

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())


async function run() {

    const prisma = new PrismaClient()


    const schemaWithMiddleware = applyMiddleware(makeExecutableSchema({
        resolvers: Resolvers,
        typeDefs: TypeDefs
    }), Permissions);

    const server = new ApolloServer({
        context: ({ req, res }) => {
            return { prisma, req, res }
        },
        schema: schemaWithMiddleware,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        debug: false
    })

    await server.start()
    server.applyMiddleware({ app })

    app.get('/', (req, res) => {
        res.send("app running...")
    })
    app.listen(2727, () => console.log('running on 2727')).addListener('close', async () => {
        await prisma.$disconnect()
    })
}
run()
