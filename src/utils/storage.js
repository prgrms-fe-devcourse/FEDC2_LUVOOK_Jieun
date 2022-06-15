const storage = window.localStorage

const getItem = (key, defaultValue) => {
  try {
    const parsedValue = JSON.parse(storage.getItem(key))
    return parsedValue
  } catch (e) {
    storage.removeItem(key)
    return defaultValue
  }
}

const setItem = (key, item) => {
  storage.setItem(key, JSON.stringify(item))
}

const removeItem = (key) => {
  storage.removeItem(key)
}

export { getItem, setItem, removeItem }
