import { useState } from 'react'
import styled from '@emotion/styled'
import { Popover, Modal, Icon } from '@components'

const NotificationElement = styled.div`
  position: absolute;
  margin-left: 10px;
  top: 5px;
  right: 0;
  width: 210px;
  height: auto;
  background-color: #743737;
  color: white;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  > button {
    margin: 7px;
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
`

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [notificationPop, setNotificationPop] = useState(false)
  const [showPost, setShowPost] = useState(false)
  return (
    <div>
      <Icon name={'bell'} size={40} id="notification" onClick={() => setNotificationPop(true)} />
      <Popover
        show={notificationPop}
        targetId="notification"
        onClose={() => setNotificationPop(false)}
      >
        <NotificationElement>
          <Modal visible={showPost} onClose={() => setShowPost(false)}>
            <h1>Post</h1>
          </Modal>
          {notifications.map((comments) => (
            <button onClick={() => setShowPost(true)} key={comments._id}>
              {comments.comments}
            </button>
          ))}
        </NotificationElement>
      </Popover>
    </div>
  )
}

export default Notification
