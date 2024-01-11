import React from "react";
import "./Navbar_new.css";
import img from "../components/auth/image/Group 1.png";
import img1 from "../components/auth/image/man.avif";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar_new() {
  const navigate = useNavigate();
  const res = localStorage.getItem("user");
  const user = JSON.parse(res);
  console.log("user data :",user);

//changes required
  const  handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <div className="Navbar">
        <div className="Navbar-a">
          <img src={img}/>
        </div>
        <div className="Navbar-b">
        
        
      {user?.name ? (
        <p>Welcome:{user?.name}</p>
      ):(
          navigate("/")
      )}
          
          <img src={`http://localhost:9000${user.profilepic}`}/>
          <button>
          <Link to="/" onClick={handleLogout}>Logout</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Navbar_new;