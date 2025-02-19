import { useContext, useEffect, useState } from "react";
import "./rightBar.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export default function RightBar() {
  const { currentUser, fetchCurrentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:7777/user/${currentUser._id}`);
        setFriends(res.data.friends || []);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get('http://localhost:7777/suggestions');
        setSuggestions(res.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    if (currentUser && currentUser._id) {
      fetchFriends();
      fetchSuggestions();
    }
  }, [currentUser]);

  const handleAddFriend = async (friendId) => {
    try {
      const res = await axios.post(`http://localhost:7777/user/${currentUser._id}/addFriend`, { friendId });
      setFriends((prevFriends) => [...prevFriends, { _id: friendId }]);
      setSuggestions((prevSuggestions) => prevSuggestions.filter((user) => user._id !== friendId));
      fetchCurrentUser(currentUser._id);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {suggestions.map((user) => (
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img
                  src={user.profilepic.startsWith("http") ? user.profilepic : `http://localhost:7777/${user.profilepic}`}
                  alt=""
                />
                <span>{user.name}</span>
              </div>
              <div className="buttons">
                <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                <button onClick={() => setSuggestions((prevSuggestions) => prevSuggestions.filter((u) => u._id !== user._id))}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Online Friends</span>
          {friends.length > 0 ? (
          friends.map((friend) => (
            <div className="user" key={friend._id}>
              <div className="userInfo">
                <img
                  src={friend.profilepic && friend.profilepic.startsWith("http") ? friend.profilepic : `http://localhost:7777/${friend.profilepic}`}
                  alt=""
                />
                <div className="online" />
                <span>{friend.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No friends online</p>
        )}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <p>
                <span>Jane Steale</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/2701660/pexels-photo-2701660.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <p>
                <span>Jorge Filho</span> changed their cover picture
              </p>
            </div>
            <span>6 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <p>
                <span>Rone Bob</span> changed their cover picture
              </p>
            </div>
            <span>12 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <p>
                <span>Dani Cavier</span> changed their cover picture
              </p>
            </div>
            <span>19 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
