import { Navbar } from '@components'
import { useState } from 'react'

export default {
  title: 'Component/Navbar',
  component: Navbar,
  argTypes: {},
}

const CATEGORY = [
  { id: 0, name: 'all' },
  { id: 1, name: '소설' },
  { id: 2, name: '시' },
]

export const Default = (args) => {
  const [selectedItem, setSelectedItem] = useState(null)

  const getClickedItem = (item) => {
    console.log('clicked', item)
    setSelectedItem(item)
  }

  console.log(Object.values(CATEGORY))
  return (
    <>
      <Navbar items={Object.values(CATEGORY)} handleClick={getClickedItem} {...args} />
      {selectedItem ? (
        <div>{selectedItem.name}이(가) 선택되었습니다.</div>
      ) : (
        <div>카테고리를 클릭해보세요</div>
      )}
    </>
  )
}
