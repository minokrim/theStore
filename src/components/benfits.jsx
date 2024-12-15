import React from "react";
import "../components/benfits.css"
function Benefit(props){
    return <div className="benefitMain">
        <section className="benefitcard">
            <img src={props.img} alt="" />
            <div>
                <h3>{props.heading}</h3>
                <p>{props.details}</p>
            </div>
        </section>
    </div>
}
export default Benefit