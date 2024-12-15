import React,{useState,useEffect} from "react";
import "./cart.css"
import Nav from "../nav/nav";
import Footer from "../footer/footer";
import close from "../images/close.png"
import banner from "../images/banner2.jpg"
import checkout from "../images/checkout.jpg"
export default function Cart(){
    const [items,setItems]=useState([])
    useEffect(()=>{
        const wishlist=JSON.parse(localStorage.getItem("cart"))
        const updatedItems=wishlist.map(item=>({...item,quantity:1}))
        setItems(updatedItems)
        console.log(items)
    },[])
    function handleAdd(index){
        const updatedItems=[...items]
        updatedItems[index].quantity+=1;
        setItems(updatedItems)
    }
    function handleMinus(index){
        const updatedItems=[...items]
        if(updatedItems[index].quantity>1){
            updatedItems[index].quantity-=1;
        }
        setItems(updatedItems)
    }
    const totalCost = items.reduce((total, item) => total + item.price * item.quantity, 0);
    return <div className="cartBody">
        <Nav/>
        <section className="wishlist-banner">
        <img src={banner} alt="" className="bannerimg"/>
        </section>
        <section className="wishlist-title">
            <h3>Home &gt; Cart</h3>
            <h2>Cart</h2>
        </section>
        <section className="Wishlist-body cart-body">
            <table>
                <thead>
                <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                        {items.map((item,index) => (
                            <tr key={item.id}>
                                <td className="prodDetails">
                                    <img src={close} alt="close button"  className="close"/>
                                    <img src={item.image} alt="product image" className="prod"/>
                                    <p>{item.title}</p>
                                </td>
                                <td>${item.price}.00</td>
                                <td className="quantitySection">
                                    <div className="quantityCard">
                                    <p onClick={()=>handleMinus(index)}>-</p>
                                    <p className="quantity">{item.quantity}</p>
                                    <p onClick={()=>handleAdd(index)}>+</p>
                                    </div>
                                </td>
                                <td className="total">${item.price*item.quantity}.00</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </section>
        <section className="cartCheckout">
            <img src={checkout} alt=""className="checkoutImg" />
            <div className="cartCheckout-body">
            <div className="row">
            <h5>Subtotal</h5>
            <p>${totalCost}.00</p>
            </div>
            <div className="row">
            <h5>Discount</h5>
            <p>0%</p>
            </div>
            <div className="row">
            <h5>Shipping</h5>
            <p>Free</p>
            </div>
            <hr />
            <div className="row">
            <h5>Total</h5>
            <p>${totalCost}.00</p>
            </div>
            <button>Proceed To Checkout</button>
            </div>
        </section>
        <Footer/>
    </div>
}