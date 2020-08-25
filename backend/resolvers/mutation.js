function createPost(parent, args, context, info) {
  const newPost = context.prisma.post.create({
    data: {
      title: args.title,
      content: args.content,
      authorId: {
        connect: { id: parseInt(args.authorId) },
      },
    },
  })
  return newPost
}

function updatePost(parent, args, context, info) {
  const updatedPost = context.prisma.post.update({
    where: { id: parseInt(args.postId) },
    data: {
      title: args.title,
      content: args.content,
    },
  })
  return updatedPost
}

function deletePost(parent, args, context, info) {
  const deletePost = context.prisma.post.delete({
    where: { id: parseInt(args.postId) },
  })

  return deletePost
}


module.exports = {
  createPost,
  updatePost,
  deletePost
}