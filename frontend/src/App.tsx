import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import './App.css'
import { UserForm } from './components/userForm'

type User = {
  id: string
  name: string
}

export const GET_USER = gql`
  query {
    users{
      id
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{users: User[]}>(GET_USER)
  
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <ul>
      {data?.users.map(user => <li key={user.id}>{ user.name}</li>)}
      </ul>
      <UserForm />
    </div>
  )
}

export default App
