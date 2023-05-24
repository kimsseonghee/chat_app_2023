import React, { useState } from 'react'
import 'styles/Chatting.scss';
import { Link } from 'react-router-dom';
import { db ,storage } from 'fbase';
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

function Chatting(props){
  const {chatObj:{first,id,attachmentUrl},isOwner,state:{email,images,userimg,message,name,profile_message}} = props
  const [editChattung,setEditChatting] = useState(false);

  const onDeletclick = async() =>{
    const ok = window.confirm("삭제하시겠습니까?")
    if(ok){
      const data = await deleteDoc(doc(db, "chatting", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef)
      }
    }
  }

  return (
    <>
      {isOwner ?(
        <div className="chat_box my" onClick={()=>setEditChatting((prev)=>!prev)}>
          <span className='chat' key={id}>{first}{attachmentUrl && <img src={attachmentUrl} alt=''/>}</span>
          {editChattung && <button className='btn delet' onClick={onDeletclick}>
            <a>삭제</a>
          </button>}
          <span className="chat_time"><span>15 : 33</span></span>
        </div>
      ):(
        <div className="chat_box friend">
          <Link to={'/'} state={{email,images,userimg,message,name,profile_message}}>
          <span className='profile_img empty' style={{backgroundImage: `url(${userimg}`}}></span>
          </Link>
          <span className='profile_name'>{name}</span>
          <span className='chat' key={id}>{first}{attachmentUrl && <img src={attachmentUrl} alt=''/>}</span>
          <span className="chat_time"><span>15 : 33</span></span>
        </div>
      )}
    </>
  )
}

export default Chatting