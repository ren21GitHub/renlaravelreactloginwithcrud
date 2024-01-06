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
    <div className="flex min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <a href="#"><img class="mx-auto h-10 w-auto" src="4.png" alt="Your Company"/></a>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {message &&
          <div className="p-4 bg-red-500 text-white rounded-sm mb-4">
            <p>{message}</p>
          </div>
        }
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="mt-2">
              <input ref={emailRef} type="email" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mb-15 p-3.5 hover:ring-sky-600" placeholder="Email"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input ref={passwordRef} type="password" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mb-15 p-3.5 hover:ring-sky-600" placeholder="Password"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-sm bg-sky-600 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mb-15">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered?
          <Link to="/signup" className="font-semibold leading-6 text-sky-600 hover:text-sky-500"> Create an account</Link>
        </p>
      </div>
    </div>
  )
  
}

// return (
  //   <div className="login-signup-form animated fadeInDown">
  //     <div className="form">
  //       <form onSubmit={onSubmit}>
  //         <h1 className="title">Login into your account</h1>

  //         {message &&
  //           <div className="p-4 bg-red-500 text-white rounded-sm mb-4">
  //             <p>{message}</p>
  //           </div>
  //         }

  //         <input ref={emailRef} type="email" placeholder="Email"/>
  //          <input ref={passwordRef} type="password" placeholder="Password"/>
  //          <button className="flex w-full justify-center text-slate-700 hover:text-white bg-sky-500 hover:bg-sky-700 font-semibold rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
  //          <p className="message ">Not registered? <Link to="/signup">Create an account</Link></p>
  //        </form>
  //      </div>
  //   </div>
  // )