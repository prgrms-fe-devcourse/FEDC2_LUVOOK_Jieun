const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@contexts': path.resolve(__dirname, '../src/contexts'),
      '@pages': path.resolve(__dirname, '../src/pages'),
    }
    return config
  },
}
