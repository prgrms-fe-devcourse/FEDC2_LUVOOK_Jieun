export const parseListTitle = (postList) => {
  return postList.map((post) => {
    return {
      ...post,
      title: JSON.parse(post.title),
    }
  })
}
