import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Auth({setAuth}) {
    const signInWithGoogle = async () =>{
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setAuth(true)
        }catch(err){
            console.error(err);
        }
    }
  return (
    <>
        <div>
            <p className="s-message">Sign With Google To Continue</p>
            <button onClick={signInWithGoogle} className="s-btn">Sign in with Google</button>
        </div>
    </>
  )
}
