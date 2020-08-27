function createPost(parent, args, context, info) {
  const newPost = context.prisma.post.create({
    data: {
      title: args.title,
      content: args.content,
      author: {
        connect: { id: parseInt(args.authorId) },
      },
    },
  })
  return newPost
}

function updatePost(parent, args, context, info) {
  const updatedPost = context.prisma.post.update({
    where: {
      AND: [
        {
          id: parseInt(args.postId),
        },
        {
          authorId: parseInt(args.authorId),
        },
      ],

    },
    data: {
      title: args.title,
      content: args.content,
    },
  })
  return updatedPost
}

function deletePost(parent, args, context, info) {
  const deletePost = context.prisma.post.delete({

    where: {
      id: parseInt(args.postId),
    },
  })

  return deletePost
}


module.exports = {
  createPost,
  updatePost,
  deletePost
}