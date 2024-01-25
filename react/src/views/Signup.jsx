import { Link } from "react-router-dom"
import { createRef, useState } from "react"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios-client"

export default function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/signup', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422){
            // console.log(response.data.errors);
            setErrors(response.data.errors)
          }
        })
    }

    return (
      <div className="flex min-h-full h-screen flex-col justify-center px-6 py-12 lg:px-8 animated fadeInDown duration-400">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <a href="#"><img className="mx-auto h-10 w-auto" src="3.png" alt="Your Company"/></a>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Signup for Free</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errors &&
          <div className="p-4 bg-red-500 text-white rounded-sm mb-4">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="mt-2">
              <input ref={nameRef} type="text" placeholder="Full Name" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mb-15 p-3.5 hover:ring-sky-600"/>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input ref={emailRef} type="email" placeholder="Email Address" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mb-15 p-3.5 hover:ring-sky-600"/>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input ref={passwordRef} type="password" placeholder="Password" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mb-15 p-3.5 hover:ring-sky-600"/>
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 mb-15 p-3.5 hover:ring-sky-600"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-sm bg-sky-600 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mb-15">Sign up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
        Already registered?
          <Link to="/login" className="font-semibold leading-6 text-sky-600 hover:text-sky-500"> Sign In</Link>
        </p>
      </div>
    </div>
    )
}

// return (
//   <div className="login-signup-form animated fadeInDown">
//       <div className="form">
//           <form onSubmit={onSubmit}>
//               <h1 className="title">Signup for Free</h1>
//               {errors &&
//                 <div className="p-4 bg-red-500 text-white rounded-sm mb-4">
//                   {Object.keys(errors).map(key => (
//                     <p key={key}>{errors[key][0]}</p>
//                   ))}
//                 </div>
//               }
//               <input ref={nameRef} type="text" placeholder="Full Name"/>
//               <input ref={emailRef} type="email" placeholder="Email Address"/>
//               <input ref={passwordRef} type="password" placeholder="Password"/>
//               <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
//               <button className="flex w-full justify-center text-slate-700 hover:text-white bg-sky-500 hover:bg-sky-700 font-semibold rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2">Signup</button>
//               <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
//           </form>
//       </div>
//   </div>
// )

/* import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Signup() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
} */