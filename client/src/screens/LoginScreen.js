import axios from "axios";
import React, { useState } from "react";
import "./LoginScreen.css";
import { useDispatch } from "react-redux";

import { login } from "../features/userSlice";
const LoginScreen = () => {
  const [signin, setSignin] = useState(false);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const [loginemail,setloginEmail] = useState("")
  const [loginpassword,setloginPassword] = useState("");
  const [next,setNext] = useState(false)
  const signup =async() => {
    if(password!==""){
      
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!    
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
      const res = await axios.post("/user",{
        email:email,
        password:password,
        subscription:{plan:"Netflix Basic",expires:today}
      })
       if(typeof(res.data)==="object"){
         alert("Registered Successfully!!")
         setSignin(true)
       }else{
      alert(res.data)
      setNext(false)
       }
    }else{
      alert("Enter Password")
    }
  }
  
  const SignIn = async(e) => {
    e.preventDefault();
    const user = await axios.get("/user",{params:{loginemail,loginpassword}})
    if(typeof(user.data)=="string"){
      alert(user.data)
    }else{
      dispatch(
        login({
          email: user.data.email,
          subs: user.data.subscription
        })
      )
    }

  };
  const check=()=>{
    if(email.includes("@") && email.includes(".")){
      setNext(true)
    }else{
      alert("Please Enter valid Email Address")
    }
  }
  return (
    <div className="loginscreen">
      <div className="loginscreen__background">
        <img
          className="loginscreen__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        {signin ? (
          <button
            className="loginscreen__button"
            onClick={() => setSignin(false)}
          >
            Sign Up
          </button>
        ) : (
          <button
            className="loginscreen__button"
            onClick={() => setSignin(true)}
          >
            Sign In
          </button>
        )}
        <div className="loginscreen__gradient" />
      </div>
      <div className="loginscreen__body">
        {signin ? (
         <div className="signupscreen">
         <form>
           <h1>Sign In</h1>
           <input type="email" onChange={(e)=>{setloginEmail(e.target.value)}} placeholder="Email" />
           <input type="password" onChange={(e)=>{setloginPassword(e.target.value)}} placeholder="Password" />
           <button type="submit" onClick={SignIn}>
             Sign In
           </button>
           <h4>
             <span className="signupscreen__gray">Need to Netflix?</span>
             <span className="signupscreen__link" onClick={()=>setSignin(false)}>
              
               Sign Up now.
             </span>
           </h4>
         </form>
       </div>
          
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginscreen__input">
            
                {next?
                <>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" required/>
                <button
                  onClick={signup}
                  className="loginscreen__getstarted"
                >
                  WATCH NOW
                </button>
                </>
                :
                <>
                <input type="email" value={email}  onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Address" required/>
                <button
                  onClick={check}
                  className="loginscreen__getstarted"
                >
                  GET STARTED
                </button>
                </>
                }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
