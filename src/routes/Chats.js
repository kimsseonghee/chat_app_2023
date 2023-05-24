import React from 'react';
import '../styles/Chats.scss';
import Header from '../components/Header';
import Tab from '../components/Tab';
import { TbMessageChatbot } from 'react-icons/tb';
import { FaSearch } from "react-icons/fa"
import lists from '../data/lists.json'
import Chat from '../components/Chat'

function Chats() {
  return (
    <>
    <body>
    <Header></Header>
    <div className='title_bar'>
        <h1>Chats</h1>
        <div className='left_item'><a href="#">
        </a></div>
    </div>
      <hr />
      <main>
        <form className="title_box">
          <fieldset className="title_inner">
            <legend className="blind">검색창</legend>
            <i><FaSearch/></i>
            <input type="search" name="search" id="search" 
            placeholder="검색어를 입력하세요." />
          </fieldset>
        </form>
        
        <section className="main_section">
          <header className="blind"><h2>Friends</h2></header>
          <ul>
          {lists.map(user=><Chat friendData={user}/>)}
          </ul>
        </section>
        <div className="chat_btn">
          <a href="#">
          <i><TbMessageChatbot/></i>
          </a>
        </div>
      </main>
      <hr />
      <Tab></Tab>
      </body>
    </>
  );
};

export default Chats;