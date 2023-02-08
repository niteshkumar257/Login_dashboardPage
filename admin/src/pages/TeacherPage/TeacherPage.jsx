import {useState, useEffect} from 'react'
import "./TeacherPage.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import StudentImage from "../../assest/s1.png";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from "../../components/Table/TableFee"
import { ConstructionOutlined, SocialDistance } from '@mui/icons-material';
import { FaBlackTie } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField ,Stack,MenuItem} from '@mui/material';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';

const Month = [
  {
    value: 'Jan',
    label: 'Jan',
  },
  {
    value: 'Feb',
    label: 'Feb',
  },
  {
    value: 'March',
    label: 'March',
  },
  {
    value: 'April',
    label: 'April',
  },
  {
    value: 'May',
    label: 'May',
  },
  {
    value: 'June',
    label: 'July',
  },
  {
    value: 'Aug',
    label: 'Aug',
  },
  {
    value: 'Sep',
    label: 'Sep',
  },
  {
    value: 'Oct',
    label: 'Oct',
  },
  {
    value: 'Nov',
    label: 'Nov',
  },
  {
    value: 'Dec',
    label: 'Dec',
  },
  


];
const Year=[
 { value:"2020",
  label:"2020"},
  { value:"2021",
  label:"2021"},
  { value:"2022",
  label:"2022"},
  { value:"2023",
  label:"2023"},
  { value:"2024",
  label:"2024"}
]


const columns = [
  { field: 'id', headerName: 'SI.No', width: 150, headerAlign:"left", align:"left",flex:1,sortable:false },
  {field: 'Month',headerName: 'Month',width: 150,editable:false,headerAlign:"left",align:"left",
  sortable:false,flex:1},
  {field: 'Year',headerName: 'Year',type: 'number',width: 150,editable:false,headerAlign:"left",
  sortable:false,flex:1,
  align:"left"},
  {field: 'Amount',headerName: 'Amount',type: 'number',width: 150,editable:false,headerAlign:"left",
  sortable:false,flex:1,
  align:"left"},
 
 
];

const rows = [
  { id: 1, Month: 'Jan',Year:"2002",Amount:1000 },
  { id: 2, Month: 'March',Year:"2004" ,Amount:2000},
  { id: 3, Month: 'Feb',Year:"2006" ,Amount:3000},
 
 
];

const SingleTeacherPage = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:400,
    bgcolor: 'background.paper',
    border: 'none',
    
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () =>
  {
    console.log("button is cliekc");
    setOpen(true);
  } 
  const handleClose = () => setOpen(false);
  
  let params = useParams();
  const [name,setName]=useState("Nitesh Kumar Reddy");
  const [medium,setMedium]=useState("English");
  const [email,SetEmail]=useState("niteshredd257@gmail.com");
  const [age,setAge]=useState(23);
  const [salary,setSalary]=useState(10000);
  const [City,setCity]=useState("Ambikar Pur");
  const [workExp,setWorkExp]=useState(10);
  const [AadharCard,setAadharCard]=useState("1989300192");
  const [date,setDate]=useState("12/10/23");
  const [gender,setGender]=useState("Male");



  // salary update useState variable
  const [year,setYear]=useState("");
  const [month,setMonth]=useState("");
  const [amount,setAmount]=useState("");

  const [yearError,setYearError]=useState(false);
  const [monthError,setMonthError]=useState(false);
  const [amountError,setAmountError]=useState(false);


  // salary update useState variable
  let teacher_id = params.teacherId;
  

  /// new column for update status


const salaryUpdate=(id)=>
{
    console.log(id);
}
  const updateColumn=[
    {
      field:"view",
      headerName:"Update",
      width:200,
      editable:false,
      sortable:false,
    align:"left",
    headerAlign:"left",
    flex:1,
      renderCell: (params) => {
        return (
          <div className="viewButton">
            {/* <Link   to= {`/Student/${studentId}`} style={{ textDecoration: "none" }}> */}
             <button  onClick={() => salaryUpdate(params.row.id)}  >Update</button>
            {/* </Link> */}
           
          </div>
        );
      },
    }
  ]


const submitHandler=(e)=>
{
  e.preventDefault();
  setYearError(false);
  setMonthError(false);
  setAmountError(false)
 
  // 
 
  if(year =='') 
  {
    setYearError(true);
  }
  if(month=='')
  { 
    setMonthError(true);
  }
  if(amount=='') 
  {
    setAmountError(true);
  }
  if(year.length!=0 && month.length!=0 && amount.length!=0 ){
   
    setAmount("")
 setYear("");
 setMonth("");
 const answer = window.confirm("are you sure?");
      
    
   
    setOpen(false);
 
  }
 
  
 
  

}

  

  useEffect(() => {
    axios.get(`http://localhost:8080/teacher/${teacher_id}`)
    .then((data) => {

      setName(data.data.teacherDetails[0].teacher_name);
      SetEmail(data.data.teacherDetails[0].email);
      setAge(data.data.teacherDetails[0].age);
      setSalary(data.data.teacherDetails[0].salary);
      setCity(data.data.teacherDetails[0].city);
      setWorkExp(data.data.teacherDetails[0].experience);
      setGender(data.data.teacherDetails[0].gender);
    }).catch((err) => {
      console.log(err);
    })
  },[])
  return (
    <div className='SingleTeacherPage-container '>
    <Sidebar/>
    <div className='SingleTeacher'>
        <Navbar  adminName={props.AdminName}/>
        <div className='SingleTeacher-page page-container'>
        <div className='student-info-main-container'>
    <div className='student-info-heading'>
      <h1> Teacher Details</h1>
    </div>
    <div className="section basic-info">
    
   
    <div className="basic-info-right">
      <div className='student-Name'>
        <span >{name}</span>
      </div>
      <div className='other-info-container'>
        <div className='other-detail-info-container page-container'>
          <div className='student'>
           
            <span className='label'
            style={{color:"#1378c09a", fontSize: ".9rem"}}
            > Medium :</span>
            <span>{medium}</span>
          </div>
          <div className='student'>
            <span className='lable'> Email :</span>
            <span>{email}</span>
          </div>
          <div className='student'>
            <span className='lable'> Work-Experinece :</span>
            <span>{workExp}</span>
          </div>
        
        </div>
        <div className='other-detail-info-container'>
        <div className='student'>
            <span className='lable'>
              Age :
            </span>
            <span>{age}</span>
          </div>
          <div className='student'>
            <span className='lable'>Gender :</span>
            <span>{gender}</span>
          </div>
          <div className='student'>
            <span className='lable'>Salary :</span>
            <span>{salary}</span>
          </div>
         
        </div>
        <div className='other-detail-info-container'>
        <div className='student'>
            <span className='lable'>
              Start Date :
            </span>
            <span>{date}</span>
          </div>
          <div className='student'>
            <span className='lable'>City :</span>
            <span>{City}</span>
          </div>
          <div className='student'>
            <span className='lable'>Aadhar Number :</span>
            <span>{AadharCard}</span>
          </div>
         
        </div>
      </div>
    </div>
   </div>
   <div 
   className='student-salary-container'
   style={{
    width:"98%",
   }}
   >
    <div className='student-salary-container-heading'>
      <h1>Salary Details</h1>
     
    
       </div>
       <div className='student-info-container-body'>
       <Table  rows={rows} columns={columns}/>
       
       </div>
       <div  className='btn'>
       <button onClick={handleOpen}>Update Salary</button>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form  noValidate onSubmit={submitHandler}>

        
        <Box sx={style} >
            <div style={{
                display:"flex",
                flexDirection:"column",
                rowGap:20
            }}>
            <div>
            <Stack    spacing={3}>
              <div>
                <span>Salary update</span>
              </div>
          <TextField sx={{ flex:1 }} error={monthError}   required  select  label="Month"    onChange={(e)=>setMonth(e.target.value)}  helperText="Select Month">
              {Month.map((option) => (
                <MenuItem key={option.value} value={option.value}>
               {option.label}
               </MenuItem>
               ))}
              </TextField>
              <TextField  sx={{ flex:1 }}  error={yearError}  required   select  label="year"  onChange={(e)=>setYear(e.target.value)}  helperText="Select year">
              {Year.map((option) => (
                <MenuItem key={option.value} value={option.value}>
               {option.label}
               </MenuItem>
               ))}
              </TextField>
              <TextField sx={{ flex:1 }}  error={amountError}   required   label="Amount"   onChange={(e)=>setAmount(e.target.value)}  helperText="Enter Amount" />
                 
        
               
            
</Stack>
            </div>
        
            <div style={{
         display:"flex",
         justifyContent:"flex-end"
       }}>
        <button
        // onClick={()=>handleClose()}
        // onClick={scoreHandler}
         style={{
         
            width:150,
            height:54,
            backgroundColor:"#08B3F3 ",
            border:"none",
            borderRadius:9,
            color:"white",
            fontSize:"1rem",
          fontWeight:600,
            cursor:"pointer"
        }}>Submit</button>
       </div>
            </div>
           
        </Box>
        </form>
          
        
      </Modal>
       </div>
     
      

   </div>
    </div>
    </div>
    
  
    </div>
   </div>
  )
}

export default SingleTeacherPage