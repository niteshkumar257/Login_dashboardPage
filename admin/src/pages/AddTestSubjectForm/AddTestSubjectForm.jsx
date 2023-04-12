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
import "./AddTestSubjectForm.scss";
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
 

const AddTestSubjectForm = (props) => {
  const [totalTestMarks, setTotalTestMarks] = useState({});
  const [alltest, setAllTest] = useState([]);
  const [classs, setClasss] = useState("");   
  const [testId, setTestId] = useState("");
  const [classes, setClasses] = useState([]);  
  const [subjectId, setSubjectId] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectIdError, setSubjectIdError] = useState(false);

  let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
  let school_id = (localStorage.getItem("superadmin_school") === null)?decodeToken.result.school_id:localStorage.getItem("superadmin_school");
  
  const AddTestSubjectHandler = (e) => {
    e.preventDefault();
    if(testId == ""){
      return toast.error("Test is required!");
    }
    if(classs == ""){
      return toast.error("Test is required!");
    }
    if(subject.length == 0){
      return toast.error("Subject is required!");
    }

    axios.post(`https://school-management-api.azurewebsites.net/schools/${school_id}/${classs}/updateTestTotalMarks`, {
      total_marks: totalTestMarks,
      test_id: testId
    }).then((data) => {
      toast.success("Data inserted successfully!");
      setClasss("");   
      setTestId(""); 
      setSubjectId([]);
      setSubject([]);
      setSubjects([]);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleClassChange = (e) => { 
    setClasss(e.target.value); 
  }

  const handleTestChange = (e) => { 
    setTestId(e.target.value); 
  }

  useEffect(() => {
    axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/tests`)
    .then((data) => { 
      setAllTest(data.data.testDetails);
    }).catch((err) => {
      console.log(err);
    })
  },[]);

  useEffect(() => { 
    axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getClassId`)
    .then((data) => { 
      let allClasses = [];
      for(let i = 0; i < data.data.class_id.length; i++){
        allClasses.push({class_id: data.data.class_id[i], class_name: data.data.class_name[i]});
      } 
      setClasses(allClasses);
    }).catch((err) => {
      console.log(err);
    })
  },[]);
  
  useEffect(() => {
    axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/${classs}/getClassSubjects`)
    .then((data) => {
      let allSubjects = [];
      console.log(data.data);
      for(let i = 0; i < data.data.subjects.length; i++){
        allSubjects.push({subject_id: data.data.subjects[i].subject_id, subject_name: data.data.subjects[i].subject_name});
      }  
      setSubjects(allSubjects);
    }).catch((err) => {
      console.log(err);
    })
  }, [classs]);

  const handleSubjectChange = (event) => {
    const {
        target: { value },
      } = event;
      
      let duplicateRemoved = [];
      let dataIds = [];
      value.forEach((item) => {
        if (duplicateRemoved.findIndex((o) => o.subject_id === item.subject_id) >= 0) {
          duplicateRemoved = duplicateRemoved.filter((x) => x.subject_id === item.subject_id);
        } else {
          duplicateRemoved.push(item);
        }
      }); 

      duplicateRemoved.forEach((item) => {
        dataIds.push(item.subject_id);
      });
      setSubjectId(dataIds);   
      let total = totalTestMarks; 
      console.log(total);
      console.log(dataIds);
      let va = Object.keys(total);
      va.forEach((key) => {
        if(dataIds.indexOf(parseInt(key)) == -1){  
          delete total[key];
        }
      }) 
      setTotalTestMarks(total); 
      setSubject(duplicateRemoved);
   }

   const handleChageTotalMarks = (test_id, value) => { 
    let total = totalTestMarks;
    total[test_id] = value;
    setTotalTestMarks(total);
   }  
 
 
  return (
    <div className='teachers-container '> 
      <div className='teachers'> 
        <div className='teachers-page page-container'>
          <div className="teacherForm-page-container">
            <div className='teacherForm-page-container-heading'>
              {/* header container */}
              <span >Add Test Subjects</span>
            </div>
            <form noValidate onSubmit={AddTestSubjectHandler}>
              <div className='teachers-info-detail-container'>
                <div className='teachers-info-detail-student-container'>
                  <div className='teachers-info-detail-student-container-subheading'>
                    <span>Subjects Marks Details</span>
                  </div>
                  <div className='teachers-info-detail-student-container-textfield'>
                    {/* row one */}
                    <div className='teachers-info-section'>                   
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" required>Test</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={testId}  
                            label="Class"
                            onChange={handleTestChange}
                        >
                        {
                            alltest?.map((val) => {
                               return <MenuItem value={val.test_id}>{val.test_name}</MenuItem>
                            })
                        }    
                        </Select>
                    </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" required>Class</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={classs}  
                            label="Class"
                            onChange={handleClassChange}
                        >
                        {
                            classes?.map((val) => {
                               return <MenuItem value={val.class_id}>{val.class_name}</MenuItem>
                            })
                        }    
                        </Select>
                    </FormControl>

                    <FormControl error={subjectIdError} fullWidth>
                          <InputLabel required id="demo-multiple-checkbox-label">Subjects</InputLabel>
                          <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              required
                              value={subject}
                              onChange={handleSubjectChange}
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.map((x) => x.subject_name).join(', ')}
                              MenuProps={MenuProps}
                          >
                              {subjects?.map((variant) => (
                                  <MenuItem key={variant.subject_id} value={variant}>
                                      <Checkbox
                                          checked={
                                              subject?.findIndex((item) => item.subject_id === variant.subject_id) >= 0
                                          }
                                      />
                                      <ListItemText primary={variant.subject_name} />
                                  </MenuItem>
                              ))}
                          </Select>
                     </FormControl>  
                    </div>  

                    <div className="grid-value">
                      {
                        subject?.map((val) => (
                          <div className="subject-values">
                            <h3>{val.subject_name}</h3>
                            <TextField
                              sx={{ flex: 1 }} 
                              label="Total Marks"
                              required
                              value={totalTestMarks[val.subject_id]}
                              defaultValue=""
                              onChange={(e) => { handleChageTotalMarks(val.subject_id, e.target.value) }}>                              
                            </TextField>
                          </div>
                        ))
                      }
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

export default AddTestSubjectForm;