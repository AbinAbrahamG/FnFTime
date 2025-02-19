import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './admin.scss';
import Navbar from '../../components/navbar/Navbar';
import { DarkModeContext } from '../../context/darkModeContext';

export default function Admin() {
    const { darkMode } = useContext(DarkModeContext);
    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://fnftime.onrender.com/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://fnftime.onrender.com/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
    <div className="admin">
      <h1>All Users</h1>
      <div className="users-list">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <img src={user.profilepic.startsWith("http") ? user.profilepic : `https://fnftime.onrender.com/${user.profilepic}`} alt={user.name} />
            <div className="user-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}