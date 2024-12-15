import React, { useEffect, useState } from "react";
import "./suggestedProduct.css"
import { useParams,Link } from "react-router-dom";
export default function Suggested(){
    const [product,setProduct]=useState([])
    const [randomimages,setrandomimages]=useState([])
    const {category}=useParams()
    
    const getproduct=async()=>{
        try{
            const response=await fetch(`https://api.escuelajs.co/api/v1/categories/${category}/products`)
            const data=await response.json()
            setProduct(data.slice(0,8))
        }
        catch(error){
            console.log(error)
        }
    };
    function randomimage() {
        const image = [];
        const maxItems = Math.min(8, product.length);
        const usedIndices = new Set();
        
        while (image.length < maxItems) {
            const randomIndex = Math.floor(Math.random() * product.length);
            if (!usedIndices.has(randomIndex)) {
                image.push(product[randomIndex]);
                usedIndices.add(randomIndex);
            }
        }
        
        setrandomimages(image);
    }

    function desclength(desc){
        if(desc.length>30){
            var d=desc.slice(0,20)
        }
        return d+"..."
    };

    useEffect(()=>{
        getproduct()
    },[]);

    useEffect(() => {
        if (product.length > 0) {
            randomimage();
        }
    }, [product]);

    return <div className="suggestions">
        <h1>Recommendations</h1>
        <section>
        {randomimages.map((products=>(
            <div key={products.id} className="suggestionsbody">
                <Link to={`/product/${products.id}/${products.category.id}`}>
                <img src={products.images[0]} alt="" className="suggestedImage"/>
                </Link>
                <section className="suggesteddetails">
                    <p>{desclength(products.title)}</p>
                    <h5>${products.price}.00</h5>
                </section>
                <div className="category">
                <h4>{products.category.name}</h4>
                </div>
            </div>
        )))}
        </section>
    </div>
}