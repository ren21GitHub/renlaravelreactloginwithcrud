import {useEffect, useState} from "react";//
import axiosClient from "../axios-client.js";//
import {Link} from "react-router-dom";//
import { useStateContext } from "../contexts/ContextProvider.jsx";//
import { TablePagination } from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState([]);//
  const [loading, setLoading] = useState(false);//
  const {setNotification} = useStateContext()//

  const rows = users;

  const [page, setPage] = useState(0);//
  const [rowsPerPage, setRowsPerPage] = useState(5);//
  const handleChangePage = (event , newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
// Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
        // console.log(data);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="text-gray-600">
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            <div className="text-slate-700 font-bold text-xl">Users</div>
            <Link className="text-slate-700 hover:text-white bg-green-500 hover:bg-green-700 font-semibold rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2" to="/users/new">Add new</Link>
        </div>
        <div className="bg-white rounded-md shadow-sm p-5 mb-4 mt-2 animated fadeInDown duration-400">
            <table className="w-full border-collapse border-spacing-0 justify-between">
                <thead>
                    <tr>
                        <th className="bg-slate-300 py-3 font-semibold text-gray-700">ID</th>
                        <th className="bg-slate-300">Name</th>
                        <th className="bg-slate-300 hidden sm:table-cell font-semibold text-gray-700">Email</th>
                        <th className="bg-slate-300 hidden md:table-cell font-semibold text-gray-700">Create Date</th>
                        {/* <th className="hidden lg:table-cell font-semibold text-gray-700">Sample</th> */}
                        <th className="bg-slate-300 font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                {loading &&
                    <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                }
                {!loading &&
                    <tbody> 
                    {(rowsPerPage > 0 ? users.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage):users).map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td className="w-full sm:w-auto max-w-0 sm:max-w-none font-semibold text-gray-600">{u.name}
                              <dl className="lg:hidden">
                                <dt className="sr-only sm:hidden">Email</dt>
                                <dd className="sm:hidden text-xs font-thin text-gray-500 truncate">{u.email}</dd>
                                <dt className="sr-only md:hidden">Create Date</dt>
                                <dd className="md:hidden text-xs font-thin text-gray-500 truncate">{u.created_at}</dd>
                                <dt className="sr-only lg:hidden">Sample</dt>
                              </dl>
                            </td>
                            <td className="hidden sm:table-cell">{u.email}</td>
                            <td className="hidden md:table-cell">{u.created_at}</td>
                            <td className="sm:hidden">
                              <dl>
                                <dd className="my-4">
                                  <Link className="text-slate-700 hover:text-white bg-sky-400/100 px-7 py-3 hover:bg-sky-500 font-semibold rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2" to={'/users/' + u.id}>Edit</Link>
                                </dd>
                                <dd>
                                  <button className="text-slate-700 hover:text-white bg-red-500 hover:bg-red-700 font-semibold rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={ev => onDeleteClick(u)}>Delete</button>
                                </dd>
                              </dl>
                            </td>
                            <td className="hidden sm:table-cell">
                                <Link className="text-slate-700 hover:text-white bg-sky-400/100 hover:bg-sky-500 font-semibold rounded-sm text-sm px-5 py-3 text-center me-2 mb-2" to={'/users/' + u.id}>Edit</Link>
                                &nbsp;
                                <button className="text-slate-700 hover:text-white bg-red-500 hover:bg-red-700 font-semibold rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={ev => onDeleteClick(u)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                    {/* {emptyRows > 0 && (
                      <tr style={{ height: 34 * emptyRows }}>
                        <td colSpan={3} aria-hidden />
                      </tr>
                    )} */}

                    </tbody>
                }
            </table>
            <TablePagination
              rowsPerPageOptions= {[5,10,25,50,{ label: 'All', value: -1 }]}
              component="div"
              count={rows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    </div>
  )
}
