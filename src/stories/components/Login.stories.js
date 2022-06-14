import { Login } from '@components'

export default {
  title: 'Test/Login',
  component: Login,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
}

export const Default = (args) => {
  return <Login {...args} />
}
