import "./createpost.scss";
import Image from "../../assets/img.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";

export default function CreatePost() {
  const { currentUser, fetchCurrentUser } = useContext(AuthContext);
  const [post, setPost] = useState({
    userId: '',
    content: '',
    likes: '',
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('userId', currentUser._id);
    formData.append('content', post.content);
    if (file) {
      formData.append('file', file);
    }

    try {
      const res = await axiosInstance.post('http://localhost:7777/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
      fetchCurrentUser(currentUser._id);
      navigate('/');
    } catch (err) {
      alert('Failed to post');
    }
  };
  useEffect(()=>{
    setPost({...post,userId: currentUser._id,
        content:'',
        likes:''})
    },[currentUser])

  return (
    <div className="create">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilepic.startsWith("http") ? currentUser.profilepic : `http://localhost:7777/${currentUser.profilepic}`} alt={currentUser.name} />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image/Video</span>
              </div>
            </label>
            {/* <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div> */}
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}