import React from "react";
import "../homebody/body.css"
import { Suspense, lazy } from "react";
import Categories from "../categories/categories";
import Benefit from "../components/benfits";
import price from "../assets/best-price.png"
import support from "../assets/customer-care.png"
import secure from "../assets/secure-shield.png"
import truck from "../assets/truck.png"
import Nav from "../nav/nav";
import Footer from "../footer/footer";
import Car from "../carousel/carousel2";

const Component1=lazy(()=>import( "../home/home"));

function Body(){
    return <div className="main">
        <Nav/>

        <h1>NEW RELEASES</h1>
        {/* <Car/> */}

        <h2>Categories for you!</h2>

        <div className="cat">
        <Categories/>
        </div>
        
        <section className="sec1">
        <Benefit
        img={truck}
        heading="FREE SHIPPING"
        details="For all oders above $1000"
        />
        <Benefit
        img={secure}
        heading="SECURED PAYMENTS"
        details="ALL transactions are secured"
        />
        <Benefit
        img={support}
        heading="Customer Care"
        details="Get 24/7 support via chat"
        />
        <Benefit
        img={price}
        heading="Best Prices"
        details="We offer the best prices"
        />
        </section>
        <Suspense fallback={<div>Component1 are loading please wait...</div>}>
        <Component1/>
        </Suspense>
        {/* <Home/> */}
        <Footer/>
    </div>
}
export default Body