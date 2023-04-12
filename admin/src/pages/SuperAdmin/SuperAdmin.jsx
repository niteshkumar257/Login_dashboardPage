import React from 'react'
import DataTable from "../../components/SuperAdminTable/SuperAdminTable"
// import Navbar from "../../components/SuperAdminNavbar/SuperNavbar"
import "./SuperAdmin.scss";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from "../../components/Navbar/Navbar";
import jwt_decode from "jwt-decode";


const ChangeDataFormat=(data)=>
{
  const newData = [];

for (const school of data) {
  const schoolCopy = { ...school }; 
  let adminName = schoolCopy.admin_name;
  adminName = adminName
    .split("_")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
  schoolCopy.admin_name = adminName.replace(/_/g, "");
  newData.push(schoolCopy);
}

return newData;
}
const columns=[
{ field: 'id', headerName: 'Serial', width: 90,flex:1 ,headerAlign:"center",
align:"center",},

{
  field: 'school_name',
  headerName: 'SchoolName',
  width: 150,
  editable: true,
  headerAlign:"center",
  align:"center",
  flex:1,
  
},
{
  field: 'city_name',
  headerName: 'City',
  width: 150,
  editable: true, 
  headerAlign:"center",
  align:"center",
  flex:1
},
{
  field: 'admin_name',
  headerName: 'Owner',
  type: 'number',
  width: 110,
  editable: true,
  headerAlign:"center",
  align:"center",
  flex:1
},
{
    
  field: 'mobile',
  headerName: 'Phone Number',
  
  sortable: false,
  headerAlign:"center",
  align:"center",
  flex:1,
  
},
];


  
const SuperAdmin = () => {
  const [schoolData,SetSchoolData]=useState([]);
  const [rows,setRows]=useState([]);
  const navigate = useNavigate();
  const handleSelect = (id) => { 
    localStorage.setItem("superadmin_school", id);
    navigate(`/dashboard`);
   
  }
   let decodeToken = jwt_decode(localStorage.getItem("auth_token")); 

let school_id=(decodeToken.result.school_id);
console.log(school_id);
 
  const viewColumn = [
    {
      field: "view", headerName: "School Details", width: 200, editable: false, sortable: false, align: "left", headerAlign: "left",
      flex: 1,
      disableFilter: true,
      renderCell: (params) => {
        return (
          <div className="viewButton">
            <button onClick={() => handleSelect(params.row.id)}  >View</button>
          </div>
        );
      },
    }
  ]
    useEffect(() => {
        axios.get(`https://school-management-api.azurewebsites.net/schools`,{headers: { 'Content-Type': 'application/json'}}).then((res) => {
           const data=res.data.allSchool;
           const newData=ChangeDataFormat(data);
           console.log(newData);
             setRows(newData);  
         axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}`).then((data) => {
          console.log(data);
         })
        
        }) 
     }, []);
    
  return (
    <div className='superAdmin-container'>
      <Sidebar/>
        <div className='superAdmin'>
          <Navbar adminName={"SuperAdmin"}/>
        <div className='superAdmin-page page-container'>
          <div className='superAdmin-container-search'>
            <span>School Details</span>
            <div className="superAdmin-detail-search">
              <input type='number' placeholder='search by school_wise ....' />
              <div className="superAdmin-detail-search-btn">
                <button className='btn'>SEARCH</button>
              </div>
            </div>
          </div>
          <div>
          <DataTable rows={rows} columns={columns.concat(viewColumn)}/>
          </div>
           
        </div>
        </div>
       
    </div>
  )
}

export default SuperAdmin;