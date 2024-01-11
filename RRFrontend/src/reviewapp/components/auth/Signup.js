import React from 'react'
import img from './image/Group 11664.png'
import './Signup.css';
import { Link } from 'react-router-dom';
import { Formik , Form ,Field, ErrorMessage} from 'formik'
import { ToastContainer,toast } from 'react-toastify';
import * as yup from 'yup'
import "react-toastify/dist/ReactToastify.css"
import {clearState, signUpUser} from '../../features/auth/authSlice'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
function Signup() {
  const [pic, setPic]= useState("")
  const dispatch = useDispatch();
  const data =useSelector ((state)=>state.user);
  let {error ,message,loading}=data;
  console.log(data)

  useEffect(()=>{

    if(error){
      toast.error(error,{position:toast.POSITION.TOP_CENTER})
    }
    if(message){
      toast.success(message,{position:toast.POSITION.TOP_CENTER})
      setTimeout(()=>{
        dispatch(clearState());
      },500);
      //changes
    }
  })
    const initialState = {
    name:"",
    email:"",
    phone:"",
    password:"",
    city:"",
    state:""
    };
  
    const validationSchema =yup.object().shape({
         name:yup.string().required("please enter your name"),
         email:yup.string().required().email("please enter your email"),
         phone:yup.string().required("please enter your phone"),
         password:yup.string().required("please enter your password").min(8,"password must be a 8 character"),
         city:yup.string().required("please enter your city"),
         state:yup.string().required("please enter your state")
    })
  
 const handleSubmit=(values)=>{
     let obj={
      profilepic:pic,
      ...values,
    };

    dispatch(signUpUser(obj))
 }
 function picSelect (e){
  setPic(e.target.files[0]);
 }
  return (
    <>
    <ToastContainer/>
    <Formik 
    initialValues={initialState}
    validationSchema ={validationSchema}
    onSubmit={handleSubmit}>
  
    <Form className='Signup'>
       <div className="LeftBox">
        <h1>Welcome</h1>
        <p>
          We are committed toward finding best feedback from you for your friend, family and co-worker therefore provide your Genuine review and feedback.
        </p>
        <img src={img}></img>
      </div>
        <div className="RightBox">
            <div className="RightBox-a">
        <h1>Sign Up</h1>
        <Field type="text" name="name"  placeholder="✉️ Full Name"></Field>
        <ErrorMessage name="name"></ErrorMessage>
        <Field type="text"  name="email" placeholder="🔒 Email ID"></Field>
        <ErrorMessage name="email"></ErrorMessage>
        <Field type="number" name="phone" placeholder="📞 Phone Number"></Field>
        <ErrorMessage name="phone"></ErrorMessage>
        <Field type="password" name="password" placeholder="Enter Password"></Field>
        <ErrorMessage name="password"></ErrorMessage>
        <Field type="text" name="city" placeholder="🏙️ City"></Field>
        <ErrorMessage name="city"></ErrorMessage>
        <Field type="text" name="state"  placeholder="🗽 State"></Field>
        <ErrorMessage name="state"></ErrorMessage>
        <input type="file" onChange={picSelect} placeholder="Choose File"></input>
        <button type="submit" >Sign Up</button>
        <p>-------------------------------------------------------</p>
        <p>I already have an account  ?<Link to="/">Login</Link></p>
        </div>
      </div>
    </Form>
    </Formik>
    </>
  )
}

export default Signup;

 