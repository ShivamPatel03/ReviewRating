import React from "react";
import ForgetPassword from "./ForgetPassword";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toastify } from "toastify";
import { resetPasswords } from "../../features/auth/authSlice";

function ResetPassword() {
  const param = useParams();
  let params = useParams()
  const { token, id } = param;
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const ResetPassword = useSelector((state) => state.user);
  //console.log(Resetpassword);
  const { error, message } = ResetPassword;
  //console.log(error, message);
  useEffect(() => {
    if (message) {
      navigate("/");
    }
    if (error){

    };
  }, [message, error])
let initialState= {
  newPassword:"",
  confirmPassword: "",
  };

  const handleSubmit = (values) => {
    let obj = {
      ...values,
       email:params.id,
      token: token,
    }

    if(obj.confirmPassword == obj.newPassword){
      dispatch(resetPasswords(obj));
    }
  };
  return (
    <Formik
      initialValues={initialState}
   
      onSubmit={handleSubmit}>

      <Form className="Box">
        <div className="Box-a">
          <h1>Reset Your Password</h1>
          <Field
            type="text"
            name="newPassword"
            placeholder="Enter New Password"
          ></Field>
          <ErrorMessage name="newPassword"></ErrorMessage>
          <Field
            type="text"
            name="confirmPassword"
            placeholder="Confirm your password"
          ></Field>
          <ErrorMessage name="confirmPassword"></ErrorMessage>
          <button type="submit" onClick={handleSubmit}>Update Changed Password</button>
        </div>
      </Form>
    </Formik>
  );
}

export default ResetPassword;
