import React, { useEffect, useState } from "react";
import loading from "../images/limage.jpg";
import { useParams } from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/footer";
import clothvideo from "../images/clothvideo.mp4"
import electronicsvideo from "../images/electronicsvideo.mp4"
import furniturevideo from "../images/furniturevideo.mp4"
import shoesvideo from "../images/shoevideo.mp4"
import miscvideo from "../images/miscelleniousvideo.mp4"
import "./catbody.css"
export default function Catbody(){
    const [category,setCategory]=useState([])
    const [loadingState,setLoadingState]=useState(false)
    const {id}=useParams()

    const getCategory=async()=>{
        setLoadingState(true)
        try {
            const response=await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`)
            const data=await response.json();
            setCategory(data)
            console.log(data)
            setLoadingState(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategory()
    },[])
    
    return <div className="catmain">
        <Nav/>
        <section className="videoContainer">
                        <video autoPlay loop muted>
                            <source src={id==1?clothvideo:id==2?electronicsvideo:id==3?furniturevideo:id==4?shoesvideo:miscvideo} type="video/mp4"/>
                        </video>
                    </section>
        <section className="catBody2">
            {category.map((cat)=>(
                <div key={cat.id} className="catBorder">
                    <img src={loadingState?loading:cat.images[0]} alt={cat.title} onError={(e) => { e.target.src = loading; }}/>                    
                    <div className="catDetails">
                        <h3>{cat.title}</h3>
                        <p>${cat.price}</p>
                    </div>
                </div>
            ))}
        </section>
        <Footer/>
    </div>
}