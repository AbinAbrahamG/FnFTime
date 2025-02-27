import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import "./comments.scss";

export default function Comments({ onSendComment, sendedComments }) {
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");

  const handleSendComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: Date.now(),
        desc: newComment,
        name: currentUser.name,
        userId: currentUser._id,
        profilePicture: currentUser.profilepic,
      };

      onSendComment(comment);
      setNewComment("");
    }
  };

  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilepic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleSendComment}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
      {sendedComments.map((newComment) => (
        <div className="comment" key={newComment.id}>
          <img src={newComment.profilePicture} alt="" />
          <div className="info">
            <span>You</span>
            <p>{newComment.desc}</p>
          </div>
          <span className="date">now</span>
        </div>
      ))}
    </div>
  );
}