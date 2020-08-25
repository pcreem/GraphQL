function info(parent, args, context, info) {
  const Posts = context.prisma.post.findMany({
    where: {
      authorId: parseInt(args.author)
    }
  })

  return Posts
}


module.exports = {
  info
}