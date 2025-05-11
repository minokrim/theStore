import React,{useState,useEffect} from "react";
import "../carousel/carousel.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Car(){
        const [products, setProducts] = useState([]);
        const responsive = {
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 3000 },
              items: 5
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };
    
        const GetProducts = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
                const data = await response.json();
                setProducts(data.slice(20,38));
            } catch (error) {
                console.error("Error fetching the products:", error);
            }
        };
    
        useEffect(() => {
            GetProducts();
        }, []);

        useEffect(() => {
            console.log(products); // Now logs updated products
          }, [products]);

    return <main className="carousel-box">
        <Carousel responsive={responsive} infinite={true} rewind={false} slidesToSlide={1} partialVisbile={true} rtl={false}>
            {products.map((product) => (
                    <div key={product.id} className="carousel-slide">
                        {console.log(product.images[0])}
                        <img src={product.images[0]} alt={product.title} className="images"/>
                        <h2 className="proddescription" id="desc">{product.title}</h2>
                    </div>
                ))}
        </Carousel>

    </main>
}