import { useState } from "react"

const App = () => {
  const [users, setUsers] = useState([])
  const [oneUser, setOneUser] = useState({ fullName: "", email: "", age: "" })

  const formChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setOneUser({ ...oneUser, [name]: value })
  }

  const formSubmit = (e) => {
    e.preventDefault()
    // Validace
    if (oneUser.fullName && oneUser.email && oneUser.age) {
      const newUser = { ...oneUser, id: new Date().getTime() }
      setUsers((users) => {
        return [...users, newUser]
      })
      setOneUser({ fullName: "", email: "", age: "" })
    } else {
      alert("Něco nebylo vyplněno...")
    }
  }

  const deleteUser = (id) => {
    const filteredUser = users.filter((oneUser) => {
      return oneUser.id !== id
    })
    setUsers(filteredUser)
  }

  return (
    <div className="forms">
      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Jméno:"
          value={oneUser.fullName}
          onChange={formChange}
          name="fullName"
        />
        <input
          type="email"
          placeholder="E-mail:"
          value={oneUser.email}
          onChange={formChange}
          name="email"
        />
        <input
          type="number"
          min={0}
          placeholder="Věk:"
          value={oneUser.age}
          onChange={formChange}
          name="age"
        />
        <input type="submit" value="Odeslat" />
      </form>

      <div className="users-list">
        {users.length === 0 ? <p className="notification">Prázdný seznam</p> :
          <div className="all-users">
            {users.map((oneUser) => {
              const { id, fullName, email, age } = oneUser
              return <div className="one-user" key={id}>
                <p>ID: {id}</p>
                <p>Jméno: {fullName}</p>
                <p>E-mail: {email}</p>
                <p>Věk: {age}</p>
                <button onClick={() => deleteUser(id)}>Vymazat</button>
              </div>
            })}
          </div>}
      </div>
    </div>
  )
}

export default App