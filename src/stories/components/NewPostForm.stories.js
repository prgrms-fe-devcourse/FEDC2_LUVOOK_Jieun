import { Modal, NewPostForm } from '@components'

export default {
  title: 'Component/NewPostForm',
  component: NewPostForm,
}

export const Default = (args) => {
  return (
    <div>
      <Modal visible={true} onClose={() => null}>
        <NewPostForm post={undefined} />
      </Modal>
      <h1>여기는 메인 화면이에요</h1>
    </div>
  )
}
