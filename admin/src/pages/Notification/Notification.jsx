import React from 'react'
import "./Notifications.scss"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"

const Notification = (props) => {
  
  
  return (
    <div className='SingleTeacherPage-container'>
    <Sidebar/>
    <div className='SingleTeacher'>
        <Navbar  adminName={props.AdminName}/>
        <div className='SingleTeacher-page page-container'>
          
    </div>
    
  
    </div>
   </div>
  )
}

export default Notification
