import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import img from './image/Group 11664.png'
import * as yup from 'yup'
import { Formik , Form ,Field, ErrorMessage} from 'formik'
import { useDispatch ,useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import {clearState, signInUser} from '../../features/auth/authSlice'

function Login() {
  const FieldType={
    color:'blue',
    textDecoration: 'underline'
  }
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const data =useSelector ((state)=>state.user);
  let {error ,message}=data;
  console.log(data)
  useEffect(()=>{
    if(error){
      toast.error(error,{position:toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
        navigate("/")
      },1000)
    }
    if(message){
      toast.success(message,{position:toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
        navigate("/Company_list/")
      },1000);
    }
  },[error, message]);

 let initialState={
   email:"",
   password:""
 }
 const validationSchema = yup.object().shape({
email:yup.string().required().email("Email Required"),
password:yup.string().required("Please enter your password")
 })
const handleSubmit =async (values)=> {
 console.log("values",values);
 const result =await dispatch(signInUser(values))
};
  return (
    <>
    <ToastContainer/>
    <Formik 
           initialValues={initialState}
           validationSchema ={validationSchema}
           onSubmit={handleSubmit}>

    <Form className="Login">
      <div className="LeftBox">
         <h1>Welcome</h1>
         <p>
          We are committed toward finding best feedback from you for your friend, family and co-worker therefore provide your Genuine review and feedback.  
         </p>
         <img src={img}></img>
      </div>
      <div className="RightBox">
        <div className="RightBox-a">
          <h1>Login</h1>
          <p>Hello! Please enter your details for login</p>
          <Field type="text" name="email" placeholder="✉️ Enter your registered email"></Field>
          <ErrorMessage name="email"></ErrorMessage>
          <Field type="password" name="password" placeholder="🔒 Password"></Field>
          <ErrorMessage name="password"></ErrorMessage>
        <h4><Link to='/forgetPassword'>Forget Password ?</Link></h4>
        <button type="submit">Login</button>
       
        <hr></hr>
        <div className="RightBox-b">
        <p>I don't have an account on Review and Rate</p>
        <Link style={FieldType} to='/signUp'>Register Now</Link>
        </div>
        </div>
      </div>
    </Form>
    </Formik>
    </>
  );
}
export default Login;
