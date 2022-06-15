import { SignUp } from '@components'

export default {
  title: 'Test/SignUp',
  component: SignUp,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
}

export const Default = (args) => {
  return <SignUp {...args} />
}
