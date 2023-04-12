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
import "./AddCurriculum.scss";

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
  const [school, setSchool] = useState(""); 
  const [classs, setClasss] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [rows, setRows] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }

  useEffect(() => {
    axios.get(`https://school-management-api.azurewebsites.net/schools`)
    .then((data) => {
      let allSchools = [];
      for(let i = 0; i < data.data.allSchool.length; i++){
        console.log(data.data.allSchool);
        allSchools.push({school_id: data.data.allSchool[i].id, school_name: data.data.allSchool[i].school_name});
      } 
      setSchools(allSchools);
    }).catch((err) => {
      console.log(err);
    })
  },[]);

  useEffect(() => {
    axios.get(`https://school-management-api.azurewebsites.net/schools/${school}/getClassId`)
    .then((data) => {
      console.log(data.data);
      let allClasses = [];
      for(let i = 0; i < data.data.class_id.length; i++){
        allClasses.push({class_id: data.data.class_id[i], class_name: data.data.class_name[i]});
      } 
      setClasses(allClasses);
    }).catch((err) => {
      console.log(err);
    })
  },[school]);

  const getCurriculums = () => {
    axios.get(`https://school-management-api.azurewebsites.net/getCurriculum`)
    .then((data) => { 
      // console.log(data.data.allCurriculum); 
      let allRows = [];
      for(let i = 0; i < data.data.allCurriculum.length; i++){
        data.data.allCurriculum[i].id = i+1;
        allRows.push(data.data.allCurriculum[i]);
      } 
      setRows(allRows); 
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
     getCurriculums();
  },[]);
  console.log(rows);

  const AddCurriculumHandler = async (e) => {
    e.preventDefault();
    if(file == null){
        toast.error("Please select file");
        return;
    }
    if(classs.length == 0){
        toast.error("Please select class");
        return;
    }
    if(school.length == 0){
        toast.error("Please select school");
        return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try{
       await axios.post(`https://school-management-api.azurewebsites.net/schools/${school}/updateCurriculum?class_id=${classs}`,   
        formData,
       ).then(() => {
            getCurriculums();
            toast.success("Curriculum added successfully");
        })
    }catch(err){
        toast.error("Something went wrong");
    }
    setClasss("");
    setSchool("");
    setFile(null);
    setFileName("");
  }

  const handleSchoolChange = (e) => {  
    setSchool(e.target.value);   
  } 

  const handleClassChange = (e) => {
    setClasss(e.target.value); 
  }

  const handleFileChange = (e) => { 
    setFile(e.target.files[0]); 
    setFileName(e.target.files[0].name);
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
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
      // openInNewTab(data.data.url);  
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
  const viewColumn = [
    {
      field: "view", headerName: "View Curriculum", width: 200, sortable: false,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="viewButton">
            <button className='btn' onClick={() => handleViewSelect(params.row.school_id, params.row.class_id)} >View</button>
          </div>
        );
      },
    }
  ]
  return (
    <div className='teachers-container '>
      <Sidebar isExpandedHandler={isExpandedHandler} />
      <div className='teachers'>
        <Navbar adminName={props.AdminName} />
        <div className='teachers-page page-container'>
          <div className="teacherForm-page-container">
            <div className='teacherForm-page-container-heading'>
              {/* header container */}
              <span >Add Curriculum</span>
            </div>
            <form noValidate onSubmit={AddCurriculumHandler}>
              <div className='teachers-info-detail-container'>
                <div className='teachers-info-detail-student-container'>
                  <div className='teachers-info-detail-student-container-subheading'>
                    <span>Curriculum Details</span>
                  </div>
                  <div className='teachers-info-detail-student-container-textfield'>
                    {/* row one */}
                    <div className='teachers-info-section '>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">School</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={school}  
                            label="Curriculum"
                            onChange={handleSchoolChange}
                        >
                        {
                            schools?.map((val) => {
                               return <MenuItem value={val.school_id}>{val.school_name}</MenuItem>
                            })
                        }    
                        </Select>
                    </FormControl>
                    {/*  */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={classs}  
                            label="Curriculum"
                            onChange={handleClassChange}
                        >
                        {
                            classes?.map((val) => {
                               return <MenuItem value={val.class_id}>{val.class_name}</MenuItem>
                            })
                        }    
                        </Select>
                    </FormControl>    
                    </div>      

                    <div className='teachers-info-section '>
                     <form  > 
                        <Button
                            variant="contained"
                            component="label"
                             
                            >
                            Upload File
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
          <DataTable rows={rows} columns={columns.concat(viewColumn)}/>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default AddCurriculum;