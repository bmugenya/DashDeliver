import React, { useState, useEffect } from 'react'
import '../assets/Chat.css'
import Avatar from "../components/Avatar";
// import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
// import MicIcon from '@mui/icons-material/Mic'
import { useParams } from 'react-router-dom'
// import VideocamIcon from '@mui/icons-material/Videocam'
import { url } from '../utils/url'
import { getChatAsync,addChatAsync } from "../features/driver/driverActions";
export const ChatContext = React.createContext()
import { useDispatch, useSelector } from 'react-redux'



export default function Chat({currentUser,sender}) {

  const dispatch = useDispatch();
  const [input, setInput] = useState('')
  const [group, setGroup] = useState([])
 const { chats } = useSelector((state) => state.drivers)
  const {id } = useParams()





  const sendMessage = (e) => {
    e.preventDefault()
    fetch(`${url}/chat`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input,
        deliverId: id,
        email: currentUser['email'],
      }),
    })

    setInput('')
     dispatch(getChatAsync(id));
  }



  useEffect(() => {
    
    if (id) {
      dispatch(getChatAsync(id));

    }
  }, [dispatch, id]);





  return (

        <div className='bar'>
      <div className='search'>
        <div className='container'>
         

    <div className="hidden md:block">
            <Avatar src={currentUser?.avatar_url} />
          </div>

     <div 

          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
           {sender}
        </div>





     </div>
      </div>



    <div className='chat'>
      <div className='chat_body'>
        {chats?.map((post) => (
          <p className={`chat_message ${post.email === currentUser?.email && 'chat_reciever'}`} key={post.timestamp}>
            <span className='chat_name'>{post.email}</span>
            {post.message}
            <span className='chat_time'>{post.timestamp}</span>
          </p>
        ))}
      </div>
      <div className='footer'>
  
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type a message'
            type='text'
          />
          <button onClick={sendMessage} type='submit'>
            send a message
          </button>
        </form>

      </div>
    </div>

     </div>
  )
}
