import { baseInstance, authInstance } from '../utils/instance'

const getPostListInChannel = async (channelId, params) => {
  try {
    const { data } = await baseInstance.get(`/posts/channel/${channelId}`, { params })
    return data
  } catch (error) {
    console.error(error)
  }
}

const getPostListInUser = async (userId, params) => {
  try {
    await baseInstance.get(`/posts/author/${userId}`, { params })
  } catch (error) {
    console.error(error)
  }
}

const createPost = async (post) => {
  try {
    await authInstance.post(`/posts/create`, post)
  } catch (error) {
    console.error(error)
  }
}

const readPost = async (postId) => {
  try {
    await baseInstance.get(`/posts/${postId}`)
  } catch (error) {
    console.error(error)
  }
}

const updatePost = async (post) => {
  try {
    await authInstance.put(`/posts/update`, post)
  } catch (error) {
    console.error(error)
  }
}

const deletePost = async (postId) => {
  try {
    const { data } = await authInstance.delete(`/posts/delete`, {
      data: {
        id: postId,
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

const createLikeInPost = async (postId) => {
  try {
    await authInstance.post(`/likes/create`, postId)
  } catch (error) {
    console.error(error)
  }
}

const deleteLikeInPost = async (postId) => {
  try {
    await authInstance.delete(`/likes/delete`, postId)
  } catch (error) {
    console.error(error)
  }
}

const createCommentInPost = async (commentInfo) => {
  try {
    const { data } = await authInstance.post(`/comments/create`, commentInfo)
    return data
  } catch (error) {
    console.error(error)
  }
}

const deleteCommentInPost = async (commentId) => {
  try {
    const { data } = await authInstance.delete(`/comments/delete`, {
      data: {
        id: commentId,
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export {
  getPostListInChannel,
  getPostListInUser,
  createPost,
  readPost,
  updatePost,
  deletePost,
  createLikeInPost,
  deleteLikeInPost,
  createCommentInPost,
  deleteCommentInPost,
}
