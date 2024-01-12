import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect} from "react";
import Sidebar, { SidebarItem } from "./Sidebar"
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react"

export default function DefaultLayout(){
    const {user, token, setUser, setToken, notification} = useStateContext()

    if(!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])

    return(

        <main className="flex border-box">
            <div className="flex">
            <Sidebar>
                <Link to="/users">
                    <SidebarItem icon = {<UserCircle size={20} />} text = "Users" to="/users" />
                </Link>
                <Link to="/dashboard">
                    <SidebarItem icon = {<LayoutDashboard size={20} />} text = "DashBoard" alert to="/dashboard" />
                </Link>
                <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />
                <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
                <SidebarItem icon={<Package size={20} />} text="Orders" alert />
                <SidebarItem icon={<Receipt size={20} />} text="Billings" />
                <hr className="my-3" />
                <SidebarItem icon={<Settings size={20} />} text="Settings" />
                <SidebarItem icon={<LifeBuoy size={20} />} text="Statistics" />
                
            </Sidebar>
            </div>
            <div className="flex-1 text-gray-600">
                <header className="h-20 p-8 bg-white shadow-md flex justify-between items-center">
                <div className="text-slate-700 font-bold text-xl">
                    Header...
                </div>

                <div>
                    Hi,<a href="" className="text-md font-semibold text-sky-700"> {user.name} &nbsp; &nbsp;</a>
                        <a onClick={onLogout} className="text-slate-700 hover:text-white bg-white-500 hover:bg-gray-700 font-semibold rounded-sm text-sm px-5 py-3 text-center me-2 mb-2" href="#">Logout</a>
                </div>
                </header>
                <div className="pt-6 pl-6 mr-6">
                    <Outlet />
                </div>
                {notification &&
                    <div className="fixed right-4 bottom-4 z-50 p-5 bg-green-500 text-white rounded-sm">
                        {notification}
                    </div>
                }
            </div>
        </main>
        // <div id="defaultLayout">
        //     <aside>
        //         <Link to="/dashboard">Dashboard</Link>
        //         <Link to="/users">Users</Link>
        //     </aside>
        //     <div className="content">
        //         <header>
        //             <div>
        //                 Header
        //             </div>

        //             <div>
        //                 {user.name} &nbsp; &nbsp;
        //                 <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
        //             </div>
        //         </header>
        //         <main>
        //             <Outlet/>
        //         </main>
        //         {notification &&
        //             <div className="notification">
        //                 {notification}
        //             </div>
        //         }
        //     </div>
        // </div>
    )
}