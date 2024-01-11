import React from "react";
import "./CreateCompany.css";
import { clearState, createCompany } from "../../features/company/CompanySlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CreateCompany() {
 const dispatch = useDispatch();
 const navigate =  useNavigate();
 const companyData = useSelector((state) => state.company);
  let { error, cmpcreate_msg, loading } = companyData;
  console.log(cmpcreate_msg)
  const [pic, setPic] = useState("");

  useEffect(() => {
    if(cmpcreate_msg) {
      toast.success(cmpcreate_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        dispatch(clearState());
        navigate('/Company_List')
      },1000)
    }
    if(error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        dispatch(clearState());
        navigate("/Company_List");
      },1000)
    }
  }, [cmpcreate_msg, error]);

  const initialState = {
    companyName: "",
    location: "",
    city: "",
    date: "",
  };
  const validationSchema = yup.object().shape({
    companyName: yup.string().required("please enter your name"),
    location: yup.string().required("please enter your location"),
    city: yup.string().required("please enter your city"),
    date: yup.string().required("please enter your date"),
  });
  const handleSubmit = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let obj = {
      ...values,
      company_logo: pic,
      userId: user._id,
    };
    console.log(obj);
    dispatch(createCompany(obj));
  };
  function picSelect(e) {
    setPic(e.target.files[0]);
  }
  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="AddCompany">
          <div className="AddCompany-a">
            <div className="AddCompany-b">
              <h1>Add Company</h1>
              <labal>Company name</labal>
              <Field type="text" name="companyName" placeholder="Enter......."></Field>
              <ErrorMessage name="companyName"></ErrorMessage>
              <labal>Location</labal>
              <Field type="Location" name="location" placeholder="Select Location"></Field>
              <ErrorMessage name="location"></ErrorMessage>
              <labal>City</labal>
              <Field type="text" name="city" placeholder="Select City"></Field>
              <ErrorMessage name="city"></ErrorMessage>
              <labal>Date</labal>
              <Field type="date" name="date" placeholder="DD/MM/YYYY"></Field>
              <ErrorMessage name="date"></ErrorMessage>
              <labal>File</labal>
              <input type="file" onChange={picSelect} placeholder="Choose file"></input>
              <button type="submit">Save</button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default CreateCompany;

