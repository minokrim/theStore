import React,{useState,useEffect} from "react";
import "../carousel/carousel.css"
function Carousel(){
    const [products, setProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1);

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
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => {
                if (prevSlide + direction >= products.length || prevSlide + direction < 0) {
                    setDirection(-direction);
                    return prevSlide + direction;
                } else {
                    return prevSlide + direction;
                }
            });
        }, 2000); 

        return () => clearInterval(timer);
    }, [products.length, direction]);

    

    
    return <div>
        <div className="carousel-box">
        <div className=".carousel-container">
            <section  className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * (100/products.length)}%)` }}>
                {products.map((product) => (
                    <div key={product.id} className="carousel-slide">
                        <img src={product.images[0]} alt={product.title} className="images"/>
                        <div className="proddescription" id="desc">{product.title}</div>
                    </div>
                ))}
            </section>
        </div>
        </div>
    </div>
}
export default Carousel