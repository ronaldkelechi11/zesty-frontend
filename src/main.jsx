import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './layouts/Landing';
import Admin from './layouts/Admin';
import Login from './components/Admin/Login';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      
      <Route path='/login' element={<Login/>}/>
      
      <Route path='/admin' element={<Admin/>}>
      {/* Other admin routes */}
      </Route>


    </Routes>
    </BrowserRouter>
)
