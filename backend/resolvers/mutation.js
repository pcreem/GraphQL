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
      id: parseInt(args.postId),
    },
    data: {
      title: args.title,
      content: args.content,
    },
  })
  return updatedPost
}

function upsertPost(parent, args, context, info) {
  const upsertPost = context.prisma.post.upsert({
    where: {
      id: parseInt(args.postId)
    },
    update: {
      title: args.title,
      content: args.content,
    },
    create: {
      title: args.title,
      content: args.content,
      author: {
        connect: { id: parseInt(args.authorId) },
      },
    },
  })

  return upsertPost
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
  upsertPost,
  deletePost
}