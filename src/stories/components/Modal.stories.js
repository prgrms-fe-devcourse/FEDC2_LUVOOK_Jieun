import { useState } from 'react'
import Modal from '../../components/base/Modal'

export default {
  title: 'Component/Modal',
  component: Modal,
}

const SampleComponent = ({ onClose }) => {
  return (
    <div>
      <h1>모달이 쨘!</h1>
      <button onClick={onClose}>X</button>
    </div>
  )
}

export const Default = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <SampleComponent onClose={() => setVisible(false)} />
      </Modal>
      <h1>여기는 메인 화면이에요</h1>
      <button onClick={() => setVisible(true)}>모달을 띄우는 버튼</button>
    </div>
  )
}
