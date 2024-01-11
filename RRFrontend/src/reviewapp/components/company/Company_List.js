import React from "react";
import "./Company_List.css";
import { Link } from "react-router-dom";
import img from "../auth/image/Group 1.png";
import img1 from "../auth/image/man.avif";
import img2 from "../auth/image/man.avif";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCompanies } from "../../features/company/CompanySlice";
import { useEffect } from "react";
import Navbar_new from "../../navbar/Navbar_new";
function Company_List() {
  const logo = {
    color: "black",
  };
  const companies = useSelector((state) => state.company);
  const { cmplist_msg, company_data, error, loading, count } = companies;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, []);
  return (
    <div className="Company_list">
      <Navbar_new />
      <div className="Company_list-a">
        <div className="Leftbox">
          <h4>Select City</h4>
          <div className="Leftbox-a">
            <input type="text" placeholder="Enter your city"></input>
            <button>Find Company</button>
          </div>
        </div>
        <div className="Rightbox">
          <button>
            <Link to="/CreateCompany">+ Add Company</Link>
          </button>
          <div className="Rightbox-a">
            <labal>Sort</labal>
            <p>🐉</p>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="Company_list-b">
        {/* company data */}
        {/*  <Link className="Company_List" to={`/companydetails/${_id}`}>   */}
        <p></p>
        
        <div className="Description">
          {/* console.log(_id , company_logo ,companyName , location ,city ,founded) */}
          {company_data &&
            company_data.map(
              ({ _id, company_logo, companyName, location, city, founded }) => (
                _id &&
                <>
                  <Link to={`/companyDetails/${_id}`}>
                  <div className="Description-a">
                  <div className="Description-Logo">
                    <img src={`http://localhost:9000${company_logo}`}></img>
                  </div>
                  <div className="Description-Data">
                    <p>{founded} 2016</p>
                    <h1>{companyName}</h1>
                    <p>
                      {location}
                    </p>
                    <p> {city}</p>
                    <p>4.5⭐⭐⭐⭐⭐ 45 Reviews</p>
                  </div>
                  </div>
                  </Link>
                </>
              )
            )}
        </div>
      </div>
    </div>
  );
}

export default Company_List;


