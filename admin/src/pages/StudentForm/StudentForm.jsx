import Sidebar from "../../components/Sidebar/Sidebar"
import Navbar from "../../components/Navbar/Navbar"
import "./Studentform.scss";
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import moment from "moment/moment";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from "@mui/x-date-pickers";


// select medium for the selecti list


// gender 
const Gender = [
  {
    value: 'Male',
    label: 'Male'
  },
  {
    value: 'Female',
    label: 'Female'
  },
  {
    value: 'Not-disclose',
    label: 'Not-disclose'
  },
  {
    value: 'Binary',
    label: 'Binary'
  },



]
const ChangeFormatOfDropDownValue=(arr1,arr2)=>
{
    const tempArray=[];
    for (let i = 0; i < arr1.length; i++) {
      tempArray.push({
        id: arr1[i],
        value:arr2[i],
        label:arr2[i]
      });
    }
    return tempArray;

}
const course_id=[1,2,3,4,5];
const course_name=["a","b","c","d","e"];
console.log(ChangeFormatOfDropDownValue(course_id,course_name));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const StudentForm = (props) => {
  let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
    let school_id = (localStorage.getItem("superadmin_school") === null)?decodeToken.result.school_id:localStorage.getItem("superadmin_school");

  // Date maker
  let objectDate = new Date();
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  month = month.toString();
  day = day.toString();
  if (month.length == 1) month = "0" + month;
  if (day.length == 1) day = "0" + day;
  let year = objectDate.getFullYear();
  let format = year + "-" + month + "-" + day;

  
  const [firstInsallMentEta, setFirstInstallMentEta] = useState("");
  const [secondInsallMentEta, setSecondInstallMentEta] = useState("");
  const [thirdInsallMentEta, setThirdInstallMentEta] = useState("");

  const [firstInstallMentStatus, setFirstInstallMentStatus] = useState(0);
  const [secondInstallMentStatus, setSecondInstallMentStatus] = useState(0);
  const [thirdInstallMentStatus, setThirdInstallMentStatus] = useState(0);

  const [firstInstallMentAmount, setFirstInstallMentAmount] = useState("");
  const [secondInstallMentAmount, setSecondInstallMentAmount] = useState("");
  const [thirdInstallMentAmount, setThirdInstallMentAmount] = useState("");




  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [medium, setMedium] = useState("");
  const [date, setDate] = useState("");
  const [Class, setClass] = useState("");
  const [email, setEmail] = useState("");
  const [Fathername, setFatherName] = useState("");
  const [MotherName, setMotherName] = useState("");
  const [FatherProfession, setFatherProfession] = useState("");
  const [MotherProfession, setMotherProfession] = useState("");
  const [classId, setClassId] = useState("");


  const [PrimaryNumber, setPrimaryNumber] = useState("");
  const [AlternateNumber, setAlternateNumber] = useState("");
  const [AadharNumber, setAadharNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [board, setBoard] = useState("");



  // error handler

  const [nameError, setNameError] = useState(false);
  const [mediumError, setMediumError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [classError, setClassError] = useState(false);
  const [fatherNameError, setFahterNameError] = useState(false);
  const [motherNameError, setMohterNameError] = useState(false);
  const [fatherProfessionError, setFatherProfessionError] = useState(false);
  const [motherProfessionError, setmotherProfessionError] = useState(false);
  const [altNumberError, setAltNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [primaryError, setPrimaryError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [aadhaError, setAadharError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [oneError, setOneError] = useState(false);
  const [twoError, setTwoError] = useState(false);
  const [thirdError, setThirdError] = useState(false);
  const [firstInstallMentError, setFirstInstallMentError] = useState(false);
  const [secondInstallMentError, setSecondInstallMentError] = useState(false);
  const [thirdInstallMentError, setThirdInstallMentError] = useState(false);



  // drop down
  const [courseArray,setCourseArray]=useState([]);
  const [MediumArray,setMediumArray]=useState([]);
  const [ClassArray,setClassArray]=useState([]);
  const [boradArray,setBoardArray]=useState([]);



  // setCourseArray(ChangeFormatOfDropDownValue(course_id,course_name))
  // setMediumArray(ChangeFormatOfDropDownValue(medium_id,medium_name))
  // setClassArray(ChangeFormatOfDropDownValue(class_id,class_name))
  // setboardArray(ChangeFormatOfDropDownValue(board_id,board_name))





  // fee detals
  
useEffect(()=>
{
  axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getCourseId`, { headers: { 'Content-Type': 'application/json' } })
  .then((res) => {
     
     console.log(res.data.course_name);
    setCourseArray(ChangeFormatOfDropDownValue(res.data.course_id,res.data.course_name));
     
      
  })
  .catch((err) => {
      console.log(err);
  });
  axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getMediumId`, { headers: { 'Content-Type': 'application/json' } })
  .then((res) => {
     
      console.log(res.data);
      setMediumArray(ChangeFormatOfDropDownValue(res.data.medium_id,res.data.medium_name));
    
      
  })
  .catch((err) => {
      console.log(err);
  });

  axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getBoardId`, { headers: { 'Content-Type': 'application/json' } })
  .then((res) => {
     
      console.log(res.data);
      setBoardArray(ChangeFormatOfDropDownValue(res.data.board_id,res.data.board_name));
     
      
  })
  .catch((err) => {
      console.log(err);
  });
  axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getClassId`, { headers: { 'Content-Type': 'application/json' } })
  .then((res) => {
     
      console.log(res.data);
     setClassArray(ChangeFormatOfDropDownValue(res.data.class_id,res.data.class_name));
    
      
  })
  .catch((err) => {
      console.log(err);
  });
},[]);
 

  const handleChange1 = (e) => {

    setFirstInstallMentEta(format);
    if (firstInstallMentStatus == 0) setFirstInstallMentStatus(1);
    else setFirstInstallMentStatus(0)
  }
  const handleChange2 = (e) => {
    setSecondInstallMentEta(format);
    if (secondInstallMentStatus == 0) setSecondInstallMentStatus(1);
    else setSecondInstallMentStatus(0)

  }
  const handleChange3 = (e) => {
    setThirdInstallMentEta(format);
    if (thirdInstallMentStatus) setThirdInstallMentStatus(0)
    else setThirdInstallMentStatus(1)
  }


  

  const AddStudentHandler = (e) => {    
    e.preventDefault(); 
    setNameError(false);
    setMediumError(false);
    setAltNumberError(false);
    setBoardError(false);
    setClassError(false);
    setCourseError(false);
    setFahterNameError(false);
    setMohterNameError(false);
    setFatherProfessionError(false);
    setmotherProfessionError(false);
    setPrimaryError(false);
    setAltNumberError(false);
    setDateError(false);
    setAddressError(false);
    setOneError(false);
    setTwoError(false);
    setThirdError(false);
    setGenderError(false);
    setEmailError(false);
    setAadharError(false); 


    if (name == ''){toast.error("Student name is required!"); return;}
    if (medium == ''){ toast.error("Medium name is required!"); return;}
    if (Class == ''){ toast.error("Class name is required!"); return;}
    if (course == '') {toast.error("Course name is required!"); return;}
    if (gender == '') {toast.error("Gender name is required!"); return;}
    if (email == '') {toast.error("Father Email name is required!"); return;}
    if (Fathername == '') {toast.error("Father name is required!"); return;}
    if (MotherName == '') {toast.error("Mother name is required!"); return;}
    if (FatherProfession == '') {toast.error("Father Profession is required!"); return;}
    if (MotherProfession == '') {toast.error("Mother Profession is required!"); return;}
    if (AlternateNumber.length != 10) {toast.error("Alternate mobile number should be of 10 digits!"); return;}
    if (PrimaryNumber.length != 10) {toast.error("Primary mobile number should be of 10 digits!");  return;}
    if (date == '') {toast.error("Date is required!"); return;}
    if (Address == '') {toast.error("Address is required!"); return;}
    if (AadharNumber == '') {toast.error("Aadhar is required!"); return;}
    if (board == '') {toast.error("Board is required!"); return;}
    if (firstInstallMentAmount == '') {toast.error("First Installment amount is required!"); return;}
    if (secondInstallMentAmount == '') {toast.error("Second Installment is required!"); return;}
    if (thirdInstallMentAmount == '') {toast.error("Third Installment is required!"); return;}

    if (firstInsallMentEta == '') {toast.error("First installment last date is required!"); return;}
    if (secondInsallMentEta == ''){toast.error("Second installment last date is required!"); return;}
    if (thirdInsallMentEta == '') {toast.error("Third installment last date is required!"); return;}
 
    if(Class == 'PRE KG1'){
      setClassId("-1");
    }else if(Class == 'PRE KG2'){
      setClassId("-2");
    }else{
      setClassId(Class);
    }


   
        var dateObj = new Date();
        let todaydate = dateObj.toJSON(); 
        todaydate = todaydate.slice(0,10);
      let first_installment_submit = null, second_installment_submit = null, third_installment_submit = null;
      if(firstInstallMentStatus == 1){
        first_installment_submit = todaydate;
      }

      if(secondInstallMentStatus == 1){
        second_installment_submit = todaydate;
      }

      if(thirdInstallMentStatus == 1){
        third_installment_submit = todaydate;
      }
      
      let totalFees = parseInt(firstInstallMentAmount) + parseInt(secondInstallMentAmount) + parseInt(thirdInstallMentAmount);

       
      axios.post(`https://school-management-api.azurewebsites.net/schools/${school_id}/addStudent`, {
        student_name: name, gender, dob: date, address: Address, class_id: classId, course_name: course,
        medium, board, father_name: Fathername, father_profession: FatherProfession, mother_name: MotherName,
        mother_profession: MotherProfession, whatsapp_no: PrimaryNumber, alternative_mobile: AlternateNumber,
        email, total_fees: totalFees, first_installment: firstInstallMentAmount,
        first_installment_eta: firstInsallMentEta, first_installment_status: firstInstallMentStatus,
        second_installment: secondInstallMentAmount, second_installment_eta: secondInsallMentEta,
        second_installment_status: secondInstallMentStatus,
        third_installment: thirdInstallMentAmount, third_installment_eta: thirdInsallMentEta,
        third_installment_status: thirdInstallMentStatus, aadhar_no: AadharNumber,
        first_installment_submit, second_installment_submit, third_installment_submit
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
        toast.error('All Field are Required', {
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
  
    setName("");
    setEmail("");
    setGender("");
    setAddress("");
    setClass("");
    setCourse("");
    setMedium("");
    setBoard("");
    setAadharNumber("");
    setFatherName("");
    setMotherName("");
    setFatherProfession("");
    setMotherProfession("");
    setPrimaryNumber("");
    setAlternateNumber("");
    setDate("");
    setFirstInstallMentAmount("");
    setSecondInstallMentAmount("");
    setThirdInstallMentAmount("");
    setFirstInstallMentEta("");
    setSecondInstallMentEta("");
    setThirdInstallMentEta("");
    setFirstInstallMentStatus(0);
    setSecondInstallMentStatus(0);
    setThirdInstallMentStatus(0); 
  }

  const [isExpanded, setExpanded] = useState(false);
  const isExpandedHandler = (value) => {
    setExpanded(value);
  } 

  return (
    <div className='studentForm-container '>
      <Sidebar isExpandedHandler={isExpandedHandler} />

      <div className='studentForm'>
        <Navbar adminName={props.AdminName} />
        <div className='studentForm-page page-container'>
          <div className="studentForm-page-container">
            <div className='student-page-container-heading'>

              {/* header container */}
              <span >Add Student</span>
            </div>
            <form noValidate onSubmit={AddStudentHandler}>
              <div className='student-info-detail-container'>

                <div className='student-info-detail-student-container'>
                  <div className='student-info-detail-student-container-subheading'>
                    <span>Student Details</span>
                  </div>
                  <div className='student-info-detail-student-container-textfield'>


                    {/* row one info */}

                    <div className='student-info-section '>



                      <TextField value={name} error={nameError} sx={{ flex: 1 }} label="Student Name" required helperText="Enter Student Name" onChange={(e) => setName(e.target.value)} />
                      <TextField value={gender} sx={{ flex: 1 }} error={genderError} select label="Gender" required onChange={(e) => setGender(e.target.value)} helperText="Select Gender">
                        {Gender.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField value={course} sx={{ flex: 1 }} error={courseError} select label="Course" required onChange={(e) => setCourse(e.target.value)} helperText="Select Course">
                        {courseArray.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className='student-info-section '>
                      <DatePicker format="DD/MM/YYYY" value={date} sx={{ flex: 1 }} error={dateError} variant="outlined" helperText="Select Date Of Birth" type="date"   onChange={(e) => setDate(e)} />
                      <TextField value={Class} sx={{ flex: 1 }} error={classError} select label="Class" required onChange={(e) => setClass(e.target.value)} helperText="Select Class">
                        {ClassArray.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField value={medium} sx={{ flex: 1 }} error={mediumError} required select helperText="Select Medium" label="Medium" onChange={(e) => setMedium(e.target.value)}>
                        {MediumArray.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className='student-info-section '>
                      <TextField value={Address} sx={{ flex: 1 }} error={addressError} helperText="Enter Address" label="Address" type="text" required onChange={(e) => setAddress(e.target.value)} />
                      <TextField value={AadharNumber} sx={{ flex: 1 }} error={aadhaError} label="Aadhar Number" type="text" helperText="Enter Aadhar Number" required
                        onChange={(e) => setAadharNumber(e.target.value)} />
                      <TextField value={board} sx={{ flex: 1 }} error={boardError} required select label="Board" helperText="Select Board" onChange={(e) => setBoard(e.target.value)} >
                        {boradArray.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
                <div className='student-info-detail-parent-container'>
                  <div className='student-info-detail-parent-container-subheading'>
                    <span>Parent Details</span>
                  </div>
                  <div className='student-info-detail-parent-container-textfield'>
                    <div className='parent-info-section '>
                      <TextField value={Fathername} sx={{ flex: 1 }} error={fatherNameError} label="Father Name" required helperText="Father Name" onChange={(e) => setFatherName(e.target.value)} />
                      <TextField value={FatherProfession} sx={{ flex: 1 }} error={fatherProfessionError} label="Father profession" helperText="Father Profession" required onChange={(e) => setFatherProfession(e.target.value)} />
                      <TextField value={PrimaryNumber} sx={{ flex: 1 }} error={primaryError} label="Primary Number" required helperText="Primary Number" onChange={(e) => setPrimaryNumber(e.target.value)} />
                    </div>
                    <div className='parent-info-section '>
                      <TextField value={MotherName} sx={{ flex: 1 }} error={motherNameError} label="Mother Name" required helperText="Mohter Name" onChange={(e) => setMotherName(e.target.value)} />
                      <TextField value={MotherProfession} sx={{ flex: 1 }} error={motherProfessionError} label="Mother profession" helperText="Mother Profession" required onChange={(e) => setMotherProfession(e.target.value)} />
                      <TextField value={AlternateNumber} sx={{ flex: 1 }} error={altNumberError} label="Alternate Number" required helperText="Alternate Number" onChange={(e) => setAlternateNumber(e.target.value)} />
                    </div>
                    <div className='parent-info-section '>
                      <TextField value={email} sx={{ flex: 0.317 }} error={emailError} label="Email" required type="email" helperText="Enter Parent Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className='student-info-detail-fee-container'>
                  <div className='student-info-detail-fee-container-subheading'>
                    <span>Fee Details</span>
                  </div>
                  <div className='student-info-detail-fee-container-textfield'>
                    <div className='fee-info-section section'>
                      <div className='fee-info-section-installment'>
                        <TextField
                          value={firstInstallMentAmount}
                          sx={{
                            height: "7vh"
                          }}
                          error={oneError}
                          required
                          onChange={(e) => setFirstInstallMentAmount(e.target.value)}
                          id="outlined-basic" label="1st InstallMent" variant="outlined" />
                        <div className="fee-info-section-installment-checkbox-date">
                          <Checkbox
                            checked={firstInstallMentStatus}
                            onChange={(e) => handleChange1(e)}
                            color="success"
                          />
                          {!firstInstallMentStatus &&
                            <DatePicker
                              sx={{
                                height: "5vh"
                              }}
                              variant="outlined"
                              type="date"
                              format="DD/MM/YYYY"
                              required
                              value={firstInsallMentEta}
                              helperText="Select a Date"
                              error={firstInstallMentError}
                              onChange={(e) => setFirstInstallMentEta(e)} />}
                        </div>


                      </div>
                      <div className='fee-info-section-installment'>
                        <TextField error={twoError}
                          sx={{ height: "7vh" }} value={secondInstallMentAmount} onChange={(e) => setSecondInstallMentAmount(e.target.value)} id="outlined-basic" label="2nd  InstallMent"
                          required
                          variant="outlined" />
                        <div className="fee-info-section-installment-checkbox-date">
                          <Checkbox
                            checked={secondInstallMentStatus} required onChange={(e) => handleChange2(e)} color="success" />
                          {!secondInstallMentStatus &&
                            <DatePicker sx={{ height: "5vh" }} variant="outlined" value={secondInsallMentEta} type="date" format="DD/MM/YYYY" required
                              helperText="Select a Date" error={secondInstallMentError}
                              onChange={(e) => setSecondInstallMentEta(e)} />}
                        </div></div>
                      <div className='fee-info-section-installment'>
                        <TextField
                          error={thirdError}
                          sx={{ height: "7vh" }}
                          value={thirdInstallMentAmount}
                          onChange={(e) => setThirdInstallMentAmount(e.target.value)}
                          required
                          id="outlined-basic" label="3rd InstallMent" variant="outlined" />
                        <div className="fee-info-section-installment-checkbox-date">
                          <Checkbox
                            checked={thirdInstallMentStatus}
                            onChange={(e) => handleChange3(e)}
                            color="success"
                            {...label}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          {!thirdInstallMentStatus &&
                        
                            // <DatePicker 
                            // variant="outlined"
                            //   value={thirdInsallMentEta}
                            //   format="DD-MM-YYYY"
                            //  />
                            <DatePicker
                              sx={{
                                height: "5vh"
                              }}
                              variant="outlined"
                              type="date"
                              format="DD/MM/YYYY"
                              required
                              value={thirdInsallMentEta}
                              helperText="Select a Date"
                              error={thirdInstallMentError}
                              onChange={(e) => setThirdInstallMentEta(e)} />
                            
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='buttonSubmit'>
                  <button>Submit</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>



  )
}

export default StudentForm