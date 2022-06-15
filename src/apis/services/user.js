const getCleanUserInfo = (rawUserInfo) => {
  const { role, email, fullName, notifications, likes, posts, createdAt } = rawUserInfo.user
  return {
    quote: role,
    email,
    fullName,
    notifications,
    likes,
    posts,
    createdAt,
  }
}

export { getCleanUserInfo }
