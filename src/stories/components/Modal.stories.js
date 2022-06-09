import { useState } from 'react'
import Modal from '../../components/base/Modal'

export default {
  title: 'Component/Modal',
  component: Modal,
}

export const Default = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <h1>모달이 쨘!</h1>
      </Modal>
      <h1>여기는 메인 화면이에요</h1>
      <button onClick={() => setShowModal(true)}>모달을 띄우는 버튼</button>
    </div>
  )
}

export const NotActiveWrapper = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Modal visible={showModal} onClose={() => setShowModal(false)} activeWrapper={false}>
        <h1>이 모달은 바깥을 눌러도 닫히지 않아요</h1>
      </Modal>
      <h1>여기는 메인 화면이에요</h1>
      <button onClick={() => setShowModal(true)}>모달을 띄우는 버튼</button>
    </div>
  )
}
