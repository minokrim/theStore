import React, { useState } from "react";
import "./signin.css"
import logo from "../images/logo.png"
import Footer from "../footer/footer";
import axios from "axios"
import google from "../images/search.png"
export default function Signin(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    function signin(){
        const details={
            email:email,
            password:password
        }
        axios.post("http://localhost:8001/signin/post",details)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function googlesignin(){
        window.location.href = "http://localhost:8001/auth/google";
    }

    return <div className="signinMain">
        <section className="navContainer">
        <img src={logo} alt="" />
        </section>
        <div className="signinBorder">
        <section className="signinBody">
            <h1>User Sign in</h1>
            <form action="/submit" method="post">
            <div className="details">
                <p>Email Address</p>
                <input type="text" name="email" id="" placeholder="Your email address" onChange={((e)=>{setEmail(e.target.value)})}/>
            </div>
            <div className="details"> 
                <p>Password</p>
                <input type="password" name="password" id="" onChange={((e)=>setPassword(e.target.value))}/>
            </div>
            </form>
            <button className="signinbtn" onClick={signin}>Sign in</button>
            <div className="divider">
                <p></p>
                <h3>OR</h3>
                <p></p>
            </div>
            <section className="google">
                <div>
                    <img src={google} alt="" />
                    <button onClick={googlesignin}>Sign in with Google</button>
                </div>
            </section>
        </section>
        </div>
        <Footer/>
    </div>
}