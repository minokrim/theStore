import React from "react";
import logo from "../images/logo.png"
import "./footer.css"
export default function Footer(){
    return <div className="navBody">
        <section className="navTop">
            <div className="navTopSec1">
                <img src={logo} alt="" />
                <h4></h4>
            </div>
            <div className="navTopSec2">
                <section className="navTopContent">
                    <h3>The Store</h3>
                    <p>About Us</p>
                    <p>Services</p>
                    <p>Teztimonials</p>
                    <p>Contact Us</p>
                </section>

                <section className="navTopContent">
                    <h3>Socials</h3>
                    <p>Linked in</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                    <p>Facebook</p>
                </section>

                <section className="navTopContent">
                    <h3>Legal</h3>
                    <p>Prvacy</p>
                    <p>Terms</p>
                    <p>Conditions</p>
                    <p>Refunds</p>
                </section>
            </div>
        </section>
    </div>
}