import React from 'react'
import "./Mentors.scss"
import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import DataTable from '../../components/DataTable/DataTable'
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Mentor from "../Mentor/Mentor.js"
import Mentor from '../Mentor/Mentor'


// columns  of the teacher Details table
const columns = [
  { field: 'id', headerName: 'Mentor Id', flex: 1, editable: false, align: "left", headerAlign: "left" },
  { field: 'mentor_name', headerName: 'Mentor Name', flex: 1, editable: false, headerAlign: "left", align: "left" },
  { field: 'gmail', headerName: 'Gmail', editable: true, flex: 1, editable: false, headerAlign: "left", align: "left" },
  { field: 'mobile', headerName: 'Mobile Number', flex: 1, editable: false, headerAlign: "left", align: "left" },
];
const Mentors = (props) => {
  const [rows, setRows] = useState([]); 
  let navigate = useNavigate();
  useEffect(() => { 
      axios.get(`https://school-management-api.azurewebsites.net/mentors`)
        .then((data) => { 
          console.log(data.data.mentors);
          let allMentors = [];
          for(let i = 0; i < data.data.mentors.length; i++){
              let mentor = {
                id: data.data.mentors[i].mentor_id,
                mentor_name: data.data.mentors[i].mentor_name,
                gmail: data.data.mentors[i].gmail,
                mobile: data.data.mentors[i].mobile,
                photo: data.data.mentors[i].photo
              }
              allMentors.push(mentor);
          }
          setRows(allMentors);  
        }).catch((err) => {
          console.log(err);
        })
    
  }, [])
 
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }

  const handleSelect = async (data) => {    
    // const file = new Blob([data.data], { type: "image/jpg" });
    // console.log(file);
    // const fileURL = URL.createObjectURL(file); 
    // const pdfWindow = window.open();
    // pdfWindow.location.href = fileURL; 
    const newTab = window.open();
    let base64File = await getBase64FromUrl(data); 
    newTab?.document.write(
    `<!DOCTYPE html><head><title>Profile image</title></head><body  margin="0px" width="1000px" height="948px"><img src="${base64File}"  marigin= "0px" width="1000px"   height="948px"></body></html>`);
    newTab?.document.close(); 
  }
  const viewColumn = [
    {
      field: "view", headerName: "Mentor Details", width: 200, sortable: false,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="viewButton">
            <button className='btn' onClick={() => handleSelect(params.row.photo)} >View</button>
          </div>
        );
      },
    }
  ]


  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  }
  return (
    <div className='teachers-container '>
      <Sidebar  />
      <div className='teachers'>
        <Navbar adminName={props.AdminName} />
        <div className='teachers-page page-container'>
          <div className='teacher-detail-heading'>
            <span>Mentor Details</span>
            <div className='teacher-detail-search'>
              <input type='number' placeholder='Search by id... ' />
              <input type='text' placeholder='Search by Name... ' />
              <input type='phone' placeholder='Search by Phone.. ' />
              <div className='teacher-detail-search-btn'>
                <button>
                  SEARCH
                </button>
              </div>
            </div>
          </div>
          <div className='table'>
          <Box sx={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
              marginBottom:5
            }}>
              {  <DataTable expandHandler={isExpanded} rows={rows} columns={columns.concat(viewColumn)} />
              }

            </Box>  
          <div className='newButton'>
            <Link to="/AddMentor">
              <button>Add new Mentor</button>
            </Link>
          </div> 
          </div>  
          <Mentor />
        </div>
      </div>

    </div>
  )
}

export default Mentors;
