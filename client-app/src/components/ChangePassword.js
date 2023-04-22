import { Menu, Modal, Button, Input } from 'antd';
import 'antd/dist/antd.min.css';
import './ChangePassword.css';
import { useState, useEffect } from 'react';

function ChangePassword() {
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("id")
  const [isVisible, setIsVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [realPassword, setRealPassword] = useState('')
  const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")

  const showModal = () => {
    setIsVisible(true)
  }

  useEffect(() => {
    fetch(`https://rookiesgroup4.azurewebsites.net/getuser/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json.password);
        setRealPassword(json.password);
      })
  }, [userId, token]);

  const handleOk = () => {
    if (newPassword.length >= 8) {
      if (mediumRegex.test(newPassword)) {
        if (newPassword.indexOf(' ') < 0) {
          if (newPassword === newPassword2) {
            if (newPassword !== currentPassword) {
              if (currentPassword === realPassword) {
                fetch(`https://rookiesgroup4.azurewebsites.net/changepassword/${userId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    password: newPassword
                  })
                }).then(() => {
                  setIsVisible(false)
                }).then(() => {
                  Modal.success({
                    title: 'CHANGE SUCCESSFULLY',
                    content: 'Your password has been changed',
                    onOk() { window.location.reload() }
                  })
                })
              } else {
                Modal.error({
                  title: 'CHANGE FAILED',
                  content: 'Incorrect Current Password'
                })
              }
            } else {
              Modal.error({
                title: 'CHANGE FAILED',
                content: 'New Pass must different from old pass'
              })
            }
          } else {
            Modal.error({
              title: 'CHANGE FAILED',
              content: 'New Passwords are not the same'
            })
          }
        } else {
          Modal.error({
            title: 'CHANGE FAILED',
            content: 'Password cannot contain white space'
          })
        }
      } else {
        Modal.error({
          title: 'CHANGE FAILED',
          content: 'Wrong Format Password'
        })
      }
    } else {
      Modal.error({
        title: 'CHANGE FAILED',
        content: 'Password is at least 8 characters'
      })
    }
  };

  const handleCancel = () => {
    setIsVisible(false)
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value)
  }

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value)
  }

  const handleNewPassword2 = (e) => {
    setNewPassword2(e.target.value)
  }

  return (
    <>
      <Menu style={{ display: 'inline-block' }}>
        <Menu.Item key={0} onClick={showModal}>Change Password</Menu.Item>
      </Menu>
      <Modal
        visible={isVisible}
        title="CHANGE PASSWORD"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} disabled={
            (newPassword === '' || newPassword2 === '' || currentPassword === '') ? true : false}
            danger
          >
            Save
          </Button>
        ]}
      >
        <p>Enter current password</p>
        <Input.Password type="password" onChange={(e) => handleCurrentPassword(e)} />
        <p>Enter new password</p>
        <Input.Password type="password" onChange={(e) => handleNewPassword(e)} />
        <p>Enter new password again</p>
        <Input.Password type="password" onChange={(e) => handleNewPassword2(e)} />
      </Modal>
    </>
  )
}
export default ChangePassword;