import { useState, useEffect } from "react"
import AddUserForm from "./components/AddUserForm"
import UserCard from "./components/UserCard"
import Greeting from "./Greeting"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [userName, setUserName] = useState("Aman Raj Akash")
  const [inputName, setInputName] = useState("")

  // Fetch users from API
  const fetchUsers = () => {
    setLoading(true)
    setError(null)

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users")
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>My React App is Working 🚀</h1>
      <p>This is my first JSX paragraph</p>
      <p>2 + 2 = {2 + 2}</p>
      <p>Hare Krishna, Aman Raj Akash</p>

      <p>Welcome back!</p>
      <Greeting name={userName} />
      <button onClick={() => setUserName("Full Stack Developer 🚀")}>Change Name</button>
      <input
        type="text"
        placeholder="Enter your name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button onClick={() => setUserName(inputName)}>Submit</button>

      <button onClick={fetchUsers}>Refresh User Data</button>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>

      {/* Show loading or error */}
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add user form */}
      <AddUserForm addUser={(user) => setUsers([...users, user])} />

      {/* Display users */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

