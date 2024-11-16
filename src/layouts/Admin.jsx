import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex h-screen'>
      {/* Sidebar or Navbar */}

      {/* Layout Screen */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin