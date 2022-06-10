import Divider from '@components/base/Divider'

export default {
  title: 'Component/Divder',
  component: Divider,
}

export const Horizontal = () => {
  return (
    <>
      <span>위</span>
      <Divider type="horizontal" />
      <span>아래</span>
    </>
  )
}

export const Vertical = () => {
  return (
    <>
      <span>왼쪽</span>
      <Divider type="vertical" />
      <span>오른쪽</span>
    </>
  )
}
