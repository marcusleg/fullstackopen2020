import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.username}</td>
              <td>{user.blogs && user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}

export default Users
