import React, { useState } from "react";
import Nav from "../Nav";
import "./ProfileScreen.css";

import { login } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import CurrencyFormat from "react-currency-format"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";
const ProfileScreen = () => {
  const history = useHistory()
  const stripe = useStripe();
  const elements = useElements();
  const [plan,setPlan] = useState("")
const user = useSelector(selectUser);
const [show,setShow] = useState(false);
const [price,setPrice] = useState("");
const dispatch = useDispatch();

  const signOut=()=>{
    dispatch(
      logout()
    )
  }
  const subscribe=async(event)=>{
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const amount = Math.floor(price)
        const response = await axios.post(
          "https://surajcodesnetflix.herokuapp.com/stripe/charge",
          {
            plan,
            email:user.email,
            amount,
            id,
          }
        );
        if (typeof(response.data) == "object") {
          alert("Subscription Added!!")
          history.replace("/profile")
          dispatch(
            login({
              email: response.data.email,
              subs: response.data.subscription
            })
          )
          setPlan("")
          setShow(false)
          setPrice("")
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(error.message);
    }
  }
  return (
    <div className="profilescreen">
      <Nav />
      
      <div className="profilescreen__body">
        <h1>Edit Profile</h1>
        <div className="profilescreen__info">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
            alt=""
          />
          <div className="profilescreen__details">
            <h2>{user.email}</h2>
            <div className="profilescreen__plans">
              <h3>Plans (Current Plan: {user.subs.plan})</h3>
              <h4>Renewal date: {user.subs.expires}</h4>
                  
              <div className={show?"none":"profilescreen__setplans"}>
              <div className="profilescreen__plan">
                    <div className="profilescreen__plantitle">
                    <h4>Netflix Basic</h4>
                    <h6>480p</h6>
                    </div>
                    {user.subs.plan==="Netflix Basic"?<button className="Selected">Current Package</button>:<button onClick={()=>{setShow(!show);setPrice(499);setPlan("Netflix Basic")}}>Subscribe</button>}
                  </div>
                  <div className="profilescreen__plan">
                    <div className="profilescreen__plantitle">
                    <h4>Netflix Standard</h4>
                    <h6>1080p</h6>
               
                    </div>
                    {user.subs.plan==="Netflix Standard"?<button className="Selected">Current Package</button>:<button onClick={()=>{setShow(!show);setPrice(649);setPlan("Netflix Standard")}}>Subscribe</button>}
                  </div>
                 
                  <div className="profilescreen__plan">
                    <div className="profilescreen__plantitle">
                    <h4>Netflix Premium</h4>
                    <h6>4K+HDR</h6>
                    </div>
                    {user.subs.plan==="Netflix Premium"?<button className="Selected">Current Package</button>:<button onClick={()=>{setShow(!show);setPrice(799);setPlan("Netflix Premium")}}>Subscribe</button>}
                  </div>
                  
              </div>
              <div className={show?"profilescreen__payment":"none"}>
                <div className="profilescreen__currency">
  <CurrencyFormat
                  renderText={(price) => <h3>Order Total: {price}</h3>}
                  decimalScale={2}
                  value={price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <h4>{plan}</h4>
                </div>
<CardElement
options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }}/>
  </div>
              {show?<button
                className="profilescreen__signout"
                onClick={subscribe}
              >
                Subscribe
              </button>:<button
                className="profilescreen__signout"
                onClick={signOut}
              >
                Sign Out
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
