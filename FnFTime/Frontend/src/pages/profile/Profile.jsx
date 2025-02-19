import "./profile.scss";
import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdLanguage, MdEmail, MdLocationPin, MdEdit } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { BsPinterest } from "react-icons/bs";
import Posts from "../../components/posts/Posts";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import axios from "axios";

export default function Profile() {
  const { currentUser, fetchCurrentUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilepic", selectedFile);
    try {
      const res = await axios.post(`http://localhost:7777/user/${currentUser._id}/profilepic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message);
      fetchCurrentUser(currentUser._id); // Refresh user data
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture");
    }
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/3509971/pexels-photo-3509971.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="cover"
        />
        <div className="profilePicContainer">
          <img
            src={currentUser.profilepic.startsWith("http") ? currentUser.profilepic : `http://localhost:7777/${currentUser.profilepic}`}
            alt=""
            className="profilePic"
          />
          <label htmlFor="fileInput">
            <MdEdit className="editIcon" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <button className="uploadButton" onClick={handleUpload}>
              Upload
            </button>
          )}
        </div>
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="#">
              <BiLogoFacebook fontSize="large" />
            </a>
            <a href="#">
              <AiOutlineInstagram fontSize="large" />
            </a>
            <a href="#">
              <AiOutlineTwitter fontSize="large" />
            </a>
            <a href="#">
              <BiLogoLinkedin fontSize="large" />
            </a>
            <a href="#">
              <BsPinterest fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{currentUser.name}</span>
            <div className="info">
              <div className="item">
                <MdLocationPin />
                <span>India</span>
              </div>
              {/* <div className="item">
                <MdLanguage />
                <span>laman.dev</span>
              </div> */}
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <MdEmail />
            <FiMoreVertical />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
}