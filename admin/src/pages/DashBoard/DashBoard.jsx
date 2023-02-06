import {useState}from 'react'
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import "./DashBoard.scss"
import Dashboard from "../../components/Dashboard/Dash"
import jwt_decode from "jwt-decode";
import axios from "axios";

import { useEffect } from 'react'

const DashBoard = (props) => {

  
  const [adminName,setAdminName]=useState("");
 const adminNamehandler=(name)=>
 {
   
    setAdminName(name);
    props.AdminNameHandler(name);
 }
  return (
   
  
    <div className='dashboard-container '>
    <Sidebar/>
    <div className='dashboard'>
      <Navbar  adminName={adminName}/>
      <div className='dashboard-page page-container'>
        <div 
        style={{
          width:"100%",
          height:"100vh"
        }}
        >
        <Dashboard AdminNameHandler={adminNamehandler}/>
        </div>
     
      </div>
    </div>
    </div>
  )
}

export default DashBoard;
