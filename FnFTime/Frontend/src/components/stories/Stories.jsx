import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";

export default function Stories() {
  const { currentUser } = useContext(AuthContext);

  const stories = [
    {
      id: 1,
      name: "Vlada",
      img: "https://images.pexels.com/photos/4873585/pexels-photo-4873585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Harold",
      img: "https://images.pexels.com/photos/17387766/pexels-photo-17387766/free-photo-of-adam-gunes-gozlugu-oturmak-masa.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Emma ",
      img: "https://images.pexels.com/photos/15130309/pexels-photo-15130309/free-photo-of-kisi-kadin-sik-modaya-uygun.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Lucy",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="stories">
      {currentUser && (
        <div className="story">
          <img src={currentUser.profilepic.startsWith("http") ? currentUser.profilepic : `https://fnftime.onrender.com/${currentUser.profilepic}`} alt={currentUser.name} />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      )}
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt={story.name} />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}
