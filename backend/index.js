const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { GraphQLServer } = require('graphql-yoga')

// 1
const typeDefs = `
type Query {
  info: String!
}

type Mutation {
  post(author: ID!, title: String!, content: String): Post!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author:    User
  createdAt: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}
`

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          author: {
            connect: { id: parseInt(args.author) },
          },
        },
      })
      return newLink
    }
  },
}

// async function main() {
//   await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//       posts: {
//         create: { title: 'Hello World' },
//       }
//     },
//   })

//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   })
//   console.dir(allUsers, { depth: null })
// }

// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))