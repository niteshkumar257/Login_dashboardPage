import React, {useState, useEffect} from 'react' 
import DataTable from "../../components/SuperAdminTable/SuperAdminTable"
import axios from 'axios';
import "./Mentor.scss"

const columns = [
    { field: 'id', headerName: '', width: 0, flex: 0},
    { field: 'mentor_id', headerName: 'Mentor Id', width: 50, flex: 1, headerAlign: "left", align: "left", },
    { field: 'mentor_name', flex: 1, headerName: 'Mentor Name', width: 200, editable: true, headerAlign: "left", align: "left" }, 
    // { field: 'school_name', headerName: 'School Name', width: 50, flex: 1, editable: false, headerAlign: "left", align: "left" },
    { field: 'parent_name', headerName: 'Parent Name', editable: false, width: 200, flex: 1, headerAlign: "left", align: "left" },
    { field: 'request_date', headerName: 'Request Date', editable: false, width: 150, flex: 1, headerAlign: "left", align: "left" },
    { field: 'schedule_date', headerName: 'Schedule Date', editable: false, width: 150, flex: 1, headerAlign: "left", align: "left" },
    { field: 'status', headerName: 'FullFill', editable: false, width: 150, flex: 1, headerAlign: "left", align: "left" },
  ];

const Mentor = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => { 
    axios.get(`https://school-management-api.azurewebsites.net/allMentorSchedule`)
    .then((data) => {
      const allSchedules = data.data.allMentorSchedule; 
      const arrangedSchedules = [];
      console.log(allSchedules);
      let cnt = 0; 
      allSchedules?.forEach((schedule) => {
        const parent_name = schedule.father_name; 
      
        for(let j = 0; j < schedule.mentor_id.length; j++){
          cnt++; 
          let scheduleObj = {
            id: cnt,
            mentor_id: schedule.mentor_id[j],
            mentor_name: schedule.mentor_name[j],
            parent_name: parent_name,
            request_date:  schedule.request_date[j].slice(8,10) + '-' + schedule.request_date[j].slice(5,7) + '-' + schedule.request_date[j].slice(0,4) + " : "+schedule?.request_date[j].slice(11,19),
            schedule_date: (schedule.schedule_date == null || schedule.schedule_date[j] == undefined)? "-": schedule.schedule_date[j].slice(8,10) + '-' + schedule.schedule_date[j].slice(5,7) + '-' + schedule.schedule_date[j].slice(0,4) + " : "+schedule.schedule_date[j].slice(11,19),
            status: (schedule.schedule_date == null || schedule?.schedule_date[j] == undefined)? "False": "True"
          }
          arrangedSchedules.push(scheduleObj);
        } 
      })   
      setRows(arrangedSchedules);
    }).catch((err) => {
      console.log(err);
    })
  },[]);
  return (
    <div className='notification-container'>
    <div className='notification'> 
        <span className='notification-heading'>Mentor Schedules</span>
        <div className='notification-page page-container'>
        <DataTable rows={rows} columns={columns} /> 
    </div> 
    </div> 
   </div>
  )
}

export default Mentor;