import { useState, useEffect } from 'react'
import { Avatar, Icon } from '@components'
import styled from '@emotion/styled'
import { useUserContext } from '@contexts/UserContext'
import { useFormik } from 'formik'
import uuid from 'react-uuid'

const UserPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 89%;
  height: 314px;
  max-width: 1280px;
  margin-top: 40px;
`
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  width: 22%;
  .user-name {
    margin-bottom: 70px;
  }
`

const ProfileEdit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  width: 22%;
  > input {
    width: 50%;
    height: 3vh;
    margin-bottom: 70px;
    font-size: 24px;
    background-color: #f3f3f3;
    text-align: center;
    border: solid 1px gray;
    border-radius: 7px;
  }
`

const UserContent = styled.div`
  display: flex;
  width: 60%;
  height: 156px;
  background-color: #ffeadb;
  font-size: 24px;
  margin-top: 10px;
  padding: 20px 20px 0 20px;
  color: #637373;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;

  > textarea {
    width: 100%;
    height: 17vh;
    background-color: transparent;
    border: none;
    text-align: left;
    vertical-align: top;
    white-space: normal;
    font-size: 24px;
  }
  > textarea:focus {
    outline: none;
  }
`

const EditButton = styled.div`
  display: flex;
  position: relative;
  left: 450px;
  bottom: 120px;
`

const UserEditButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #a5a3af;
  cursor: pointer;
`

const PasswordEditButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #a5a3af;
  cursor: pointer;
`

const UserEditForm = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { onUpdateUserInfo, currentUserState } = useUserContext()

  const clickedToggle = () => {
    setIsEdit((isEdit) => !isEdit)
  }

  const { fullName, quote } = JSON.parse(currentUserState.currentUser.fullName)

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      fullName: '',
    },
    onSubmit: async ({ fullName, quote }) => {
      const userInfo = {
        fullName: JSON.stringify({ fullName, quote }),
        username: uuid(),
      }
      try {
        await onUpdateUserInfo(userInfo)
      } catch (e) {
        alert('변경을 실패했습니다.')
      }
    },
  })

  useEffect(() => {}, [currentUserState])

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <UserPageContainer>
        {isEdit ? (
          <UserInfoContainer>
            <ProfileEdit>
              <Avatar src={'https://picsum.photos/200'} size={196} />
              <input
                type="text"
                name="fullName"
                defaultValue={values.fullName}
                onChange={handleChange}
                maxLength="12"
              />
            </ProfileEdit>
            <UserContent>
              <textarea
                type="textarea"
                name="quote"
                value={values.quote}
                onChange={handleChange}
                autoFocus
                maxLength="300"
              />
            </UserContent>
          </UserInfoContainer>
        ) : (
          <UserInfoContainer>
            <Profile>
              <Avatar src={'https://picsum.photos/200'} size={196} />
              <p className="user-name">{fullName}</p>
            </Profile>
            <UserContent>{quote}</UserContent>
          </UserInfoContainer>
        )}
        <EditButton>
          <PasswordEditButton>
            <Icon name={'feather'} size={20} />
            비밀번호 변경
          </PasswordEditButton>
          <UserEditButton onClick={clickedToggle} onChange={handleChange} onSubmit={handleSubmit}>
            {!isEdit ? (
              <Icon name={'tool'} size={20} rotate={'270'} />
            ) : (
              <Icon name={'save'} size={20} />
            )}
            {!isEdit ? '회원 정보 수정' : '변경사항 저장'}
          </UserEditButton>
        </EditButton>
      </UserPageContainer>
    </form>
  )
}

export default UserEditForm
