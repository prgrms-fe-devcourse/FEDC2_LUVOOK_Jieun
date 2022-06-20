import { Select } from '@components'

export default {
  title: 'Component/Select',
  component: Select,
  argTypes: {
    label: {
      defaultValue: '카테고리',
      control: 'text',
    },
    placeholder: {
      defaultValue: '원하시는 장르를 선택해주세요.',
      control: 'text',
    },
    block: {
      defaultValue: false,
      control: 'boolean',
    },
    invalid: {
      defaultValue: false,
      control: 'boolean',
    },
    disabled: {
      defaultValue: false,
      control: 'boolean',
    },
    required: {
      defaultValue: false,
      control: 'boolean',
    },
  },
}

export const Default = (args) => (
  <Select
    data={[
      { label: '소설', value: 'value' },
      { label: '에세이', value: 'value' },
      { label: '공포', value: 'value' },
      { label: '기술', value: 'value' },
    ]}
    {...args}
  />
)
