import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import TextField from '@mui/material/TextField';
import { useState } from "react" 
import axios from "axios";
import jwt_decode from "jwt-decode";
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from "../../components/SuperAdminTable/SuperAdminTable"

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FileDownload, Sort } from '@mui/icons-material';
import "./MentorsForm.scss";

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

const columns = [
  { field: 'id',headerName:"", width:0,hide:true },
  { field: 'school_id', headerName: 'School Id', width: 50, flex: 1, editable: true, headerAlign: "center", align: "center", },
  { field: 'school_name', flex: 1, headerName: 'School Name', width: 200, editable: true, headerAlign: "center", align: "center" }, 
  { field: 'class', headerName: 'Class', width: 50, flex: 1, editable: true, headerAlign: "center", align: "center" },
  { field: 'class id', headerName: '', width: 50,editable: true,hide:true },
];

// const rows=[
//   {
//     id:1,school_name:"Vssut",class:12
//   },
//   {
//     id:2,school_name:"CET",class:14
//   },
//   {
//     id:3,school_name:"Nit Rkl",class:12
//   }
// ]
const AddCurriculum = (props) => { 
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); 
  const [isExpanded, setExpanded] = useState(false);
  const [mentor_name, setMentorName] = useState("");
  const [mentorNameError, setMentorNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [details, setDetails] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [detaisError, setDetailsError] = useState(false);

  const isExpandedHandler = (value) => {
    setExpanded(value);
  } 

  const AddMentorHandler = async (e) => {
    e.preventDefault();
    mentor_name.trim();
    email.trim();
    mobile.trim();
    details.trim();
    if(file == null){
        toast.error("Please select file");
        return;
    }
    if(mentor_name.length == 0){
        toast.error("Please enter mentor name!");
        return;
    }
    if(email.length == 0){
        toast.error("Please enter email!");
        return;
    }
    if(details.length == 0){
      toast.error("Please enter details!");
      return;
    }
    if(mobile.length != 10){
      toast.error("Please enter 10 digit mobile number!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    // mentor_name, gmail, details, mobile
    try{
       await axios.post(`https://school-management-api.azurewebsites.net/addMentor?mentor_name=${mentor_name}&gmail=${email}&details=${details}&mobile=${mobile}`,   
        formData,
       ).then(() => { 
            toast.success("Mentor added successfully");
        })
    }catch(err){
        toast.error("Something went wrong");
    }
    
    setFile(null);
    setFileName("");
    setMobile("");
    setEmail("");
    setDetails("");
    setMentorName("");
  }

  
  const handleFileChange = (e) => { 
    setFile(e.target.files[0]); 
    setFileName(e.target.files[0].name);
  } 

  const handleViewSelect=(school_id, class_id)=>
  {
    console.log(school_id, class_id);
     axios.get(`https://school-management-api.azurewebsites.net/viewCurriculum`, {
      params: {
        school_id: school_id,
        class_id: class_id
        }
     }).then(async (data) => {  
     await axios.get(data.data.url, {
      responseType: "blob"
     }).then((data) => { 
       const file = new Blob([data.data], { type: "application/pdf" });
       const fileURL = URL.createObjectURL(file); 
       const pdfWindow = window.open();
       pdfWindow.location.href = fileURL; 
    }); 
    })     
  }
  // const viewColumn = [
  //   {
  //     field: "view", headerName: "View Curriculum", width: 200, sortable: false,
  //     editable: false,
  //     flex: 1,
  //     renderCell: (params) => {
  //       return (
  //         <div className="viewButton">
  //           <button className='btn' onClick={() => handleViewSelect(params.row.school_id, params.row.class_id)} >View</button>
  //         </div>
  //       );
  //     },
  //   }
  // ]
  return (
    <div className='teachers-container '>
      <Sidebar isExpandedHandler={isExpandedHandler} />
      <div className='teachers'>
        <Navbar adminName={props.AdminName} />
        <div className='teachers-page page-container'>
          <div className="teacherForm-page-container">
            <div className='teacherForm-page-container-heading'>
              {/* header container */}
              <span >Add Mentor</span>
            </div>
            <form noValidate onSubmit={AddMentorHandler}>
              <div className='teachers-info-detail-container'>
                <div className='teachers-info-detail-student-container'>
                  <div className='teachers-info-detail-student-container-subheading'>
                    <span>Mentor Details</span>
                  </div>
                  <div className='teachers-info-detail-student-container-textfield'>
                    {/* row one */}
                    <div className='teachers-info-section '>
                        <TextField value={mentor_name} sx={{ flex: 1 }} label="Mentor Name" error={mentorNameError} required helperText="Enter Name" onChange={(e) => setMentorName(e.target.value)} />
                        
                        <TextField value={email} sx={{ flex: 1 }} label="Email" error={emailError} required helperText="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        <TextField value={mobile} sx={{ flex: 1 }} label="Mobile"   error={mobileError} required helperText="Enter mobile" onChange={(e) => setMobile(e.target.value)} />
                          
                    </div> 

                    
                    <div className='teachers-info-section '>
                        <TextField value={details} sx={{ flex: 1 }} label="Mentor Details" error={detaisError} multiline rows={4} required helperText="Enter details" onChange={(e) => setDetails(e.target.value)} />
                    </div>      

                    <div className='teachers-info-section '>
                     <form  > 
                        <Button
                            variant="contained"
                            component="label" 
                            >
                            Upload Photo
                            <input onChange={handleFileChange}
                                type="file"
                                hidden
                            />
                        </Button> {fileName}
                    </form>
                    </div>   
                  </div>
                </div>
                <div className='buttonSubmit'> <button>Submit</button>  </div>
              </div>
            </form>
          </div>
          {/* <DataTable rows={rows} columns={columns.concat(viewColumn)}/> */}
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default AddCurriculum;