import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./reviewapp/components/auth/Login";
import Signup from "./reviewapp/components/auth/Signup";
import Page404 from "./reviewapp/components/Page404";
import ForgetPassword from "./reviewapp/components/auth/ForgetPassword";
import CreateCompany from "./reviewapp/components/company/CreateCompany";
import Company_List from "./reviewapp/components/company/Company_List";
import AddNewReview from "./reviewapp/components/company/AddNewReview";
import Navbar_New from "./reviewapp/navbar/Navbar_new";
import CompanyDetails from "./reviewapp/components/company/CompanyDetails";
import Protected_route from "./reviewapp/components/protected/Protected_Route";
import ResetPassword from "./reviewapp/components/auth/ResetPassword"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <AddNewReview/> */}
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signUp" element={<Signup />}></Route>
          <Route path="/page404" element={<Page404 />}></Route>
          <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
          <Route path="user/reset-Password/:id/" element={<ResetPassword />}></Route>
          <Route path="reset-Password" element={<ResetPassword />}></Route>

          <Route path="/CreateCompany" element={<CreateCompany/>}></Route>
          <Route path="Company_List" element={<Company_List/>}></Route>
          <Route path="/companyDetails/:id" element={<CompanyDetails/>}></Route>
          <Route path="/addCompanyReview/:id" element={<AddNewReview/>}></Route>
          <Route path="/Navbar/" element={<Protected_route Component={Navbar_New}/>}></Route>
          <Route path="/Company/" element={<Protected_route Component={CreateCompany}/>}></Route>
          <Route path="/forgetpassword/" element={<ForgetPassword/>}></Route>
          <Route path="/Company_list/" element={<Protected_route Component={Company_List}/>}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
