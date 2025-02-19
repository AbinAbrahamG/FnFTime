import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiGrid, FiSun } from "react-icons/fi";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { FaPowerOff } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { AiFillShop } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";

export default function Navbar() {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser, fetchCurrentUser } = useContext(AuthContext);
  const navigate=useNavigate();
  function SessionExpire(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    navigate('/signin');
    window.location.reload();
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }} className="logo">
          FnFTime
        </Link>
        <div className="iconWrapper">
          <AiOutlineHome className="icon" />
          {darkMode ? (
            <FiSun onClick={toggle} className="icon" />
          ) : (
            <MdOutlineDarkMode onClick={toggle} className="icon" />
          )}
          <FiGrid className="icon" />
        </div>
        <div className="search">
          <BiSearchAlt2 className="icon" />
          <input type="text" placeholder="Search..." name="Search" />
        </div>
      </div>
      <div className="right">
        {/* <BsFillPersonFill className="icon" />
        <AiOutlineMail className="icon" />
        <IoMdNotificationsOutline className="icon" /> */}
        <div><span className="points">{currentUser.rewards} </span><span>RP</span></div>
        <Link to="/shop">
        <div className="shop"> 
        <AiOutlineShop />
        </div>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div className="user">
            <img src={currentUser.profilepic.startsWith("http") ? currentUser.profilepic : `http://localhost:7777/${currentUser.profilepic}`} alt="user" />
            <span>{currentUser.name}</span>
          </div>
        </Link>
        <FaPowerOff className="logout" onClick={SessionExpire}/>
      </div>
    </div>
  );
}
