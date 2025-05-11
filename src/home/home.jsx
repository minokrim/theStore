import React, { useEffect, useState } from "react";
import "../home/home.css"
import loading from "../images/limage.jpg";
import spinner from "../images/loading.png"
import { Link } from "react-router-dom";
import Nav from "../nav/nav";
function Home() {
    const [products, setProducts] = useState([]);
    const [loadingState,setLoadingState]=useState(false)

    const GetProducts = async () => {
        setLoadingState(true)
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
            const data = await response.json();
            setProducts(data.splice(1,60));
            setLoadingState(false)
        } catch (error) {
            console.error("Error fetching the products:", error);
        }
    };

    useEffect(() => {
        GetProducts();
    }, []);
    return (
        <div>
            <section className="homeBodySection">
                {products.map((product) => (
                    <div key={product.id} className="productBorder">
                        <Link to={`/product/${product.id}/${product.category.id}`}>
                        <img src={loadingState?loading:product.images[0]||product.images[1]||product.images[2]} alt={product.title} 
                        onError={(e) => { e.target.src = loading; }}/>
                        </Link>
                        <div className="productDetails">
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Home;
