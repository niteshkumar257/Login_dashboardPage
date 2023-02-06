import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import TextField from '@mui/material/TextField';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react"
import "./TeachersForm.scss"
import axios from "axios";
import jwt_decode from "jwt-decode";
import MenuItem from '@mui/material/MenuItem';


const Subject = [
  {value: 'Physics', label: 'Physics',}, { value: 'Math', label: 'Math',},{ value: 'Chemistry',label: 'Chemistry',},{ value: 'Biology',label: 'Biology',},
 ];
const Medium = [
  { value: 'English',label: 'English',},  {  value: 'Hindi',  label: 'Hindi',},
];
const Gender = [
  {value: 'Male',label: 'Male',},{value: 'Female',label: 'Female',}, {value: 'Binary',abel: 'Binary',},{value: 'Not Disclose',label: 'Not Disclose',},
]
const TeachersForm = (props) => {
  const [teacher_name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [experience, setWorkExp] = useState("");
  const [salary, setSalary] = useState("");
  const [medium, setMedium] = useState("");
  const [subject_id, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");


  const [teacher_nameError,setTeachernameError]=useState(false);
  const [ageError,setAgeError]=useState(false);
  const [mobileError,setMobileError]=useState(false);
  const [emailError,setEmailError]=useState(false);
  const [cityError,setCityError]=useState(false);
  const [experienceError,setExperinecError]=useState(false);
  const [salaryError,setSalaryError]=useState(false);
  const [addresError,setAddressError]=useState(false);
  const [dateError,setDateError]=useState(false);
  const [mdeiumError,setMediumError]=useState(false);
  const [genderError,setGenderError]=useState(false);
  const [subjectError,setSubjectError]=useState(false);
  

  let decode = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = decode.result.school_id;

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/school/${school_id}/allSubject`)
  //     .then((data) => {
  //       console.log(data.data);
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  // }, [])

 
  const submitHandler = (e) => {
    e.preventDefault();
     setTeachernameError(false);
     setMobileError(false);
     setDateError(false);
     setSalaryError(false);
     setCityError(false);
     setAddressError(false);
     setAgeError(false);
     setCityError(false);
     setEmailError(false);
     setExperinecError(false);
     setGenderError(false);
     setSubjectError(false);
     setMediumError(false);
    
    
    if(address=='') setAddressError(true);
    if(age==0) setAgeError(true);
    if(city=='') setCityError(true);
    if(teacher_name=='') setTeachernameError(true);
   if(mobile=='') setMobileError(true);
    if(email=='') setEmailError(true);
    if(subject_id=='') setSubjectError(true);
    if(medium=='') setMediumError(true);
    if(experience=='') setExperinecError(true);
    if(gender=='') setGenderError(true);
    if(salary=='') setSalaryError(true);
    if(date=='') setDateError(true);

    
      
    

    if(teacher_name && address && age && city && mobile && medium && experience && gender && salary && date  && subject_id)
    {
    axios.post('/user', {
      teacher_name,
      age, mobile, email, gender, gender, experience, salary, subject_id, city
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    setName("");
  setAge("");
  setGender("");
  setAddress("");
  setCity("");
  setEmail("");
  setSalary("");
  setSubject("");
  setDate("");
  setMedium("");
  setWorkExp("");
  setAddress("");
  setMobile("");
  }
  return (
    <div className='teachers-container '>
      <Sidebar />
      <div className='teachers'>
        <Navbar adminName={props.AdminName}/>
        <div className='teachers-page page-container'>

          <div className="teacherForm-page-container">
            <div className='teacherForm-page-container-heading'>

              {/* header container */}
              <span >Add Teacher</span>
            </div>
            <form noValidate onSubmit={submitHandler}>
              <div className='teachers-info-detail-container'>

                <div className='teachers-info-detail-student-container'>
                  <div className='teachers-info-detail-student-container-subheading'>
                    <span>Teacher Details</span>
                  </div>
                  <div className='teachers-info-detail-student-container-textfield'>


                    {/* row one */}


                    <div className='teachers-info-section '>
                      <TextField  value={teacher_name}sx={{ flex: 1 }} label="Teacher Name"  error={teacher_nameError}required helperText="Enter Name" onChange={(e) => setName(e.target.value)} />
                      <TextField  value={mobile}sx={{ flex: 1 }} label="Mobile" error={mobileError}  required helperText="Enter Mobile" onChange={(e) => setMobile(e.target.value)} />
                      <TextField  value={email}sx={{ flex: 1 }} label="Email"  helperText="Enter Email" error ={emailError}required type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>


                    {/* row two */}

                    <div className='teachers-info-section '>

                      <TextField value={subject_id} sx={{ flex: 1 }} error={subjectError} required select label="Subject" onChange={(e) => setSubject(e.target.value)} helperText="Select Subject">
                        {Subject.map((option) =>
                         (<MenuItem key={option.value}
                          value={option.value}>
                             {option.label} 
                             </MenuItem>))}
                               </TextField> 
                       <TextField  value={medium} sx={{ flex: 1 }} required select label="Medium" error={mdeiumError} onChange={(e) => setMedium(e.target.value)} helperText="Select Medium">
                        {Medium.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label} </MenuItem>))}</TextField> 
                      <TextField  value={experience}sx={{ flex: 1 }} error={experienceError} helperText="Enter Work-experience" required label="Work-Exp" onChange={(e) => setWorkExp(e.target.value)} /> 

                    </div>


                    {/* { third row} */}
                    <div className='teachers-info-section '>

                       <TextField value={gender} sx={{ flex: 1 }} error={genderError} required select label="Gender" onChange={(e) => setGender(e.target.value)} helperText="Select Gender">
                        {Gender.map((option) =>
                         (<MenuItem key={option.value} 
                         value={option.value}>
                           {option.label}</MenuItem>))}
                            </TextField>
                       <TextField  value={salary}sx={{ flex: 1 }} error={salaryError}label="Salary" type="number" helperText="Enter Salary" required onChange={(e) => setSalary(e.target.value)} />
                      <TextField value={city} sx={{ flex: 1 }} error={cityError} label="City"  required helperText="Enter City" onChange={(e) => setCity(e.target.value)} />  



                    </div>

                    {/* 4 th row */}
                    <div className='teachers-info-section '>

                      <TextField value={age} sx={{ flex: 1 }} error={ageError} label="Age" type="number" equired helperText="Enter Age" onChange={(e) => setAge(e.target.value)} />
                      <TextField  value={date} sx={{ flex: 1 }} error={dateError} type="date" required helperText="Enter StartDate" onChange={(e) => setDate(e.target.value)} />
                      <TextField value={address} sx={{ flex: 1 }}  error={addresError}label="Address"  required helperText="Enter the Address" onChange={(e) => setAddress(e.target.value)} />
                    </div>


                  </div>
                </div>
                <div className='buttonSubmit'> <button>Submit</button>  </div>


              </div>
            </form>






          </div>





        </div>
      </div>

    </div>

  )
}

export default TeachersForm