import { Popover } from '@components'
import styled from '@emotion/styled'
import { useState } from 'react'

export default {
  title: 'Component/Popover',
  component: Popover,
}

const SampleIcon = styled.button`
  margin-left: 100px;
  &::after {
    content: 'X';
  }
`

const SampleElement = styled.div`
  position: absolute;
  margin-left: 10px;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border: 1px solid;
  background-color: royalblue;
  color: white;
`

export const Default = (args) => {
  const [popover, setPopover] = useState(false)

  return (
    <>
      <SampleIcon id="bell" onClick={() => setPopover(true)} />
      <Popover show={popover} targetId="bell" onClose={() => setPopover(false)}>
        <SampleElement>popover!</SampleElement>
      </Popover>
    </>
  )
}
