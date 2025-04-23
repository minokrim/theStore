import React, { useEffect, useState } from "react";
import "./wishlist.css"
import Nav from "../nav/nav";
import Footer from "../footer/footer";
import close from "../images/close.png"
import banner from "../images/shopping.jpg"
export default function Wishlist(){
    const [items,setItems]=useState([])
    useEffect(()=>{
        const wishlist=JSON.parse(localStorage.getItem("items"))
        setItems(wishlist)
        console.log(items)
    },[])
    return <div className="wishlist-main">
        <Nav/>
        <section className="wishlist-banner">
        <img src={banner} alt="" className="bannerimg"/>
        </section>
        <section className="wishlist-title">
            <h3>Home &gt; Wishlist</h3>
            <h2>Wishlist</h2>
        </section>
        <section className="Wishlist-body">
            <table>
                <thead>
                <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="prodDetails">
                                    <img src={close} alt="close button"  className="close"/>
                                    <img src={item.image} alt="product" className="prod-image"/>
                                    <p>{item.title}</p>
                                </td>
                                <td>${item.price}.00</td>
                                <td>In stock</td>
                                <td className="add2cart"><button>Add To Cart</button></td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </section>
        <Footer/>
    </div>
}