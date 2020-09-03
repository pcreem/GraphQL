const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { GraphQLServer } = require('graphql-yoga')
const session = require("express-session");
require('dotenv').config()
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const resolvers = {
  Query,
  Mutation,
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.express.use(
  session({
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

server.start(() => console.log(`Server is running on http://localhost:4000`))