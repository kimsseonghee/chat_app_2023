import React from 'react'
import { FaPlane,FaWifi,FaMoon,FaBluetoothB,FaBatteryFull } from "react-icons/fa";
import '../styles/Header.scss';

function Header() {
  return (
    <>
    <header>
      <div className='status_bar'>
        <div className='left_item'>
          <div className='icons'><FaPlane/></div>
          <div className='icons'><FaWifi/></div>
        </div>
        
        <div className='center_item'>
          <span className='time'>17:33</span>
        </div>
        <div className='right_item'>
          <div className='icons'><FaMoon/></div>
          <div className='icons'><FaBluetoothB/></div>
          {/* <div className='icons'>100%</div> */}
          <div className='icons'><FaBatteryFull/></div>
        </div>
      </div>
    </header>  
    </>
  )
}

export default Header