import { ChevronFirst, ChevronLast, LineChart, MoreVertical } from "lucide-react"
import { createContext, useState, useContext, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider"
import { Link, useLocation, } from "react-router-dom"

const SidebarContext = createContext()

export default function Sidebar({children}){
    const [expanded, setExpanded] = useState(true)
    const {user} = useStateContext()

    useEffect(() => {
        // Function to update setExpanded based on screen width
        const handleResize = () => {
            
          const screenWidth = window.innerWidth;
    
          // Set the expanded value based on the screen width
          if (screenWidth < 1300) {
            setExpanded(false);
          } else {
            setExpanded(true);
          }
        };

        // Initial call to set the initial state based on the screen width
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    },[]);

    return (
        <aside className="h-screen">
            <nav className={`h-full sm:w-min flex flex-col bg-white border-r shadow-sm`}>
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="4.png" className={`overflow-hidden transition-all ${expanded ? "w-32": "w-0"}`} alt="" />
                    <button onClick={() => setExpanded((curr) =>!curr)} className="p-1.5 rounded-sm bg-gray-50 hover:bg-gray-100">
                        {expanded? <ChevronFirst />: <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3 ">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="" className="w-10 h-10 rounded-sm" />
                
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3": "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">{user.name}</h4>
                            <span className="text-xs text-gray-600">{user.email}</span>
                        </div>
                        <MoreVertical size={20}/>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, to, alert}){
    const {expanded} = useContext(SidebarContext)
    const location = useLocation()
    const isActive = location.pathname === to


    return(
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-sm cursor-pointer transition-colors group
        ${ isActive
            ? "bg-gradient-to-tr from-sky-200 to-sky-100 text-sky-800"
            : "hover:bg-sky-50 text-gray-600"
        }
        `}>
        {/* <Link to={to}> */}
        {icon}
        {/* </Link> */}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3": "w-0"}`}>{text}</span>
        {alert && (
            <div className={`absolute right-2 w-2 h-2 rounded bg-sky-400 ${expanded ? "" : "top-2" }`}/>
        )}
        {!expanded && (
            <div className={`
            absolute z-[100] left-full rounded-sm px-2 py-1 ml-6 bg-sky-100 text-sky-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                {text}
                </div>
        )}
        </li>
    )
} 
