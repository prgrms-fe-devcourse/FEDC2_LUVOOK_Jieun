import Image from '../../components/Image'

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    block: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    src: {
      name: 'src',
      type: { name: 'string', required: true },
      defaultValue: 'https://source.unsplash.com/random',
      control: { type: 'text' },
    },
    placeholder: {
      type: { name: 'string' },
      control: { type: 'text' },
    },
    threshold: {
      type: { name: 'number' },
      defaultValue: 0.5,
      control: { type: 'number' },
    },
    width: {
      name: 'width',
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    height: {
      name: 'height',
      defaultValue: 200,
      control: { type: 'range', min: 200, max: 600 },
    },
    alt: {
      name: 'alt',
      control: 'string',
    },
    mode: {
      defaultValue: 'cover',
      options: ['cover', 'fill', 'contain'],
      control: { type: 'inline-radio' },
    },
  },
}

export const Default = (args) => {
  return <Image {...args} />
}

export const Lazy = (args) => {
  return (
    <div>
      <h1>Lazy Loding 예시</h1>
      <h2>이미지 크기를 키우면 확인이 쉽습니다</h2>

      {Array.from(new Array(20), (_, k) => k).map((i) => (
        <Image {...args} lazy block src={`${args.src}?${i}`} key={i} />
      ))}
    </div>
  )
}
