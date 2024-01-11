import React from "react";
import "./AddNewReview.css";
import { Formik, Field, Form } from "formik";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer ,toast } from "react-toastify";
// import "react-toastify/dist/reactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { companyReview } from "../../features/review/reviewSlice";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "formik";
import * as yup from "yup";
import { clearState } from "../../features/auth/authSlice";
function AddNewReview() {
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;
  let user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const review = useSelector((state) => state.review);
  //console.log(review ,"review");
  const { review_msg, loading, error } = review;
  useEffect(() => {
    if (review_msg) {
      toast.success(review_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate(`/companydetails/${id}`);
      }, 1000);
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [review_msg, error]);
  const initialState = {
    subject: "",
    review: "",
    rating: "",
  };

  const validationSchema = yup.object().shape({
    subject: yup.string().required("please enter your subject"),
    review: yup.string().required("please enter your review"),
    rating: yup.string().required("please enter your rating"),
  });
  const handleSubmit = async (values) => {
    //console.log ("values" ,values)
    let obj = {
      ...values,
      company_id: id,
      user_id: user._id,
    };
    dispatch(companyReview(obj));
  };
  return (
    <>
    <ToastContainer/>
    <Formik 
    initialValues={initialState}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}>
      <Form className="AddReview">      
        <div className="AddReview-a">
          <div className="AddReview-b">
            <h1>Add Review</h1>
            <labal>Subject</labal>
            <Field
              type="text"
              name="subject"
              placeholder="Enter......."
            ></Field>
            <ErrorMessage name="subject"></ErrorMessage>
            <labal>Enter Your Review</labal>
            <p>
              <Field
                type="text"
                name="review"
                placeholder="Enter your review"
              ></Field>
            </p>
            <ErrorMessage name="review"></ErrorMessage>
            <h2>Rating</h2>
            <Field
              type="number"
              name="rating"
              placeholder="enter rating"
            ></Field>
            <ErrorMessage name="rating"></ErrorMessage>
            <button type="submit">Save</button>
          </div>
        </div>
      </Form>
    </Formik>
    </>
  );
}

export default AddNewReview;
