
import React, { useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/createAccount/Login'
import  Navbar  from './components/Navbar'
import { DContext } from './context/Datacontext'
import CreateBus from './components/SuperAdmin.js/CreateBus'
import ViewBusDetails from './components/ViewBusDetails'
import UsresQR from './components/UsresQR'
import SuperAdminpage from './components/SuperAdmin.js/SuperAdminpage'
import CreateAdmin from './components/SuperAdmin.js/CreateAdmin'
import { TrackingBus } from './components/TrackingBus'


export const App = () => {

   const {Auth}=useContext(DContext)


  //  if(Auth){
  //   return <Loading/>

  //  }


  return (
    <div>

     <Navbar/>
     
     
    <Routes>
      <Route path='/' element= {Auth?.role === 'superadmin' ? <SuperAdminpage/> : Auth?.role === 'admin' ? <ViewBusDetails/> : <UsresQR/>} ></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/CreateAdmin' element={Auth?.role === 'superadmin' ? <CreateAdmin/> : <Login/>}></Route>
      <Route path='/CreateBus' element={Auth?.role === 'superadmin' ? <CreateBus/> : <Login/>}></Route>
      <Route path='/Tracking-Bus/:id' element={<TrackingBus/>}></Route>
    </Routes>

    

    </div>
  )
}
