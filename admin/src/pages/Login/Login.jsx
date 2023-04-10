import React from 'react'
import "./Login.scss"
import img from "../../assest/img3.png";
import image from "../../assest/Img1.png"
import { useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Login = () => {
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole]=useState("");
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    if (userId != '' && password != '') {
      axios.post("https://school-management-api.azurewebsites.net/user/login", { username: userId, password: password }).then((res) => {
       
        localStorage.setItem("auth_token", res.data.token);
        let decodeToken = jwt_decode(localStorage.getItem("auth_token")); 
        setRole(decodeToken.result.role);
        setUserId("");
        setPassword("");
       if(decodeToken.result.role!="ADMIN")
        return navigate("/superAdmin");
        else return navigate("/dashboard")

      }).catch((err) => {
        console.log(err.response.data.error);
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      

      })
    }
    else {
      toast.warn("All fileds Are Required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
  }
  return (
    <div>
      <div className='login-container'>
        <div className='main-container'>
          <div className="left-container">
            <div className='content-box'>
              <div className="logo">

                <img className='photo' src={img}></img>
              </div>

            </div>

          </div>
          <div className="right-container">
            <div className="headerImage">
              <div>
                <img src={image}></img>
              </div>
              <div>
                <span>GW Techies</span>
              </div>


            </div>
            <form onSubmit={loginHandler}>
              <div className="input-container">
                <label>Username</label>
                <input value={userId} placeholder='enter Your id...' onChange={(e) => setUserId(e.target.value)}></input>
              </div>
              <div className="input-container">
                <label>Password</label>
                <input value={password} type='password' placeholder='enter Your password...' onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <div className='button-container'>
                <button type='submit'>Login</button>
                <div className='forgotpassword'>
                  {/* <span >forgot password ?</span> */}
                </div>

              </div>

            </form>
            {/* <div className='bottom'>
                  <button>Create Account</button>
                  
                </div> */}
            <span

              className='changePassword'>
              <Link style={{
                textDecoration: "none",
                color: "#1377C0"
              }} to="/changePassword">Change Password</Link>
            </span>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;
