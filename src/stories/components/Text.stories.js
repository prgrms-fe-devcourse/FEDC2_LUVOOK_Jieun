import Text from '@components/base/Text'

export default {
  title: 'Component/Text',
  component: Text,
  argTypes: {
    size: { control: 'number' },
    strong: { control: 'boolean' },
    color: { control: 'color' },
    block: { control: 'boolean' },
    paragraph: { control: 'boolean' },
  },
}

export const Default = (args) => {
  return <Text {...args}>Text</Text>
}

export const Size = (args) => {
  return (
    <>
      <Text {...args} block>
        이건 기본 사이즈에요 (16px)
      </Text>
      <Text {...args} block size="large">
        Large (20px)
      </Text>
      <Text {...args} block size="normal">
        Normal (16px)
      </Text>
      <Text {...args} paragraph size="small">
        Small (12px)
      </Text>
      <Text {...args} size={28} color="tomato">
        이 글자는 28px 이고 색깔은 토마토색!
      </Text>
    </>
  )
}
