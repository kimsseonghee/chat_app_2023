import React, { useEffect, useState } from 'react'
import '../styles/Index.scss';
import { Link } from 'react-router-dom'
import lists from 'data/lists.json'
import Tab from '../components/Tab';
import Header from 'components/Header';
import Friendlist from 'components/Friendlist';
import { collection, onSnapshot ,query, orderBy} from "firebase/firestore";
import { db  } from 'fbase';
import { FaSearch } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';

function Main({user}) {
  const [Message,setMessage] = useState('');
  useEffect(() => {
    const q = query(collection(db, `message`),
                  orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(newArray);
        if(newArray.length > 0){
          setMessage(newArray[0].text)
        }
    });
  },[]);

  return (
    <>
    <Header></Header>
    <div className='title_bar'>
        <h1>Friend
        </h1>
        <div className='left_item'><a href="#">
        </a></div>
        <div className='right_item'><a href="#"><BsGearFill/></a></div>
    </div>

    <main>
      <form className='search_box'>
        <fieldset className='search_inner'>
          <legend className='blind'>검색창</legend>
          <div className='icon'><FaSearch/></div>
          <input type="search" name='search' id='search' placeholder='검색어를 검색하세요.'/>
        </fieldset>
      </form>
      <section className='main_section'>
      <p>My Profile</p>
      <ul>
      <li>
          <Link to={'/Profile'}>
          <span className='profile_img empty' style={user.photoURL ? {backgroundImage: `url(${user.photoURL})`} : {}}></span>
          <span className='profile_name'>{user.displayName}</span>
          {Message ? (<span className='profile_messages'>{Message}</span>):(<></>)}
          </Link>
      </li>

      </ul>
      <p>Friends</p>
      <ul>
        {lists.map(user=><Friendlist friendData={user}/>)}
      </ul>
      </section>
    </main>
    <Tab/>
    </>
  )
}

export default Main