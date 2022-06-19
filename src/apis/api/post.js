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
    await authInstance.delete(`/posts/delete`, postId)
  } catch (error) {
    console.error(error)
  }
}

const createLikeInPost = async (postId) => {
  try {
    const { data } = await authInstance.post(`/likes/create`, postId)
    return data
  } catch (error) {
    console.error(error)
  }
}

const deleteLikeInPost = async (likeId) => {
  try {
    const { data } = await authInstance.delete(`/likes/delete`, {
      data: {
        id: likeId,
      },
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

const createCommentInPost = async (commentInfo) => {
  try {
    await authInstance.post(`/comments/create`, commentInfo)
  } catch (error) {
    console.error(error)
  }
}

const deleteCommentInPost = async (commentId) => {
  try {
    await authInstance.delete(`/comments/delete`, commentId)
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
