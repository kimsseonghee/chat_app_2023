import React, { useEffect, useState } from 'react'
import 'styles/Chatting.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Chatting from 'components/Chatting';
import { db ,storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString ,getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, onSnapshot ,orderBy } from "firebase/firestore";
import { FaBatteryFull, FaBluetoothB, FaMoon, FaPaperPlane, FaPlane, FaPlus, FaTrash, FaWifi } from 'react-icons/fa';
import { TbChevronLeft } from 'react-icons/tb';

function Chattings({user}) {
  const location = useLocation();

  const navigate = useNavigate();
  if(location.state === undefined){
    navigate('/');
  }

  const {email,images,userimg,message,name,profile_message,id} = location.state;
  
  const messages = message.map((list,index)=>{
    return <span key={index} className="chat">{list}</span>
  })

  const [chat,setChat] = useState("");
  const [chats,setChats] = useState([]);
  const [attachment,setAttachment] = useState("");

  useEffect(()=>{
    const q = query(collection(db, "chatting"), orderBy('createdAt',"asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id});
      });
      setChats(newArray)
    });
  },[])

  const onChat = (e)=>{
    const {target:{value}}=e;
    setChat(value)
  }

  const onSubmit = async(e)=>{
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage,`${user.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url')
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))
      }
      const docRef = await addDoc(collection(db, "chatting"), {
        first: chat,
        createdAt:Date.now(),
        creatorID: user.uid,
        attachmentUrl
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setChat('');
    setAttachment('')
  }

  const onFileChange = (e)=>{
    const {target:{files}} = e;
    const thefile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finish)=>{
      const{currentTarget:{result}} = finish
      setAttachment(result)
    }
    reader.readAsDataURL(thefile)
  }
  
  const onclearAttachment = (e) =>{
    e.preventDefault();
    setAttachment("");
  }

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
          <div className='icon'><FaMoon/></div>
          <div className='icon'><FaBluetoothB/></div>
          <div className='icon'><FaBatteryFull/></div>
        </div>
      </div>
      <div className='title'>
      <Link to={'/Chats'}>
        <div className='left_item'><TbChevronLeft/></div></Link>
        <h1>{name}</h1>
      </div>
    </header>  
    
    <div className='chatting'>  
      <main className='chatting'>
        <span className="date_info">Thursday,March 23,2023</span>
        <div className="chat_box my">
          <span className='chat'>안뇽</span>
          <span className="chat_time"><span>15</span>: <span>33</span></span>
        </div>

        <div className="chat_box other">
          <div classNames="other_info">
          <Link to={'/friend'} state ={{email,images,userimg,message,name,profile_message}}>
            <span class="profile_imgs empty" style={{backgroundImage: `url(${userimg}`}}></span>
          </Link>
            <span className="profile_name">{name}</span>
            <span className='chats'>{messages}</span>
            <span className="chat_time"><span>15</span>: <span>33</span></span>
          </div>
        </div>
        <>
          {chats.map(chat =>(
          <Chatting key={chat.id} chatObj={chat} 
          isOwner={chat.creatorID === user.uid} 
          state ={{email,images,userimg,message,name,profile_message,id}}/>
          ))}
        </>
      </main>
      <footer>
        <form onSubmit={onSubmit}>
          <fieldset>
            <label for="chatting" className='blind'>채팅입력</label>
            <input type="text" id="chatting" className='text_box' onChange={onChat} value={chat}/>
            <label htmlFor='img' className='chat_plus'>
                <FaPlus/>
            </label>
            <input type='file' accept='image/*' id='img' onChange={onFileChange} style={{display:'none'}}/>
            <label htmlFor='sub' className='submit'>
                <FaPaperPlane/>
            </label>  
            <input type='submit' id='sub' value='전송' style={{display:'none'}}/>
            {attachment && (
              <div className='img'>
                <img src={attachment} alt=''/>
                <button ><FaTrash/></button>
              </div>
            )}
          </fieldset>
        </form>
      </footer>
    </div>
    </>
  )
}

export default Chattings