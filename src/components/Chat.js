import React from 'react'
import { Link } from 'react-router-dom';

function Chat({friendData}) {
  const {friendData:images,userimg,message,name} = friendData;
  return (
    <li>
      <Link to={'/Chatting'} state={friendData}>
        <span className="chats_img empty" style={{backgroundImage: `url(${userimg}`}}></span>
        <span className="chats_content">
          <span className="chats_name">{name}</span>
          <span className="chats_message">{message[1]}</span>
        </span>
        <span className="chats_time"><span>15</span>:<span>33</span></span>
      </Link>
    </li>
  )
}

export default Chat