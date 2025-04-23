import React,{useState,useEffect} from "react";
import "./product.css"
import cart from "../images/shopping-cart (2).png"
import wish from "../images/heart.png"
import Nav from "../nav/nav";
import { useParams } from "react-router-dom";
import Suggested from "./suggestedProduct";
import Footer from "../footer/footer";
import Swal from 'sweetalert2';
export default function Product(){
    const [product,setProduct]=useState(null)
    const [items,setItems]=useState([])
    const [cart,setCart]=useState([])
    const {id}=useParams()
    const getProduct=async()=>{
        try{
            const response=await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
            const data=await response.json()
            setProduct(data)
        }
        catch(error){
            console.log(error)
        }
    }

    function changeimage1(){
        var newimage=document.getElementById("smallimage1").src
        document.getElementById("bigimage").src=newimage
    }
    function changeimage2(){
        var newimage=document.getElementById("smallimage2").src
        document.getElementById("bigimage").src=newimage
    }
    function changeimage3(){
        var newimage=document.getElementById("smallimage3").src
        document.getElementById("bigimage").src=newimage
    }

    useEffect(() => {
        getProduct();
    }, [id]);
    
    useEffect(()=>{
        const oldWishlistData=JSON.parse(localStorage.getItem("items"))||[];
        setItems(oldWishlistData)

        const oldCartData=JSON.parse(localStorage.getItem("cart"))||[]
        setCart(oldCartData)
    },[])

    function addToWishlist(){
        const wishlistData={
            id:product.id,
            title:product.title,
            price:product.price,
            image:product.images[0]
        }
        setItems((prevItems)=>{
            const itemInList=prevItems.some(items=>items.id===wishlistData.id);
            if(itemInList){
                return(prevItems)
            }
            else{
                const newWishlist=[...prevItems,wishlistData]
                localStorage.setItem("items",JSON.stringify(newWishlist))
                return newWishlist;
            }
        })
        Swal.fire({
            title: "Successfully added to wishlist!",
            icon: "success",
            draggable: true
          });
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

    return <div>
        <Nav/>
        <section>
            {product?(
                <div key={product.id} className="productBody">

                    <section className="productSec1">
                    <img src={product.images[1]} alt="" className="bigimage" id="bigimage"/>
                    <div className="smallimagecontainer">
                    <img src={product.images[0]} alt="" className="smallimage" id="smallimage1" onClick={changeimage1}/>
                    <img src={product.images[1]} alt="" className="smallimage" id="smallimage2" onClick={changeimage2}/>
                    <img src={product.images[2]} alt="" className="smallimage" id="smallimage3" onClick={changeimage3}/>
                    </div>
                    </section>

                    <section className="productsec2">
                        <div className="productcart">
                            <p className="wishlist" onClick={addToWishlist}><img src={wish} alt="" /> Wishlist</p>
                            <hr />
                            <p className="a2c" onClick={addToCart}><img src={cart} alt="" /> Add to cart</p>
                        </div>
                        <h5>{product.title}</h5>
                        <h4>${product.price}.00</h4>
                        <hr className="productcartDivider"/>
                        <h3>Description</h3>
                        <h4 className="productDescription">{product.description}</h4>
                    </section>
                        </div>
            ):(<p>Loading...</p>)}
        </section>
        <Suggested/>
        <Footer/>
    </div>
}