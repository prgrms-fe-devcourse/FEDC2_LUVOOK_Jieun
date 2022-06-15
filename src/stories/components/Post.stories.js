import { Modal, Post } from '@components'

export default {
  title: 'Component/Post',
  component: Post,
}

export const Default = (args) => {
  return (
    <div>
      <Modal visible={true} onClose={() => null}>
        <Post post={undefined} />
      </Modal>
      <h1>여기는 메인 화면이에요</h1>
    </div>
  )
}
