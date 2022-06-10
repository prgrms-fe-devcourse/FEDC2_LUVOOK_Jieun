import Button from '../../components/base/Button'

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    buttonStyle: { control: 'string' },
  },
}

export const Default = (args) => {
  return <Button {...args}>버튼 default</Button>
}

export const CustomButtons = () => {
  const buttonStyle = {
    width: '250px',
    height: '65px',
    'font-size': '24px',
    'border-radius': '10px',
    border: 'none',
    'background-color': 'hotpink',
    color: 'white',
  }

  return <Button style={buttonStyle}>버튼 커스텀 스타일</Button>
}
export const ClickEvent = () => {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('버튼이 클릭되었습니다.')
  }

  return (
    <>
      <Button onClick={handleClick}>클릭 이벤트</Button>
    </>
  )
}
