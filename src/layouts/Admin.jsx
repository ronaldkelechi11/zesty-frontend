import { Outlet, useNavigate } from 'react-router-dom'
import AdminSideBar from "../components/Admin/AdminSideBar";
import { useEffect } from 'react';


const Admin = () => {

  return (
    <div className='flex h-screen'>
      {/* Sidebar or Navbar */}
      <AdminSideBar />

      {/* Layout Screen */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin