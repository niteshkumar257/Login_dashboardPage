import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import TextField from '@mui/material/TextField';
import { useState } from "react"
import "./TeachersForm.scss"
import axios from "axios";
import jwt_decode from "jwt-decode";
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Sort } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Subject = [{ value: '1', label: 'Physics' }];
const Medium = [{ value: 'English', label: 'English', }, { value: 'Hindi', label: 'Hindi', },];
const Gender = [
  { value: 'Male', label: 'Male', }, { value: 'Female', label: 'Female', }, { value: 'Binary', abel: 'Binary', }, { value: 'Not Disclose', label: 'Not Disclose', },
]

const classIds = [
  {
    class_id: 1,
    class_name: '1'
  },
  {
    class_id: 2,
    class_name: '2'
  },
  {
    class_id: 3,
    class_name: '3'
  },
  {
    class_id: 4,
    class_name: '4'
  }
]


const TeachersForm = (props) => {
  const [teacher_name, setName] = useState("");
  const [age, setAge] = useState("");
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
  const [classes, setClasses] = useState([]);  
  const [classs, setClasss] = useState([]);
  const [classIds, setclassIds] = useState([]);

  const [teacher_nameError, setTeachernameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [experienceError, setExperinecError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);
  const [addresError, setAddressError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [mdeiumError, setMediumError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [classIdsError, setclassIdsError] = useState(false);


  let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = (localStorage.getItem("superadmin_school") === null) ? decodeToken.result.school_id : localStorage.getItem("superadmin_school");

  let allSubjects = [];
  const [subject_list, setSubjectList] = useState([]);
  subject_list?.map((item) => {
    const data = {
      label: item.subject_name,
      value: item.subject_id
    }
    allSubjects.push(data);
  })
  useEffect(() => {
    axios.get(`https://school-management-api.azurewebsites.net/${school_id}/allSubject`)
      .then((data) => {
        setSubjectList(data.data.allSubject)
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getClassId`)
      .then((data) => {
        let allClasses = [];
        for (let i = 0; i < data.data.class_id.length; i++) {
          const datas = {
            class_name: data.data.class_name[i],
            class_id: data.data.class_id[i]
          }
          allClasses.push(datas);
        }
        setClasses(allClasses);
      }).catch((err) => {
        console.log(err);
      })
  }, [])


  const AddTeacherHandler = (e) => {
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
    setclassIdsError(false);


    if (address == '') setAddressError(true);
    if (age == 0) setAgeError(true);
    if (city == '') setCityError(true);
    if (teacher_name == '') {
      setTeachernameError(true);
    }
    if (mobile.length != 10) setMobileError(true);
    if (email == '') setEmailError(true);
    if (subject_id == '') setSubjectError(true);
    if (medium == '') setMediumError(true);
    if (experience == '') setExperinecError(true);
    if (gender == '') setGenderError(true);
    if (salary == '') setSalaryError(true);
    if (date == '') setDateError(true);
    if(classIds.length == 0) setclassIdsError(true);


    if (teacher_name && address && age && city && mobile && medium && experience && gender && salary && date && classIds) {
      axios.post(`https://school-management-api.azurewebsites.net/schools/${school_id}/addtecher`, {
        teacher_name,
        age, mobile, email, gender, medium, date, experience, salary, subject_id, city, class_ids: classIds
      })
        .then((data) => {
          toast.success(data.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          toast.error("Something went wrong", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });

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
      setclassIds([]);
      setClasses([]);
    }
  }
  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  } 
  const handleClassChange = (event) => {
    const {
        target: { value },
      } = event;
      
      let duplicateRemoved = [];
      let dataIds = [];
      value.forEach((item) => {
        if (duplicateRemoved.findIndex((o) => o.class_id === item.class_id) >= 0) {
          duplicateRemoved = duplicateRemoved.filter((x) => x.class_id === item.class_id);
        } else {
          duplicateRemoved.push(item);
        }
      }); 

      duplicateRemoved.forEach((item) => {
        dataIds.push(item.class_id);
      });          
      dataIds.sort();
      setclassIds(dataIds);      
      setClasss(duplicateRemoved);
}

  return (
    <div className='teachers-container '>
      <Sidebar isExpandedHandler={isExpandedHandler} />
      <div className='teachers'>
        <Navbar adminName={props.AdminName} />
        <div className='teachers-page page-container'>
          <div className="teacherForm-page-container">
            <div className='teacherForm-page-container-heading'>
              {/* header container */}
              <span >Add Teacher</span>
            </div>
            <form noValidate onSubmit={AddTeacherHandler}>
              <div className='teachers-info-detail-container'>
                <div className='teachers-info-detail-student-container'>
                  <div className='teachers-info-detail-student-container-subheading'>
                    <span>Teacher Details</span>
                  </div>
                  <div className='teachers-info-detail-student-container-textfield'>
                    {/* row one */}
                    <div className='teachers-info-section '>
                      <TextField value={teacher_name} sx={{ flex: 1 }} label="Teacher Name" error={teacher_nameError} required helperText="Enter Name" onChange={(e) => setName(e.target.value)} />
                      <TextField value={mobile} sx={{ flex: 1 }} label="Mobile" error={mobileError} required helperText="Enter Mobile" onChange={(e) => setMobile(e.target.value)} />
                      <TextField value={email} sx={{ flex: 1 }} label="Email" helperText="Enter Email" error={emailError} required type="email" onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    {/* row two */}

                    <div className='teachers-info-section '>
                      <TextField value={subject_id} sx={{ flex: 1 }} error={subjectError} required select label="Subject" onChange={(e) => setSubject(e.target.value)} helperText="Select Subject">
                        {allSubjects?.map((option) =>
                        (<MenuItem key={option.value}
                          value={option.value}>
                          {option.label}
                        </MenuItem>))}
                      </TextField>
                      <TextField value={medium} sx={{ flex: 1 }} required select label="Medium" error={mdeiumError} onChange={(e) => setMedium(e.target.value)} helperText="Select Medium">
                        {Medium.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label} </MenuItem>))}</TextField>
                      <TextField value={experience} sx={{ flex: 1 }} error={experienceError} helperText="Enter Work-experience" required label="Work-Exp" onChange={(e) => setWorkExp(e.target.value)} />
                    </div>


                    {/* { third row} */}
                    <div className='teachers-info-section '>
                      <TextField value={gender} sx={{ flex: 1 }} error={genderError} required select label="Gender" onChange={(e) => setGender(e.target.value)} helperText="Select Gender">
                        {Gender.map((option) =>
                        (<MenuItem key={option.value}
                          value={option.value}>
                          {option.label}</MenuItem>))}
                      </TextField>
                      <TextField value={salary} sx={{ flex: 1 }} error={salaryError} label="Salary" type="number" helperText="Enter Salary" required onChange={(e) => setSalary(e.target.value)} />
                      <TextField value={city} sx={{ flex: 1 }} error={cityError} label="City" required helperText="Enter City" onChange={(e) => setCity(e.target.value)} />
                    </div>  {/* 4 th row */}
                    <div className='teachers-info-section '> <TextField value={age} sx={{ flex: 1 }} error={ageError} label="Age" type="number" equired helperText="Enter Age" onChange={(e) => setAge(e.target.value)} />
                      <DatePicker value={date} sx={{ flex: 1 }} error={dateError} format='DD/MM/YYYY' type="date" required helperText="Enter StartDate" onChange={(e) => setDate(e)} />
                      <TextField value={address} sx={{ flex: 1 }} error={addresError} label="Address" required helperText="Enter the Address" onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    {/*  5th row */}
                    <div className='teachers-info-section '>
                      <FormControl error={classIdsError} sx={{ m: 0, width: 410 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Classes</InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={classs}
                          onChange={handleClassChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.map((x) => x.class_name).join(', ')}
                          MenuProps={MenuProps}
                        >
                          {classes?.map((variant) => (
                            <MenuItem key={variant.class_id} value={variant}>
                              <Checkbox
                                checked={
                                  classs?.findIndex((item) => item.class_id === variant.class_id) >= 0
                                }
                              />
                              <ListItemText primary={variant.class_name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className='buttonSubmit'> <button>Submit</button>  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}


export default TeachersForm;