// import './App.css'
import Home from './pages/home/Home';
import Signin from './pages/Signin/Signin'
import Profile from './pages/profile/Profile';
import "./style.scss";
import { createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import PrivateRoutes from './components/PrivateRoutes';
import { AuthContext } from './context/authContext';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Stories from './components/stories/Stories';
import Posts from './components/posts/Posts';
import Admin from './pages/admin/Admin';
import Shop from './pages/shop/Shop';

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet/>
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
      ],
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/admin",
      element: <Admin />,
    }
  ]);

  return <RouterProvider router={router} />

}

export default App
