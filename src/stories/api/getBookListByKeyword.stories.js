import { useCallback, useState } from 'react'
import { getBookListByKeyword } from '../../utils/api/getBookListByKeyword'

export default {
  title: 'API/getBooks',
}

export const Default = () => {
  const [state, setState] = useState([])

  const handleGetBookList = useCallback(async (keyword) => {
    const books = await getBookListByKeyword(keyword)
    setState([...books.documents])
  }, [])

  return (
    <div>
      <button onClick={() => handleGetBookList('함께')}>'함께'라는 단어를 입력했을 때</button>
      <ul>
        {state?.map((book, index) => (
          <li key={index}>
            <h3>{book.title}</h3>
            <img src={book.thumbnail} width={100} alt="썸네일" />
          </li>
        ))}
      </ul>
    </div>
  )
}
