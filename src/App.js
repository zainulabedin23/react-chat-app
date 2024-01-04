import { useEffect, useState } from "react";
import "./App.css";

import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const db = getDatabase();
  const chatListRef = ref(db, "chats");
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({name:result.user.displayName,email: result.user.email});
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const signOut=()=>signOut(auth).then(() => {
    setUser("");
  }).catch((error) => {
    console.error("Signout Error", error);
  });
  
  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };
  //
  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      // closure concept
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);
  const sendChat = () => {
    const chatRef = push(chatListRef);
    // chatref ek empty chat hai jisko
    // aapko push karna hai hatListRef
    set(chatRef, {
      user,
      message: msg,
    });
    setMsg("");
  };
  return (
    <div>
      {user.email ? null: (
        <div className="login-div">
          {/* <input
            type="text"
            placeholder="Enter name to start"
            onBlur={(e) => setName(e.target.value)}
          ></input> */}

          <button className="button-1" onClick={e=>{googleLogin()} }>login</button>
        </div>
      )}
      {user.email ? (
        <div>
          <h3>User: {user.name}</h3>
          <div className="chat-container" id="chat">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${c.user.email === user.email ? "me" : ""}`}
              >
                <p className="chatbox">
                  <strong>{c.user.name}: </strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              type="text"
              placeholder="enter your text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button onClick={(e) => sendChat()} className="button-3">
              send
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
