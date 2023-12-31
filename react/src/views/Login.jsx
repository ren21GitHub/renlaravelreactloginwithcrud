// import {Link} from "react-router-dom";

// export default function Login() {

//     const onSubmit = ev => {
//         ev.preventDefault()
//     }

//     return (
//         <div className="login-signup-form animated fadeInDown">
//             <div className="form">
//                 <form onSubmit={onSubmit}>
//                     <h1 className="title">Login into your account</h1>

//                     <input /* ref={emailRef} */ type="email" placeholder="Email"/>
//                     <input /* ref={passwordRef} */ type="password" placeholder="Password"/>
//                     <button className="btn btn-block">Login</button>
//                     <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
//                 </form>
//             </div>
//         </div>
//     )
// }

import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef, useState} from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)
  // const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
          // setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input ref={emailRef} type="email" placeholder="Email"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}