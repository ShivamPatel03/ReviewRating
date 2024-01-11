import React from "react";
import "./CompanyDetails.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../../features/company/CompanySlice";
import img1 from "../auth/image/man.avif";
import Navbar_new from "../../navbar/Navbar_new";
function CompanyDetails() {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const companyData = useSelector((state) => state.company);
  const { company_details, compDetails_msg } = companyData;
  const { companyDetails, comments } = company_details;
  //console.log(companyDetails);
  const { companyName, company_logo, city, founded, location } = {
    ...companyDetails,
  };
  console.log("comments are - ",comments);
  console.log(companyName);
  useEffect(() => {
    dispatch(getCompanyDetails(id));
  }, []);
  return (
    <div>
      <div className="CompanyDetails">
        <Navbar_new />
        <br></br>
        <div className="CompanyDetails-a">
          <div className="Description">
            <div className="Description-Logo">
              <img src={`http://localhost:9000${company_logo}`}></img>
            </div>
            <div className="Description-Data">
              <p>Founded 2009</p>
              <h1>{companyName}</h1>
              <p>{location}</p>
              <p>{city}</p>
              <p>4-⭐⭐⭐⭐, 28 Reviews</p>
            </div>
            <div className="Description-Arrow">
              <button><Link to={`/addCompanyReview/${id}`}>+ Add Review</Link></button>
            </div>
          </div>
          <br></br>
          <hr></hr>
          <br></br>
          {
            comments && comments.map((value)=>(
              <div className="CompanyDetails-b">
            <div className="Left">
              <img src={img1}></img>
            </div>
            <div className="Middle">
              <p>{value.rating}</p>
              <p>{value.createdAt.slice(0,10)}</p>
              <p>{value.review}</p>
            </div>
            <div className="Right">
              <p> ⭐⭐⭐⭐⭐</p>
            </div>
           
          </div>
            ))
          }
        </div>
      </div>
    </div>
    
  );
}

export default CompanyDetails;
