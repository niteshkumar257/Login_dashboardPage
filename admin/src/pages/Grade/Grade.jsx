import React from 'react'
import "./Grade.scss"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import DataTable from '../../components/DataTable/DataTable'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState,useEffect } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { Co2Sharp, LensTwoTone } from '@mui/icons-material'
import { MenuItem } from '@mui/material'


const Test = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
]
const subject_list=[
  {
    value:"Physics",
    label:"physics"
  },
  {
    value:"Chemistry",
    label:"Chemistry"
  },
  {
    value:"Biology",
    label:"Biology"
  },
  
]
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:"auto",
  bgcolor: 'background.paper',
  border: 'none',
  display:"flex",
  flexDirection:"column",
  rowGap:"30px",
  borderRadius: 3,
     boxShadow: "0 2px 4px rgb(0 0 0 / 4%), 0 4px 8px rgb(0 0 0 / 4%)",
     backdropFilter: "blur(5px)",
  p: 4,

};
const columns = [
  { field: 'id', headerName: 'SI.No',
  //  width: 150,
   flex:1,align:"left",headerAlign:"left"},
  {
    field: 'student_name',
    headerName: 'Name',
    // width: 150,
    editable:false,
    flex:1,
    headerAlign:"left",
    align:"left",
    // disableColumnMenu:true,
    // sortable:false
  },
 
  {
    field: 'class_id',
    headerName: 'Class',
    type: 'number',
    // width: 150,
    editable: false,
    flex:1,
    headerAlign:"left",
    align:"left",
  },
  {
    field: 'medium',
    headerName: 'Medium',
    editable:false,
   align:"left",
   headerAlign:"left",
    // width: 150,
    flex:1,
    // headerAlign:"center",
    // align:"center",
   
  },
];


// const subject_list=[
//   {
//     value:"p",
//     lable:"p"
//   },
//   {
//     value:"chem",
//     lable:"chem"
//   },
//   {
//     value:"bio",
//     lable:"bio"
//   },
  
// ]

// const rows = [
//   { id: 1, student_name: 'Nitesh', class_id:7, medium: "English" },
//   { id: 2, student_name: 'Nitesh', class_id:7, medium: "English" },
//   { id: 3, student_name: 'Nitesh', class_id:7, medium: "English"},
//   { id: 4, student_name: 'Nitesh', class_id:7, medium: "English"},
//   { id: 5, student_name: 'Nitesh', class_id:7, medium: "English" },
//   { id: 6, student_name: 'Nitesh', class_id:7,medium: "English" },
//   { id: 7, student_name: 'Nitesh', class_id:7, medium: "English"},
//   { id: 8, student_name: 'Nitesh', class_id:7, medium: "English"},

const Rows = [
  { id: 1, student_name: 'Nitesh', class_id:7, medium: "English" },
  { id: 2, student_name: 'Nitesh', class_id:7, medium: "English" },
  { id: 3, student_name: 'Nitesh', class_id:7, medium: "English"},
  // { id: 4, student_name: 'Nitesh', class_id:7, medium: "English"},
  // { id: 5, student_name: 'Nitesh', class_id:7, medium: "English" },
  // { id: 6, student_name: 'Nitesh', class_id:7,medium: "English" },
  // { id: 7, student_name: 'Nitesh', class_id:7, medium: "English"},
  // { id: 8, student_name: 'Nitesh', class_id:7, medium: "English"},

 
];
const Grade = (props) => {
  const [rows, setRows] = useState(Rows);
  let decode = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = decode.result.school_id;

  useEffect(() => {
    
    axios.get(`http://localhost:8080/schools/${school_id}/allstudent`)
    .then((data) => { 
      setRows(data.data.allStudent);
    }).catch((err) => {
      console.log(err);
    })
 
  },[])

  
  
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState([]);
  const [student_id, setStudentId] = useState();
  const [showButton,setShowButton]=useState(0);
  const handleOpen = (student_id) => {
    setOpen(true);  
     console.log(student_id)
    setStudentId(student_id);
    axios.get(`http://localhost:8080/schools/${school_id}/tests`)
    .then((data) => {  
      setTest(data.data.testDetails);
      setShowButton(1);
    }).catch((err) => {
      console.log(err);
    })
  } 
  const handleClose = () =>{
    setShowButton(0);
    setOpen(false);
    setSubjectList([]);
    setTestid(0);
  } 
  const [testid,setTestid]=useState(0);

  let [obtained,setObtained] = useState([]);
  const [mark,setMark]=useState(0);
  


 


  // mark upload handler
  const [tempRow, setTempRow] = useState([]);
  const markUploadHandler=(e)=>
  {
    
  
      e.preventDefault();

      pushMarks(testid);
  }

   
  const [subject_list, setSubjectList] = useState([]);

  const pushMarks = (test_id) => {   
      axios.post(`http://localhost:8080/students/${student_id}/tests/${test_id}/uploadmarks`, {
        inputField
      }).then((data) => {
      setOpen(false)
        alert("Marks uploaded successfully");
      }).catch((err) => {
        console.log(err);
      })
  }
  
  const getSubjects = (test_id) =>{
    
    axios.get(`http://localhost:8080/student/${student_id}/getSubjects`)
    .then((data) => { 
      setSubjectList(data.data.allSubjects);
      console.log(subject_list);
      data.data.allSubjects.map((item)=>
      { 
           const data={
            mark_obtained:"",
            total_marks:"", 
            subject_id:item.subject_id
           }
           tempRow.push(data);             
      }) 
    }).catch((err) => {
      console.log(err);
    })
  }
  // console.log(subject_list)
  const [inputField,setInputField]=useState(tempRow)
  
      const changeHandler=(index,e)=>
      {
       // console.log(e.target.value);

      
          let data=[...inputField];
          console.log(e.target.name);
          data[index][e.target.name]=e.target.value;
       console.log(data);
          setInputField(data);
          
        
      }
       
  console.log(inputField)
  // mark upload handler
   
  const UpdateColumn=[
    {
      field:"view",
      headerName:"Student Details",
      width:200,
      sortable:false,
    // align:"center",
    // headerAlign:"center",
     disableColumnMenu:true,
      renderCell: (params) => {
        return (
          <div>
            <div className="UpdateButton">
            <button onClick={() => {handleOpen(params.row.id)}} >Update</button>
            </div>
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{style: {backgroundColor: 'rgba(255, 255, 255, 0)'}}}
        sx={{backdropFilter: "blur(.25px)"}}>
        <form  onSubmit={markUploadHandler}>
        <Box sx={style}>
        
          <div className='form-container'>
            <div className='heading'>
              <span>Mark Upload</span>
            </div>
            <div className='test_id_select'>
            <TextField
                 sx={{flex:1}}
                  select
                 label="Test ID"
 
                 required
                 onChange={(e)=>{setTestid(e.target.value); getSubjects(testid)}}>
                {test.map((option) => (
                <MenuItem key={option.test_id} value={option.test_id}>
               {option.test_id}
               </MenuItem>
               ))}
              </TextField>
            </div>
            <div className='modal-subject-main-container'>
            {
        subject_list.map((item,index)=>(
          <div key={index} className='modal-subject-container'  >
           <div className='container'>
            <span>{item.subject_name}:</span>
           </div>
           <div>
           <TextField
           name="mark_obtained"
           value={tempRow[index].name}
           onChange={(e)=>changeHandler(index,e)}
             required label="Mark Obtained" variant="outlined" />
            </div>   
            <div>
            <TextField 
            name="total_marks"

            value={tempRow[index].name}
            onChange={(e)=>changeHandler(index,e)}
             required  label="Total Mark" variant="outlined" />
            </div>         


     </div>
        ))
       }
       {
        showButton==1 &&  <div className='form-button-submit'>
        <button>Submit</button> 
       </div>
       }
       
            </div>
          </div>

        </Box>

        </form>

      </Modal>
    </div>

        );
      },
    }
  ]
  return (
   <div className='grade-container ' >
    <Sidebar/>
    <div className='grade'>
        <Navbar adminName={props.AdminName} />
        <div className='grade-page page-container'>
        <div className="grade-detail-heading">
            <span>Mark  Details</span>
            <div className="grade-detail-search">
              <input type='number' placeholder='search by class-wise ....'/>
              <div className="grade-detail-search-btn">
                <button className='btn'>SEARCH</button>
              </div>
            </div>
          </div>
         
            <Box sx={{style}}>
            <DataTable 
          
           rows={rows} columns={columns.concat(UpdateColumn)}/>
            </Box>
           
          
        </div>
    </div>
   </div>
  )
}

export default Grade
