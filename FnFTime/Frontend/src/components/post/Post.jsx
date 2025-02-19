import { Link } from "react-router-dom";
import "./post.scss";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import {
  BiDotsHorizontalRounded,
  BiCommentDetail,
  BiSolidShareAlt,
} from "react-icons/bi";
import { useState } from "react";
import Comments from "../comments/Comments";
import Share from "../share/Share";

export default function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const [commentOpen, setCommentOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const [comments, setComments] = useState([]);

  const handleSendComment = (comment) => {
    setComments([...comments, comment]);
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
          {post.userId && (
            <>
            <img src={post.userId.profilepic.startsWith("http") ? post.userId.profilepic : `https://fnftime.onrender.com/${post.userId.profilepic}`} alt={post.userId.name} />
            <div className="details">
              <Link
                to={`/profile/${post.userId._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userId.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
            </>
          )}
          </div>
          <BiDotsHorizontalRounded />
        </div>
        <div className="content">
          <p>{post.content}</p>
          {post.file && (
            post.file.endsWith('.mp4') ? (
              <video controls>
                <source src={post.file} type="video/mp4" />
              </video>
            ) : (
              <img 
              src={post.file.startsWith("http")
                ? post.file
                : `https://fnftime.onrender.com/${post.file}`
              }
              alt="Post" />
            )
          )}
        </div>
        <div className="info">
          <div className="item">
            {isLiked ? (
              <MdFavorite onClick={handleLike} fontSize="22px" />
            ) : (
              <MdOutlineFavoriteBorder onClick={handleLike} fontSize="22px" />
            )}
            {likeCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <BiCommentDetail fontSize="22px" />
            {comments.length + 2} Comments
          </div>
          <div className="item" onClick={() => setShareOpen(!shareOpen)}>
            <BiSolidShareAlt fontSize="22px" />
            Share
          </div>
        </div>
        {commentOpen && (
          <Comments
            onSendComment={handleSendComment}
            sendedComments={comments}
          />
        )}
        {shareOpen && <Share />}
      </div>
    </div>
  );
}
