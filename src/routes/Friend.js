import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaPlane, FaWifi, FaMoon, FaBluetoothB, FaBatteryFull, FaUserAlt, FaComment,FaPhone, FaGift } from 'react-icons/fa';
import '../styles/Friend.scss';

function Friend() {
  const location = useLocation();

  const navigate = useNavigate();
  if(location.state === undefined){
    navigate('/');
  }

  const {email,images,userimg,message,name,profile_message,id} = location.state;

  return (
    <>
    <div className='statusBar F'>
        <div className='left_item'>
          <div className='icon'><FaPlane/></div>
          <div className='icon'><FaWifi/></div>
        </div>
        <div className='center_item'>
          <span>15</span>:<span>33</span>
        </div>
        <div className='right_item'>
          <div className='icon'><FaMoon/></div>
          <div className='icon'><FaBluetoothB/></div>
          <div className='icon'><FaBatteryFull/></div>
        </div>
    </div>
    <div className='title_bar'>
      <h1 className='blind'>Profile</h1>
      <div className='left_btn'>
      <Link to={"/"}><p>X</p></Link>
      </div>
      <div className='right_btn'><FaUserAlt/></div>
    </div>
    <main>
    <section className='background' style={{ backgroundImage: `url(${images}` }}>
      <h2 className='blind'>My profle background image</h2>
    </section>
    <section className='profile'>
      <h2 className='blind'>my profile info</h2>
      <div className='profile_img empty' style={{backgroundImage: `url(${userimg}`}}></div>
      <div className='profile_content'>
        <span className="profile_name">{name}</span>
        <span className="profile_email">{email}</span>
        <span className='profile_message'>{profile_message}</span>
      </div> 
      <ul className="profile_menu">
        <li>
          <Link to={'/Chatting'} state={{email,images,userimg,message,name,profile_message,id}}>
            <span><FaComment/></span>
          </Link>
          Chatting
        </li>
        <li><span><FaPhone/></span>Call</li>
        <li><span><FaGift/></span>Gift</li>
      </ul>
    </section>
    </main>
    </>
  )
}

export default Friend