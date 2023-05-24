import React from 'react'
import { FaInfoCircle,FaUtensils,FaStore,FaTv,FaPencilAlt,FaGraduationCap,FaBuilding,FaWonSign,FaVideo,FaAngleRight } from "react-icons/fa";
import { BsGearFill } from 'react-icons/bs';
import '../styles/More.scss';
import Tab from '../components/Tab';
import Header from 'components/Header';
import nameData from '../routes/name.json';
import { Link, useNavigate } from 'react-router-dom'
import { authService } from 'fbase';

function More() {
  const navigate = useNavigate();
  const onLogOutClick = ()=>{
    authService.signOut();
    navigate('/')
  }

  return (
    <>
    <Header></Header>
      <div className='title_bar'>
        <h1>Setting</h1>
        <div className='right_item'><a href="#">
        </a></div>
      </div>

    <main>
      <section className='user_info'>
        <h2 className='blind'>사용자 정보</h2>

        <span className='profile_info'>
        {nameData.map(user => (
            <li key={user.id}>
            <Link to={'/Profile'} state={
                  {
                    name: user.name,
                    id: user.id,
                    img: user.images,
                    comment:user.comment,
                  }}>
                  <span className='profile_img empty'>{user.img}</span>
                  <span className="profile_name">{user.name}</span>
                  <span className="profile_email">
                    Userid@gmail.com</span>
               </Link> 
            </li>
        ))}

        </span>
        <span className='chat_img'><a href='#'>
          <BsGearFill onClick={onLogOutClick}/>
        </a></span>
      </section>
      <section className='plus_friends'>
          <h2>Plus Friends<span><FaInfoCircle/> Learn More</span></h2>
        <ul className='plus_list'>
          <li><a href='#'><FaUtensils/>Order</a><div className='icon'><FaAngleRight/></div></li>
          <li><a href='#'><FaStore/>Store</a><div className='icon'><FaAngleRight/></div></li>
          <li><a href='#'><FaTv/>TV Channel/Radio</a><div className='icon'><FaAngleRight/></div></li>
          <li><a href='#'><FaPencilAlt/>Creation</a><div className='icon'><FaAngleRight/></div></li>
          <li><a href='#'><FaGraduationCap/>Education</a><div className='icon'><FaAngleRight/></div></li>
          <li><a href='#'><FaBuilding/>Politics/Society</a><div className='icon'><FaAngleRight/></div></li>
          <li><a href='#'><FaWonSign/>Finance</a><div className='icon'><FaAngleRight/></div></li>
          <li><a href='#'><FaVideo/>Movies/Music</a><div className='icon'><FaAngleRight/></div></li>
        </ul>
      </section>
    </main>
    <Tab></Tab>
    </>
  )
}

export default More