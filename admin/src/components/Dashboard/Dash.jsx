import { useState, useEffect } from 'react'
import "./Dash.scss"
import student1 from "../../assest/male.png";
import teacher from "../../assest/professor.png";
import Courses from "../../assest/courses.png";
import Medium from "../../assest/medium.png";
import ClassImage from "../../assest/Class.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Widgest from '../Widgest/widgest';
import InfoContainer from '../InfoContainer/InfoContainer';
import SubjectList from "../../components/SubjectLIst/Subject";

const info = {
    school_name: "GAANV Wala High School Academy, Jaipur",
    city_name: "Jaipur",
    email: "admin123@gaanvwala.com",
    mobile: "82XXXXXXX96",
    admin_name: "GW Head"
}

const Dashboard = (props) => {
    const [data, setData] = useState(info);
    const [studentCount, setStudentCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [CourseCount,SetcourseCount]=useState(0);
    const [mediumCount,setMediumCount]=useState(0);
    const [ClassInfo,setClasseInfo]=useState("1-12");
    const [courses,setCourses]=useState([]);
    const [medium,setMedium]=useState([]);
    const [Class,setClasses]=useState('');
    const [board,setBoard]=useState([]);
    let decodeToken = jwt_decode(localStorage.getItem("auth_token"));
    let school_id = (localStorage.getItem("superadmin_school") === null) ? decodeToken.result.school_id : localStorage.getItem("superadmin_school");


    useEffect(() => {


        axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}`, { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                console.log(res.data);
                setData(res.data.schoolDetail);
                setStudentCount(res.data.totalStudent);
                setTeacherCount(res.data.totalTeacher);
                if (decodeToken.result.role === "superAdmin") props.AdminNameHandler("SuperAdmin");
                else props.AdminNameHandler(res.data.schoolDetail.admin_name);

                localStorage.setItem(`school_${school_id}_detail`, JSON.stringify({
                    schoolDetail: res.data.schoolDetail,
                    totalStudent: res.data.totalStudent,
                    totalTeacher: res.data.totalTeacher
                }));
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getCourseId`, { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                
                setCourses(res.data.course_name); 
                
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getMediumId`, { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                
                setMedium(res.data.medium_name); 
                
            })
            .catch((err) => {
                console.log(err);
            });

            axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getBoardId`, { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                
                setBoard(res.data.board_name); 
                
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get(`https://school-management-api.azurewebsites.net/schools/${school_id}/getClassId`, { headers: { 'Content-Type': 'application/json' } })
            .then((res) => { 
                let len = res.data.class_name.length;
                console.log(res.data.class_name[0] + "-" + res.data.class_name[len - 1]);
                setClasses(res.data.class_name[0] + "-" + res.data.class_name[len - 1]); 
            })
            .catch((err) => {
                console.log(err);
            });

            
        // }
    }, []);

    return (
        <div>
            <div className='dash'>
                <InfoContainer data={data} />
                <div className='bottom'>
                    <Widgest name={"Student"} count={studentCount} image={student1} />
                    <Widgest name={"Teacher"} count={teacherCount} image={teacher} />
                    <Widgest name={"Classes"} count={Class} image={ClassImage} />
                    <Widgest name={"Courses"} count={courses} image={Courses} />
                    <Widgest name={"Medium"} count={medium} image={Medium} /> 
                    <Widgest name={"Board"} count={board} image={ClassImage} /> 
                </div> 
                <SubjectList/>  
            </div>
        </div>
    )
}

export default Dashboard
