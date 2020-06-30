import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import UserList from './UserList'
import UserView from './UserView'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <Switch>
      <Route path="/users/:id">
        <UserView user={matchedUser} />
      </Route>
      <Route path="/users">
        <UserList users={users} />
      </Route>
    </Switch>
  )
}

export default Users
