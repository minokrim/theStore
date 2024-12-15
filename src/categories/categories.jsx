import React ,{useState,useEffect}from "react";
import "../categories/categories.css"
import { Link } from "react-router-dom";
function Categories(){
    const [categories, setCategories] = useState([]);
    const Getcategories = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/categories`);
            const data = await response.json();
            setCategories(data.slice(0,5));
        } catch (error) {
            console.error("Error fetching the products:", error);
        }
    };

    useEffect(() => {
        Getcategories();
    }, []);

    const getClassName = (index) => {
        return `catBody bg-color-${(index % 8) + 1}`;
    };

    return <div>
        <section className="catsection">
        {categories.map((category,index) => (
                    <Link to={`/Category/${category.id}/`} className="catLink">
                    <div key={category.id} className={getClassName(index)}>
                        <p className="catname">{category.name}</p>
                        <img src={category.image} alt={category.name} className="catimg"/>
                    </div>
                    </Link>
                ))}
        </section>
    </div>
}
export default Categories