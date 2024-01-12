import React, { useEffect, useState } from 'react';//
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';//
import "primereact/resources/themes/lara-light-blue/theme.css"
import axiosClient from '../axios-client';//
import { useStateContext } from '../contexts/ContextProvider';//

import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

const Users = () => {
  const [users, setUsers] = useState([]);//
  // const [loading, setLoading] = useState(false);//
  const { setNotification } = useStateContext();//

//   const rows = users;

  const [page, setPage] = useState(0);//
  const [rowsPerPage, setRowsPerPage] = useState(5);//

//   const handleChangePage = (event) => {
//     setPage(event.page);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(event.rows);
//     setPage(0);
//   };

  const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS}, 
  });

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    axiosClient
      .delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted');
        getUsers();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const getUsers = () => {
    // setLoading(true);
    axiosClient
      .get('/users')
      .then(({ data }) => {
        // setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        // setLoading(false);
      });
  };

  return (
    <div className="text-gray-600">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="text-slate-700 font-bold text-xl">Users</div>
        <Link
          className="text-slate-700 hover:text-white bg-green-500 hover:bg-green-700 font-semibold rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2"
          to="/users/new"
        >
          Add new
        </Link>
      </div>
      <div className="bg-white rounded-md shadow-sm p-5 mb-4 mt-2 animated fadeInDown duration-400">


      <div className="mb-3 w-full justify-start">
          <InputText onInput={(e) => 
            setFilters({
              global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS},
            })
          } placeholder="Keyword Search" className="bg-white border shadow-md px-3 py-3.5 "/>
            </div>

{/*  */}
        <DataTable 
          value={users} 
          sortMode="multiple" 
          filters={filters} 
          paginator 
          rows={rowsPerPage} 
          page={page} 
          totalRecords={users.length} 
          rowsPerPageOptions={[5, 10, 25, 50 , users.length]}
        >
          <Column field="id" header="ID" sortable />
          <Column field="name" header="Name" sortable/>
          <Column field="email" header="Email" sortable/>
          <Column field="created_at" header="Create Date" sortable/>
          <Column
            header="Actions"
            body={(rowData) => (
              <div>
                <Link className="text-slate-700 hover:text-white bg-sky-400/100 hover:bg-sky-500 font-semibold rounded-sm text-sm px-5 py-3 text-center mr-2 mb-2" to={`/users/${rowData.id}`}>
                  Edit
                </Link>
                <button className="text-slate-700 hover:text-white bg-red-500 hover:bg-red-700 font-semibold rounded-sm text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => onDeleteClick(rowData)}>
                  Delete
                </button>
              </div>
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Users;
