/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login"
import Signup from "./views/Signup"
import Users from "./views/Users"
import NotFound from "./views/NotFound"
import GuestLayout from "./components/GuestLayout"
import DefaultLayout from "./components/DefaultLayout"
import Dashboard from "./views/Dashboard"

export default function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element ={<DefaultLayout />} />
            {/* <Route path="/" element={<GuestLayout />} /> */}
            <Route path="/Dashboard" element ={<Dashboard />} />
            <Route path="/Users" element ={<Users />} />
            <Route path="/Login" element ={<Login />} />
            <Route path="/Signup" element ={<Signup />} />
            <Route path="*" element ={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}
