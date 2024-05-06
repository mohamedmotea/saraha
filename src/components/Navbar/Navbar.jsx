import  { useContext } from "react";
import "./Navbar.css";
import logo from '../../assets/logo.jpeg'
import { Link } from "react-router-dom";
import { userToken } from "../../Context/Token";
export default function Navbar() {
  const {token,setToken} = useContext(userToken)
  const signOut = ()=>{
    localStorage.removeItem('token')
    setToken(null)
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand text-light" to="/">
            <img src={logo} alt="logo" className="rounded-circle ms-2" width={60} height={50}/>
            صارحني
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
        <i className="fa-solid fa-bars"></i>
      
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          
            <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page">
                  الرئيسية
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              {token ? <>
                <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  الملف الشخصي
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/messages">

                    الرسائل
                  </Link>
              </li>   
           
              </> : <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  اشتراك
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" >
                  تسجيل الدخول
                </Link>
              </li>   
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  تعليمات
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <a className="dropdown-item" href="#">
                    Action 1
                  </a>
                  <a className="dropdown-item" href="#">
                    Action 2
                  </a>
                </div>
              </li>

     
              </>}
         
          
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  اتصل بنا
                </Link>
              </li>
      
          
              {token ? <>
                <li className="nav-item">
                <Link className="nav-link" to="#" onClick={signOut}>
                  تسجيل الخروج
                </Link>
              </li>
              </> : <>
          
              </>}
            </ul>
        
          </div>
        </div>
      </nav>
    </>
  );
}
