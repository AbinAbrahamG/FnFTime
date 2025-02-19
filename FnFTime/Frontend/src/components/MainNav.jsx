import React, { useContext } from 'react'
import Navbar from './navbar/Navbar'
import LeftBar from './leftBar/LeftBar'
import RightBar from './rightBar/RightBar'
import Home from '../pages/home/Home'
import { DarkModeContext } from '../context/darkModeContext'

function MainNav() {
    const { darkMode } = useContext(DarkModeContext);
    const Layout = () => {
        return (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
              <LeftBar />
              <div style={{ flex: 6 }}>
                <Home />
              </div>
              <RightBar />
            </div>
          </div>
        );
      };
  return (
    <>
        <Layout/>
    </>
  )
}

export default MainNav