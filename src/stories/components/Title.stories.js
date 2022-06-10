import { Title } from '@components'

export default {
  title: 'Component/Title',
  component: Title,
  argTypes: {
    level: { control: { type: 'range', min: 1, max: 6 } },
    strong: { control: 'boolean' },
    color: { control: 'color' },
  },
}

export const Default = (args) => {
  return <Title {...args}>Title</Title>
}
