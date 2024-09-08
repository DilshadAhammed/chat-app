import { useState, useRef } from "react"
import Auth from "./components/Auth"
import Chat from "./components/Chat";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);
  if (!isAuth) {
    return (
      <div>
        <Auth setAuth={setIsAuth}/>
      </div>
    );
  }
  const handleSignOut = async () =>{
    await signOut(auth)
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null)
  }

  return (
    <>
      {room ? (
        <Chat room={room}/>
      ): (
        <div className="room">
          <input type="text" ref={roomInputRef} placeholder="Enter your Room Name:"/>
          <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>          
        </div>
        )}
        <button onClick={handleSignOut} className="sign-out">Sign Out</button>
    </>

  )
}

export default App;
