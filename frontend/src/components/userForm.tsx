import { gql, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"
import { GET_USER } from "../App"
import { client } from "../lib/apollo"

const CREATE_USER = gql`
    mutation($name: String!){
        createUser(name: $name){
            id
            name
        }
    }
`

export function UserForm () {
    const [name, setName] = useState('')
    const [createUser, {data, loading, error}] = useMutation(CREATE_USER)

    async function handleCreate (event: FormEvent) {
        event.preventDefault()

        if (!name) {
            return
        }

        await createUser({
            variables: {
                name: name
            },
            update: (cache, { data: { createUser } }) => {
                const { users } = client.readQuery({ query: GET_USER })
                
                cache.writeQuery({
                    query: GET_USER,
                    data: {
                        users: [
                            ...users,
                            createUser
                        ]
                    }
                })
            }})
            
    }
    
    return (
        <form onSubmit={handleCreate}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}