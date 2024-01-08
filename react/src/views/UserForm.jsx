import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '', 
    password_confirmation: ''
  })
  
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()


  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated!')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created!')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <div className="text-slate-700 font-bold text-xl">Update User: {user.name}</div>}
      {!user.id && <div className="text-slate-700 font-bold text-xl">New Users</div>}
      <div className="bg-white rounded-md shadow-sm p-5 mb-4 mt-2 animated fadeInDown duration-400">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="p-4 bg-red-500 text-white rounded-sm mb-4">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 my-4 p-3.5 hover:ring-sky-600"/>
            <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 my-4 p-3.5 hover:ring-sky-600"/>
            <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 my-4 p-3.5 hover:ring-sky-600"/>
            <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation" className="block w-full rounded-sm border-0 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 my-4 p-3.5 hover:ring-sky-600"/>
            <button className="text-slate-700 hover:text-white bg-sky-400/100 hover:bg-sky-500 font-semibold rounded-sm text-sm px-5 py-3 text-center me-2 my-4">Save</button>
          </form>
        )}
      </div>
    </>
  )
}