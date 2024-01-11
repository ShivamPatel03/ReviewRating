import React, { useState } from "react";
import "./ForgetPassword.css";
import * as yup from 'yup'
import { Formik , Form , Field , ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"


function ForgetPassword() {
let [email,setemail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sendEmail = async()=>{
     await axios.post("http://localhost:9000/user/send-reset-password-email",{email:email})
    }
    sendEmail()
  };

  return (
    <>
    <ToastContainer/>
   
    <form className="Box">
      <div className="Box-a">
        <h1>Reset Password</h1>
        <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} name="email" placeholder="✉️ Enter Email"/>
        <button onClick={handleSubmit} >Reset</button>
      </div>
    </form>
 
    </>
  );
}

export default ForgetPassword;
