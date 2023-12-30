import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { TablePagination } from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  const rows = users;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
            <h1>Users</h1>
            <Link className="btn-add" to="/users/new">Add new</Link>
        </div>
        <div className="bg-white rounded-md shadow-sm p-5 mb-4 mt-2 animated fadeInDown duration-400">
            <table className="w-full border-collapse border-spacing-0">
                <thead className="font-semibold">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Create Date</th>
                        <th>Actions</th>
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
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.created_at}</td>
                            <td>
                                <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                                &nbsp;
                                <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
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
              rowsPerPageOptions= {[5,10,25,50,/* rows.length */{ label: 'All', value: -1 }]}
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
