import React, { useState,useEffect } from "react";
import "../nav/dropdown.css"
export function Dropdown(props){
    const [category,setCategory]=useState([])

    function desclength(desc){
        if(desc.length>30){
            var d=desc.slice(0,40)
        }
        return d+"..."
    };
    const GetCategories=async()=>{
        try {
            const response=await fetch(`https://api.escuelajs.co/api/v1/categories/${props.id}/products`);
            const data=await response.json();
            setCategory(data.splice(1,6));
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetCategories();
    }, []);

    return <div className="dropMain">
            {category.map((category)=>(
                <div key={category.id} className="dropItem">
                    <section className="dropContent">
                        <img src={category.images[1] }alt="" />
                        <div>
                        <h4>{category.title}</h4>
                        <p id="desc">{desclength(category.description)}</p>
                        </div>
                    </section>
                </div>
            ))}
    </div>
}