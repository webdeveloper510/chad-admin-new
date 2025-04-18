import React, { useState } from 'react'
import '../../scss/userlist.css' // Ensure this file has the CSS from previous steps

const UserList = () => {
  const [users, setUsers] = useState([
    { email: 'user1@example.com', active: true },
    { email: 'user2@example.com', active: false },
    { email: 'user3@example.com', active: true },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  const addUser = () => {
    if (!newEmail.trim()) {
      alert('Please enter an email.')
      return
    }

    const exists = users.some((user) => user.email === newEmail.trim())
    if (exists) {
      alert('User already exists!')
      return
    }

    setUsers([...users, { email: newEmail.trim(), active: true }])
    setNewEmail('')
    setShowModal(false)
  }

  const toggleStatus = (index) => {
    const updated = [...users]
    updated[index].active = !updated[index].active
    setUsers(updated)
  }

  return (
    <div className="container container-lg px-4">
      <div className="add_web max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-md">
        <h2>User Management</h2>

        <table className="country-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.email}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={user.active}
                      onChange={() => toggleStatus(idx)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button className="btn add-user" onClick={() => setShowModal(true)}>
          ➕ Add User
        </button>
      </div>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span>Add User</span>
              <span className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </span>
            </div>
            <input
              type="email"
              placeholder="Enter user email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn" onClick={addUser}>
                Add
              </button>
              <button className="btn cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserList
