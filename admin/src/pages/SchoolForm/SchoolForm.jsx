import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import TextField from '@mui/material/TextField';
import { useState } from "react"
import "./SchoolForm.scss"
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

const mediums = [
    {
        medium_id: 1,
        medium_name: 'English'
    },
    {
        medium_id: 2,
        medium_name: 'Hindi'
    }
];

const courses = [
    {
        course_id: 1,
        course_name: "PRE-FOUNDATION"
    },
    {
        course_id: 2,
        course_name: "JEE-11"
    },
    {
        course_id: 3,
        course_name: "JEE-12"
    },
    {
        course_id: 4,
        course_name: "NEET-11"
    },
    {
        course_id: 5,
        course_name: "NEET-12"
    },
];

const Board = [
    {
        board_id: 1,
        board_name: "CBSE"
    },
    {
        board_id: 2,
        board_name: "ICSE"
    },
    {
        board_id: 3,
        board_name: "STATE BOARD"
    },
];

const classes = [
    {
        class_id: -1,
        class_name: "PRE-KG1"
    },
    {
        class_id: -2,
        class_name: "PRE-KG2"
    },
    {
        class_id: 1,
        class_name: "1"
    },
    {
        class_id: 2,
        class_name: "2"
    },
    {
        class_id: 3,
        class_name: "3"
    },
    {
        class_id: 4,
        class_name: "4"
    },
    {
        class_id: 5,
        class_name: "5"
    },
    {
        class_id: 6,
        class_name: "6"
    },
    {
        class_id: 7,
        class_name: "7"
    },   
    {
        class_id: 8,
        class_name: "8"
    },
    {
        class_id: 9,
        class_name: "9"
    },
    {
        class_id: 10,
        class_name: "10"
    },
    {
        class_id: 11,
        class_name: "11"
    },
    {
        class_id: 12,
        class_name: "12"
    }
];
 
const subjects = [
    {
        subject_id: 1,
        subject_name: "Physics"
    },
    {
        subject_id: 2,
        subject_name: "Chemistry"
    },
    {
        subject_id: 3,
        subject_name: "Math"
    },
    {
        subject_id: 4,
        subject_name: "Biology"
    },
    {
        subject_id: 5,
        subject_name: "Hindi"
    },
    {
        subject_id: 6,
        subject_name: "English"
    },
    {
        subject_id: 7,
        subject_name: "SST"
    },
    {
        subject_id: 8,
        subject_name: "Sanskrit"
    },
    {
        subject_id: 9,
        subject_name: "Mental Ability"
    },
    {
        subject_id: 10,
        subject_name: "Spoken English"
    },
    {
        subject_id: 11,
        subject_name: "Arts"
    },
    {
        subject_id: 12,
        subject_name: "Commerce"
    },
    {
        subject_id: 13,
        subject_name: "Agriculture"
    },
    {
        subject_id: 14,
        subject_name: "Science"
    }
]; 
// Phy,Chem, Math, Bio, Hindi, English, SST, Sanskirt, Mental Abitlity, Spoken English, Arts, Commerce, Agriculture, Science



const SchoolForm = (props) => {
    {/* school_name, city_name, admin_name, email, mobile, course_id, medium_id, board_id, class_id */ }
    const [school_name, setSchoolName] = useState("");
    const [city_name, setCityName] = useState("");
    const [admin_name, setAdminName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [course, setCourse] = useState([]);
    const [medium, setMedium] = useState([]);
    const [board, setBoard] = useState([]);
    const [classs, setClasss] = useState([]);
    const [courseId, setCourseId] = useState([]);
    const [mediumId, setMediumId] = useState([]);
    const [boardId, setBoardId] = useState([]);
    const [classsId, setClasssId] = useState([]);
    const [subjectId, setSubjectId] = useState([]);
    const [subject, setSubject] = useState([]);

    const [schoolnameError, setSchoolnameError] = useState(false);
    const [citynameError, setCityNameError] = useState(false);
    const [adminnameError, setAdminNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [courseIdError, setCourseIdError] = useState(false);
    const [mediumIdError, setMediumIdError] = useState(false);
    const [boardIdError, setBoardIdWError] = useState(false);
    const [classsIdError, setClasssIdError] = useState(false);
    const [subjectIdError, setSubjectIdError] = useState(false);

    const [isExpanded, setExpanded] = useState(false);
    const isExpandedHandler = (value) => {
        setExpanded(value);
    }
 

    const handleMediumChange = (event) => {
        const {
            target: { value },
          } = event;
          
          let duplicateRemoved = [];
          let dataIds = [];
          value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o.medium_id === item.medium_id) >= 0) {
              duplicateRemoved = duplicateRemoved.filter((x) => x.medium_id === item.medium_id);
            } else {
              duplicateRemoved.push(item);
            }
          }); 
          duplicateRemoved.forEach((item) => {
            dataIds.push(item.medium_id);
          });
          setMediumId(dataIds);
          setMedium(duplicateRemoved);
    }

    const handleBoardChange = (event) => {
        const {
            target: { value },
          } = event;
          
          let duplicateRemoved = [];
          let dataIds = [];
          value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o.board_id === item.board_id) >= 0) {
              duplicateRemoved = duplicateRemoved.filter((x) => x.board_id === item.board_id);
            } else {
              duplicateRemoved.push(item);
            }
          }); 

          duplicateRemoved.forEach((item) => {
            dataIds.push(item.board_id);
          });
          setBoardId(dataIds);
      
          setBoard(duplicateRemoved);
    }

    const handleClassChange = (event) => {
        const {
            target: { value },
          } = event;
          
          let duplicateRemoved = [];
          let dataIds = [];
          value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o.class_id === item.class_id) >= 0) {
              duplicateRemoved = duplicateRemoved.filter((x) => x.class_id === item.class_id);
            } else {
              duplicateRemoved.push(item);
            }
          }); 

          duplicateRemoved.forEach((item) => {
            dataIds.push(item.class_id); 
          });                     
          setClasssId(dataIds);      
          setClasss(duplicateRemoved);
    }

    const handleCourseChange = (event) => {
        const {
            target: { value },
          } = event;
          
          let duplicateRemoved = [];
          let dataIds = [];
          value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o.course_id === item.course_id) >= 0) {
              duplicateRemoved = duplicateRemoved.filter((x) => x.course_id === item.course_id);
            } else {
              duplicateRemoved.push(item);
            }
          }); 

          duplicateRemoved.forEach((item) => {
            dataIds.push(item.course_id);
          });  
          setCourseId(dataIds);
          setCourse(duplicateRemoved);
    }

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
          setSubject(duplicateRemoved);
    }
    // API CALLS 

   
    const AddSchoolHandler = (e) => {
        e.preventDefault(); 
        setClasssIdError(false);
        setBoardIdWError(false);
        setMediumIdError(false);
        setCourseIdError(false);
        setAdminNameError(false);
        setCityNameError(false);
        setSchoolnameError(false); 
        setEmailError(false);
        setMobileError(false);
        setSubjectId(false);

        school_name.trim();
        city_name.trim();
        admin_name.trim();
        email.trim();
        classsId.sort();
        
        if (school_name.length == 0) {
           toast.error("school name required!");
           return;
        }
        if (city_name.length == 0) {
            toast.error("city name required!");
            return;
        }
        if(admin_name.length == 0){
            toast.error("Admin name required!");
            return;
        }
        if(email.length == 0){
           toast.error("Email address required!");
           return;
        }
        if(mobile.length != 10){
            toast.error("Mobile number should be 10 digits!");
           return;
        } 
        if(courseId.length == 0){
            toast.error("Courses name required!");
            return;
        }
        if(mediumId.length == 0){
           toast.error("Medium name required!");
           return;
        }
        if(boardId.length == 0){
            toast.error("Board name required!");
           return;
        }
        if(classsId.length == 0){
           toast.error("Class name required!");
           return;
        }


     
       axios.post("https://school-management-api.azurewebsites.net/addSchool", {
        school_name: school_name,
        city_name: city_name,
        admin_name: admin_name,
        email: email,
        mobile: mobile,
        course_id: courseId,
        medium_id: mediumId,
        board_id: boardId,
        class_id: classsId,
        subject_id: subjectId
    }).then((data) => {
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
        console.log(err);
    });  
   
      setAdminName("");
      setSchoolName("");
      setCityName("");
      setEmail("");
      setMobile(""); 
      setBoard([]);
      setBoardId([]);
      setMedium([]);
      setMediumId([]);
      setClasss([]);
      setClasssId([]);
      setCourse([]);
      setCourseId([]); 
      setSubjectId([]);
      setSubject([]);
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
                            <span >Add School</span>
                        </div>
                        <form noValidate onSubmit={AddSchoolHandler}>
                            <div className='teachers-info-detail-container'>
                                <div className='teachers-info-detail-student-container'>
                                    <div className='teachers-info-detail-student-container-subheading'>
                                        <span>Schools Details</span>
                                    </div>
                                    <div className='teachers-info-detail-student-container-textfield'>
                                        {/* row one */}
                                        <div className='teachers-info-section '>
                                            <TextField value={school_name} sx={{ flex: 1 }} label="School Name" error={schoolnameError} required helperText="Enter School Name" onChange={(e) => setSchoolName(e.target.value)} />
                                            <TextField value={city_name} sx={{ flex: 1 }} label="City Name" helperText="Enter City name" error={citynameError} required type="text" onChange={(e) => setCityName(e.target.value)} />
                                            <TextField value={admin_name} sx={{ flex: 1 }} label="Admin Name" error={adminnameError} required helperText="Enter Admin Name" onChange={(e) => setAdminName(e.target.value)} />


                                        </div>
                                        {/* row two */}

                                        {/* school_name, city_name, admin_name, email, mobile, course_id, medium_id, board_id, class_id */}

                                        <div className='teachers-info-section '>
                                            <TextField value={email} sx={{ flex: 1 }} error={emailError} helperText="Enter Email" required label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                                            <TextField value={mobile} sx={{ flex: 1 }} error={mobileError} helperText="Enter mobile" required label="Mobile" type="text" onChange={(e) => setMobile(e.target.value)} />

                                            {/* Start */}
                                            <FormControl error={mediumIdError} sx={{ m: 0, width: 410 }}>
                                                <InputLabel required id="demo-multiple-checkbox-label">Mediums</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    value={medium}
                                                    required={true}
                                                    onChange={handleMediumChange}
                                                    input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.map((x) => x.medium_name).join(', ')}
                                                    MenuProps={MenuProps}
                                                >
                                                    {mediums?.map((variant) => (
                                                        <MenuItem key={variant.medium_id} value={variant}>
                                                            <Checkbox
                                                                checked={
                                                                    medium?.findIndex((item) => item.medium_id === variant.medium_id) >= 0
                                                                }
                                                            />
                                                            <ListItemText primary={variant.medium_name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        {/* end */}
                                        </div>

                                        {/* row three */}

                                        <div className='teachers-info-section '>                                             
                                        <FormControl error={courseIdError} sx={{ m: 0, width: 410 }}>
                                                <InputLabel required id="demo-multiple-checkbox-label">Courses</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    required={true}
                                                    value={course}
                                                    onChange={handleCourseChange}
                                                    input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.map((x) => x.course_name).join(', ')}
                                                    MenuProps={MenuProps}
                                                >
                                                    {courses?.map((variant) => (
                                                        <MenuItem key={variant.course_id} value={variant}>
                                                            <Checkbox
                                                                checked={
                                                                    course?.findIndex((item) => item.course_id === variant.course_id) >= 0
                                                                }
                                                            />
                                                            <ListItemText primary={variant.course_name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <FormControl error={boardIdError} sx={{ m: 0, width: 410 }}>
                                                <InputLabel required id="demo-multiple-checkbox-label">Board</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    value={board}
                                                    required
                                                    onChange={handleBoardChange}
                                                    input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.map((x) => x.board_name).join(', ')}
                                                    MenuProps={MenuProps}
                                                >
                                                    {Board?.map((variant) => (
                                                        <MenuItem key={variant.board_id} value={variant}>
                                                            <Checkbox
                                                                checked={
                                                                    board?.findIndex((item) => item.board_id === variant.board_id) >= 0
                                                                }
                                                            />
                                                            <ListItemText primary={variant.board_name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <FormControl required error={classsIdError} sx={{ m: 0, width: 410 }}>
                                                <InputLabel id="demo-multiple-checkbox-label">Classes</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    required
                                                    value={classs}
                                                    onChange={handleClassChange}
                                                    input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.map((x) => x.class_name).join(', ')}
                                                    MenuProps={MenuProps}
                                                >
                                                    {classes?.map((variant) => (
                                                        <MenuItem key={variant.class_id} value={variant}>
                                                            <Checkbox
                                                                checked={
                                                                    classs?.findIndex((item) => item.class_id === variant.class_id) >= 0
                                                                }
                                                            />
                                                            <ListItemText primary={variant.class_name} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>

                                        {/* Next row */}
                                        <div className='teachers-info-section '>                                             
                                            <FormControl error={subjectIdError} sx={{ m: 0, width: 410 }}>
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
                                                        <MenuItem key={variant.course_id} value={variant}>
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


export default SchoolForm;