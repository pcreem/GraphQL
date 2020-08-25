function info(parent, args, context, info) {
  const Posts = context.prisma.post.findMany({
    where: {
      authorId: parseInt(args.authorId)
    }
  })

  return Posts
}


module.exports = {
  info
}