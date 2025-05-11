import React, { useEffect, useState } from "react";
import "./wishlist.css"
import Nav from "../nav/nav";
import Footer from "../footer/footer";
import close from "../images/close.png"
import banner from "../images/shopping.jpg"
import Swal from "sweetalert2";
export default function Wishlist(){
    const [items,setItems]=useState([])
        const [product,setProduct]=useState(null)
        const [cart,setCart]=useState([])
    
    useEffect(()=>{
        const wishlist=JSON.parse(localStorage.getItem("items"))
        setItems(wishlist)
    },[])

    function handleRemove(index) {
        const updatedItems = [...items]
        updatedItems.splice(index, 1)
        setItems(updatedItems)
        localStorage.setItem("cart", JSON.stringify(updatedItems))
    }

        function addToCart(){
            const cartData={
                id:product.id,
                title:product.title,
                price:product.price,
                image:product.images[0]
            }
            setCart((prevCart)=>{
                const itemInCart=prevCart.some(item=>item.id===cartData.id)
                if(itemInCart){
                    return (prevCart)
                }
                else{
                const newCart=[...prevCart,cartData]
                localStorage.setItem("cart",JSON.stringify(newCart))
                return newCart
                }
            })
            Swal.fire({
                title: "Successfully added to cart!",
                icon: "success",
                draggable: true
              });
        }

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
                        {items.map((item,index) => (
                            <tr key={item.id} className="itemDetails">
                                <td className="prodDetails">
                                    <img src={close} alt="close button"  className="close" onClick={() => handleRemove(index)}/>
                                    <img src={item.image} alt="product" className="prod-image"/>
                                    <p>{item.title}</p>
                                </td>
                                <td>${item.price}.00</td>
                                <td>In stock</td>
                                <td className="add2cart"><button onClick={addToCart}>Add To Cart</button></td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </section>
        <Footer/>
    </div>
}