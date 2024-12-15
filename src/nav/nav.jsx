import React, { useState } from "react";
import "../nav/nav.css";
import logo from "../images/logo.png"
import cart from "../images/shopping-cart (1).png"
import wish from "../images/wishlist.png"
import darrow from "../images/down-arrow.png"
import uarrow from "../images/up-arrow.png"
import { Dropdown } from "./dropdown";
import { Link } from "react-router-dom";
import hamburger from "../images/hamburger.png"
import hamburger2 from "../images/hamburgerwhite.png"

export default function Nav(){
    const [id,setid]=useState()
    function getclothid(){
        setid(1)
        let card=document.getElementById("dropdown");
        card.style.display="block"
        card.className = card.className.replace(/\bclass\d\b/g, '');
        card.classList.add("class1")
        var arrow=document.getElementById("arrow1");
        arrow.src=uarrow
    }
    function getelectid(){
        setid(2)
        let card=document.getElementById("dropdown");
        card.style.display="block"
        card.className = card.className.replace(/\bclass\d\b/g, '');
        card.classList.add("class2")
        var arrow=document.getElementById("arrow2");
        arrow.src=uarrow
    }
    function getfurnid(){
        setid(3)
        let card=document.getElementById("dropdown");
        card.style.display="block"
        card.className = card.className.replace(/\bclass\d\b/g, '');
        card.classList.add("class3")
        var arrow=document.getElementById("arrow3");
        arrow.src=uarrow
    }
    function getshoeid(){
        setid(4)
        let card=document.getElementById("dropdown");
        card.style.display="block"
        card.className = card.className.replace(/\bclass\d\b/g, '');
        card.classList.add("class4")
        var arrow=document.getElementById("arrow4");
        arrow.src=uarrow
    }
    function getphoneid(){
        setid(5)
        let card=document.getElementById("dropdown");
        card.style.display="block"
        card.className = card.className.replace(/\bclass\d\b/g, '');
        card.classList.add("class5")
        var arrow=document.getElementById("arrow5");
        arrow.src=uarrow
    }

    function removedropdown(){
        let card=document.getElementById("dropdown");
        card.style.display="none"
        var arrow=document.getElementsByClassName("arrow");
        for(var i=0;i<arrow.length;i++){
            arrow[i].src=darrow
        }
        
    }

    function handleClick(){
        var nav=document.getElementById("mobilenavigation")
        nav.style.display="none"
    }
    function handleClick2(){
        var nav=document.getElementById("mobilenavigation")
        nav.style.display="block"
    }
    
    return <div className="navmain">
        <section className="navFirstSection">
            <img src={logo} alt="" className="navlogo"/>
            <div className="navAction">
            <input type="text" placeholder="SEARCH..."/>
            <div className="navicons">
            <img src={cart} alt="" />
            <img src={wish} alt="" />
            <img src={hamburger} alt="" className="burger"onClick={handleClick2}/>
            </div>
            <Link to="/signin">
            <h2>SIGN IN</h2>
            </Link>
            </div>
        </section>
        <div className="mobilenav" id="mobilenavigation">
            <section className="menucont">
            <img src={hamburger2} alt="" id="burger2" onClick={handleClick}/>
            </section>
            <section className="mobilecat">
            <h4>CLOTHES</h4>
            <h4>ELECTRONICS</h4>
            <h4>FURNITURES</h4>
            <h4>SHOES</h4>
            <h4>PHONES</h4>
            </section>
        </div>
        <section className="navSecondSection">
            <h3 onMouseOver={getclothid} onMouseLeave={removedropdown}>Clothes <img src={darrow} alt="" id="arrow1" className="arrow"/></h3>
            <h3 onMouseOver={getelectid} onMouseLeave={removedropdown}>Electronics <img src={darrow} alt="" id="arrow2" className="arrow"/></h3>
            <h3 onMouseOver={getfurnid} onMouseLeave={removedropdown}>Furniture <img src={darrow} alt="" id="arrow3" className="arrow"/></h3>
            <h3 onMouseOver={getshoeid} onMouseLeave={removedropdown}>Shoes <img src={darrow} alt="" id="arrow4" className="arrow"/></h3>
            <h3 onMouseOver={getphoneid} onMouseLeave={removedropdown}>Phones <img src={darrow} alt="" id="arrow5" className="arrow"/></h3>
        </section>
        <section id="dropdown" className="dropdn">
        <Dropdown 
        key={id}
        id={id}
        />
        </section>
    </div>
}