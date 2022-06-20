import { Input } from '@components'

export default {
  title: 'Component/Input',
  component: Input,
  argTypes: {
    label: {
      defaultValue: '',
      control: 'text',
    },
    placeholder: {
      defaultValue: '',
      control: 'text',
    },
    onChange: { action: 'typing' },
    block: {
      defaultValue: false,
      control: 'boolean',
    },
    invalid: {
      defaultValue: false,
      control: 'boolean',
    },
    required: {
      defaultValue: false,
      control: 'boolean',
    },
    disabled: {
      defaultValue: false,
      control: 'boolean',
    },
    readonly: {
      defaultValue: false,
      control: 'boolean',
    },
  },
}

export const Default = (args) => <Input {...args} />
