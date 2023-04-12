import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import TextField from '@mui/material/TextField';
import { useState } from "react" 
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
import "./TestForm.scss";
import { DatePicker } from '@mui/x-date-pickers';
import AddTestSubjectForm from '../AddTestSubjectForm/AddTestSubjectForm';

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


const TestForm = (props) => {
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState("");

  const [testNameError, setTestNameError] = useState(false);
  const [testDateError, setTestDateError] = useState(false);

  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }

  let school_id = localStorage.getItem("superadmin_school");

  const AddTestHandler = (e) => {
    e.preventDefault();
    setTestNameError(false);
    setTestDateError(false);
    testName.trim(); 
    if(testName == ""){
      setTestNameError(true);
    }
    if(testDate == ""){
      setTestDateError(true);
    }

    if(!testNameError && !testDateError){
      axios.post(`https://school-management-api.azurewebsites.net/schools/${school_id}/tests`, {
       test_name: testName, 
       test_date: testDate        
      }).then((data) => {
        toast.success("Test Added Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch((err) => {
        toast.error("Database error!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });      
    }else{
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } 
    setTestName("");
    setTestDate("");
    setTestNameError(false);
    setTestDateError(false);
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
              <span >Add Test</span>
            </div>
            <form noValidate onSubmit={AddTestHandler}>
              <div className='teachers-info-detail-container'>
                <div className='teachers-info-detail-student-container'>
                  <div className='teachers-info-detail-student-container-subheading'>
                    <span>Test Details</span>
                  </div>
                  <div className='teachers-info-detail-student-container-textfield'>
                    {/* row one */}
                    <div className='teachers-info-section '>
                      <TextField value={testName} sx={{ flex: 1 }} label="Test Name" error={testNameError} required helperText="Enter Test Name" onChange={(e) => setTestName(e.target.value)} />
                      <DatePicker value={testDate} sx={{ flex: 1 }} error={testDateError} variant="outlined" format="DD/MM/YYYY" helperText="Select Date Of Test" type="date" onChange={(e) => setTestDate(e)} />
                      {/* <TextField value={email} sx={{ flex: 1 }} label="Email" helperText="Enter Email" error={emailError} required type="email" onChange={(e) => setEmail(e.target.value)} /> */}

                    </div>      
                  </div>
                </div>
                <div className='buttonSubmit'> <button>Submit</button>  </div>
              </div>
            </form>
          </div>
        </div>
      <AddTestSubjectForm />
      </div>
      <ToastContainer />
    </div>

  )
}

export default TestForm;