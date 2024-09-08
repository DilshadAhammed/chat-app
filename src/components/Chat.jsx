import React, { useEffect, useState, useRef } from 'react'
import {auth, db} from '../firebase-config'
import "./chat.css"
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';

export default function Chat({room}) {
    const scrollContainerRef = useRef(null);
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState([])
    const msgRef = collection(db, "messages");
    useEffect(()=>{
        const queryMsg = query(msgRef,where("room","==",room), orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMsg,(snap)=>{
            let messages  = [];
            snap.forEach((data)=>{
                messages.push({...data.data(), id: data.id});
            })
            setMessages(messages);
        });
        return () => unsuscribe();
        
    },[])

    useEffect(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, [messages]);

    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(msg === "") return;
        await addDoc(msgRef, {
            text: msg,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            profile: auth.currentUser.photoURL,
            room,
        });
        setMsg("");
    }

  return (
    <div className="chat">
        <div className='messages' ref={scrollContainerRef}>
            {messages.map((data)=>{
                return(
                    <div key={data.id} className='msgs'>
                        <img src={data.profile} className = "p-img"/> 
                        <p className='msg'>{data.text}</p>
                    </div>
                )
            })}
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Type a message" value = {msg} onChange={(e) => setMsg(e.target.value)}/>
            <button type="submit"><img src="./send.svg" className='send'/></button>
        </form>
    </div>
    
  )
}
