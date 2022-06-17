const getCleanUserInfo = ({ role, email, fullName, notifications, likes, posts, createdAt }) => {
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
