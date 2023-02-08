import {useState,useEffect} from 'react'
import "./Dash.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Email } from '@mui/icons-material';
import student1 from "../../assest/s5.png";
import teacher from "../../assest/t2.png";
import department from "../../assest/d2.png";
import widgest from '../Widgest/widgest';
import s4 from "../../assest/school4.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
const info={
    school_name:"GAANV Wala High School Academy, Jaipur",
    city_name:"Jaipur",
    email:"admin123@gaanvwala.com",
    mobile:"82XXXXXXX96",
    admin_name:"GW Head"
}


const Dashboard = (props) => {

    
  
    // props.AdminNameHandler("Nitesh Kumar");
     const [data,setData]=useState(info);
    const [studentCount,setStudentCount] = useState(1250);
    const [teacherCount,setTeacherCount] = useState(34);
    let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
    let school_id = decodeToken.result.school_id;
    useEffect(() => {
       axios.get(`http://localhost:8080/schools/${school_id}`,{headers: { 'Content-Type': 'application/json'}}).then((res) => {
       //  console.log(res)
         setData(res.data.schoolDetail);
         setStudentCount(res.data.totalStudent);
         setTeacherCount(res.data.totalTeacher);
         props.AdminNameHandler("Nitesh Kumar");
       }) 
    }, []);
  
  return (
  
    <div>
    <div className='dash'>
        <div className="top">
          <div className='school-image'>
            <img src={s4}></img>
          </div>
            <div className="basic-info">
        <div   className='Name-of-school'>
           
                <li>
                 
                   <span> {"GAANV Wala High School Academy, Jaipur"}</span>
                </li>
        
        </div>
       <div className="basic-info-container">
        <div className='basic-info-container-components'>
        <div className="info-container">
           <li>
            <label>Owner Name : </label>
            <span> {"GW Head"}</span>
           </li>
          </div>
          <div className="info-container">
            <li>
              <label>City : </label>
              <span>{ "Jaipur"}</span>
            </li>
          </div>
        </div>
         <div className='basic-info-container-components'>
         <div className="info-container">
         <li>
          <label>Owner Email :</label>
          <span>{"admin123@gaanvwala.com"}</span>
            </li>
          </div>
          <div className="info-container">
          <li>
            <label>Phone : </label>
            <span>{"82XXXXXXX96"}</span>
            </li>
          </div>
         </div>
         
       </div>
            </div>
        </div>
        <div className='bottom'>
            <div className="left-container">
            <div className="widgest-container">
        <div className="left">
            <div className="Title">
                Student
            </div>
            <div className="count">
                {studentCount}
            </div>
        </div>
        <div className="right">
            <div className="icon">
                <img src={student1}></img>
            </div>
        </div>
    </div>
             
            </div>
            <div className="mid-container">
            <div className="widgest-container">
        <div className="left">
            <div className="Title">
                Deapartment
            </div>
            <div className="count">
                3
            </div>
        </div>
        <div className="right">
            <div className="icon">
                <img src={department}></img>
            </div>
        </div>
    </div>
            </div>
            <div className="right-container">
            <div className="widgest-container">
        <div className="left">
            <div className="Title">
             Teachers
            </div>
            <div className="count">
                {teacherCount}
            </div>
        </div>
        <div className="right">
            <div className="image-icon">
                <img src={teacher}></img>
            </div>
        </div>
    </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard
