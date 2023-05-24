import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Tab.scss';
import { FiUser } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';
import { BsBookmarks } from 'react-icons/bs';

function Tab() {
  return (
    <div>
    <nav className='tab_bar'>
      <ul>
        <li><Link to={'/'}><div className='icon'><FiUser/></div><a>Friends</a></Link></li>
        <li><Link to={'/chats'}><div className='icon'><AiOutlineMessage/></div><a>Chats</a></Link></li>
        <li><Link to={'/find'}><div className='icon'><BsBookmarks/></div><a>Find</a></Link></li>
        <li><Link to={'/more'}><div className='icon'><IoEllipsisHorizontalOutline/></div><a>More</a></Link></li> 
      </ul>  
    </nav>      
    </div>
  )
}

export default Tab