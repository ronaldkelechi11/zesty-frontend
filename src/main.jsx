import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './layouts/Landing';
import Admin from './layouts/Admin';
import Login from './components/Admin/Login';
import Track from './layouts/Track';
import AdminAllPackages from './components/Admin/AdminAllPackages';
import EditPackage from './components/Admin/EditPackage'
import AddPackage from './components/Admin/AddPackage';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='track' element={<Track />} />

      <Route path='/login' element={<Login />} />

      <Route path='/admin' element={<Admin />}>
        <Route index element={<AdminAllPackages />} />
        <Route path='add' element={<AddPackage />} />
        <Route path='edit' element={<EditPackage />} />
      </Route>


    </Routes>
  </BrowserRouter>
)
