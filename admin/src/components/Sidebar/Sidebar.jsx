import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import logo from "../../assest/Img1.png"
import { Link, NavLink ,useNavigate} from "react-router-dom";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaChalkboardTeacher } from 'react-icons/fa'
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "./Sidebar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode"; 


const Sidebar = (props) => {
  const menuItem = [
    {
      path: "/dashBoard",
      name: "Dashboard",
      icon: <DashboardOutlinedIcon className='icon' />
    },    
    {
      path: "/Student",
      name: "Student",
      icon: <SchoolOutlinedIcon className='icon' />
    },
    {
      path: "/Grade",
      name: "Grade",
      icon: <GradeOutlinedIcon className='icon' />
    },
    {
      path: "/Teachers",
      name: "Teachers",
      icon: <FaChalkboardTeacher />
    },
    {
      path: "/AddStudent",
      name: "New Student",
      icon: <AddCircleOutlineOutlinedIcon className='icon' />


    },

    {
      path: "/Notification",
      name: "Notification",
      icon: <NotificationsNoneIcon className='icon' />


    },
    // {
    //   path: "/addSchool",
    //   name: "Add School",
    //   icon: <AddCircleOutlineOutlinedIcon className='icon' />
    // },
    // {
    //   path: "/addTest",
    //   name: "Add Test",
    //   icon: <AddCircleOutlineOutlinedIcon className='icon' />
    // }
   

  ]
  const [isExpanded, setExpendState] = useState(true);
  const [user,setUser]=useState(false);
  const navigate=useNavigate();
const logoutHandler=(e)=>
{
  e.preventDefault()
  localStorage.removeItem("auth_token");
  localStorage.clear();
  navigate('/');
  
}
const logoutHandlerSuperAdmin=(e)=>
{
  e.preventDefault();
  localStorage.removeItem("auth_token");
  localStorage.clear();
  navigate('/');
}
const HomepageNavigator=(e)=>
{
  
   navigate('/superAdmin');
   localStorage.removeItem("superadmin_school");


}
const MentorNavigator=(e)=>
{
  
   navigate('/Mentor');
  


}
let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
let superAdmin_user=localStorage.getItem("superadmin_school");

const SchoolFormHandleSubmit=(e)=>
{
  e.preventDefault();
  navigate('/AddSchool');
}

const TestHandleSubmit = (e) => {
  e.preventDefault();
  navigate('/AddTest');
}

const CurriculumNavigator = (e) => {
  e.preventDefault();
  navigate("/AddCurriculum");
}
 
const SubjectPageNavigator=(e)=>{
  e.preventDefault();
  navigate("/SubjectList");
}
  return (

    <>
      <div className={isExpanded ? "sidebar " : "sidebar sidebar-toggle"}  >
        <div className="sidebar-container">
          <div className="logo-container">
            {isExpanded && (
              <div className="logo-container-heading">
                <img src={logo}></img>
                <span className='title' >GW Techies</span>
              </div>)}
            <div>
              <MenuIcon className="menu-icon"
                onClick={() => setExpendState(!isExpanded)}
              />
            </div>
          </div>
          <div className="menuItems-container">
            <div className='menu-item'>
            {
                decodeToken.result.role=="SUPER_ADMIN" &&
                <NavLink   onClick={HomepageNavigator} to="/superAdmin"  className='items' activeclassname="active" style={{
                  textDecoration: "none", color: "white"
                }}>
                <div  className={isExpanded ? "item" : "item-toggle"} >
                <div className='icon'>
                 <HomeOutlinedIcon/>
                </div>
                {
                  isExpanded &&  <span className='link-text'>Home</span>
                }
               
               </div>
                </NavLink>
              }               
              {(decodeToken.result.role==="ADMIN" || superAdmin_user!=null )  && menuItem.map((item, index) => {
                return (
                  <NavLink key={index} activeclassname="active" className='items' style={{
                    textDecoration: "none", color: "white"
                  }} to={item.path}>
                    <div activeclassname="active" key={index} className={isExpanded ? "item" : "item-toggle"} >
                      <div activeclassname="active" className="icon" > {item.icon}</div>
                      {
                        isExpanded && (
                          <span activeclassname="active" className="link-text" >{item.name}</span>
                        )







                      }
                    </div>
                  </NavLink>
                )

              })
              }
              
               {
                decodeToken.result.role==="SUPER_ADMIN" && 
                localStorage.getItem("superadmin_school") != null &&
                <NavLink to="/AddTest" onClick={TestHandleSubmit}  className='items' activeclassname="active" style={{
                  textDecoration: "none", color: "white"
                }}>
                <div  className={isExpanded ? "item" : "item-toggle"} >
                <div className='icon'>
                  <AddCircleOutlineOutlinedIcon/>
                </div>
                {
                  isExpanded &&  <span className='link-text'>Add Test</span>
                }
               
               </div>
                </NavLink>
              }
              
              {
                decodeToken.result.role==="ADMIN" &&
                <button className='btn' onClick={logoutHandler}>
                <div  className={isExpanded ? "item" : "item-toggle"} >
                <div className='icon'>
                  <LogoutIcon/>
                </div>
                {
                  isExpanded &&  <span className='link-text'>Logout</span>
                }
               
               </div>
                </button>
              }
              
               {
                decodeToken.result.role==="SUPER_ADMIN" && 
                localStorage.getItem("superadmin_school") == null &&
                <NavLink  className='items' activeclassname="active" style={{
                  textDecoration: "none", color: "white"
                }} onClick={SchoolFormHandleSubmit} to="/AddSchool">
                <div  className={isExpanded ? "item" : "item-toggle"} >
                <div className='icon'>
                  <AddCircleOutlineOutlinedIcon/>
                </div>
                {
                  isExpanded &&  <span className='link-text'>Add School</span>
                }
               
               </div>
                </NavLink>
              }
              {
                decodeToken.result.role==="SUPER_ADMIN" &&  localStorage.getItem("superadmin_school") == null &&
                <NavLink  className='items' activeclassname="active" style={{
                  textDecoration: "none", color: "white"
                }} onClick={CurriculumNavigator} to="/AddCurriculum">
                <div  className={isExpanded ? "item" : "item-toggle"} >
                <div className='icon'>
                  <AddCircleOutlineOutlinedIcon/>
                </div>
                {
                  isExpanded &&  <span className='link-text'>Curriculum</span>
                }
               
               </div>
                </NavLink>
              }
                {
                decodeToken.result.role==="SUPER_ADMIN" &&  localStorage.getItem("superadmin_school") == null &&
                <NavLink  className='items' activeclassname="active" style={{
                  textDecoration: "none", color: "white"
                }} onClick={MentorNavigator} to="/Mentor">
                <div  className={isExpanded ? "item" : "item-toggle"} >
                <div className='icon'>
                  <AddCircleOutlineOutlinedIcon/>
                </div>
                {
                  isExpanded &&  <span className='link-text'>Mentor</span>
                }
               
               </div>
                </NavLink>
              }
              
               {
                decodeToken.result.role==="SUPER_ADMIN" &&
                <NavLink  className='items' activeclassname="active" style={{
                  textDecoration: "none", color: "white"
                }} to="/" onClick={logoutHandlerSuperAdmin}>
                <div  className={isExpanded ? "item" : "item-toggle"} >
                <div className='icon'>
                  <LogoutIcon/>
                </div>
                {
                  isExpanded &&  <span className='link-text'>Logout</span>
                }
               
               </div>
                </NavLink>
              } 
            </div> 
          </div> 
        </div>
      </div>
    </>
  );
}

export default Sidebar
