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
import "./Notifications.scss";

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
  {  field: 'id', headerName: 'Notification Id', width: 50, flex: 1, editable: false, headerAlign: "center", align: "center",},
  { field: 'parent_name', headerName: 'Parent Name', width: 50, flex: 1, editable: false, headerAlign: "center", align: "center", },
  { field: 'message', flex: 1, headerName: 'Message', width: 200, editable: false, headerAlign: "center", align: "center" }, 
  { field: 'created_on', headerName: 'Created On', width: 50, flex: 1, editable: false, headerAlign: "center", align: "center" },  
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

const installementNos = [
  {
    id: 1, installment_no:1
  },
  {
    id: 2, installment_no:2
  },
  {
    id: 3, installment_no:3
  },
]
const Notification = (props) => { 
  const [rows, setRows] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [installemtNo, setInstallmentNo] = useState("");

  let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = (localStorage.getItem("superadmin_school") === null) ? decodeToken.result.school_id : localStorage.getItem("superadmin_school");

  const isExpandedHandler = (value) => {
    setExpanded(value);
  }

  
 
  const getNotifications = () => {
    axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getAllNotification`)
    .then((data) => {  
      console.log(data.data);
      let allRows = [];
      for(let i = 0; i < data.data.notifications.length; i++){ 
        var tomorrow =  new Date(data.data.notifications[i].created_on);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let dateString = tomorrow.toISOString();
        let date = dateString.slice(8,10) + "-" + dateString.slice(5,7) + "-" + dateString.slice(0,4);
        data.data.notifications[i].created_on = date;
        allRows.push(data.data.notifications[i]);
      } 
      setRows(allRows); 
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
     getNotifications();
  },[]); 

  const NotificationHandler = async (e) => {
    e.preventDefault();
    if(installemtNo == ""){
        toast.error("Please select installment no.");
        return;
    }
    
    axios.post(`https://school-management-api.azurewebsites.net/schools/${school_id}/pushNotification`, {
      installment_no: installemtNo
    }).then((data) => { 
      getNotifications();
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
    }).catch((err) => {
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
    setInstallmentNo("");
  }

  const handleInstallmentChange = (e) => {  
    setInstallmentNo(e.target.value);   
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
              <span >Push Notification</span>
            </div>
            <form noValidate onSubmit={NotificationHandler}>
              <div className='teachers-info-detail-container'>
                <div className='teachers-info-detail-student-container'>
                  <div className='teachers-info-detail-student-container-subheading'>
                    <span>Installment Details</span>
                  </div>
                  <div className='teachers-info-detail-student-container-textfield'>
                    {/* row one */}
                    <div className='teachers-info-section '>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Installment No</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={installemtNo}  
                            label="Installment No."
                            onChange={handleInstallmentChange}
                        >
                        {
                            installementNos?.map((val) => {
                               return <MenuItem value={val.id}>{val.installment_no}</MenuItem>
                            })
                        }    
                        </Select>
                    </FormControl>                   
                    </div>     
                  </div>
                </div>
                <div className='buttonSubmit'> <button>Push</button>  </div>
              </div>
            </form>
          </div>
          <DataTable rows={rows} columns={columns}/>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default Notification;