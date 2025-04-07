import React, { useState } from "react";
import "../nav/nav.css";
import logo from "../images/logo.png";
import cart from "../images/shopping-cart (1).png";
import wish from "../images/wishlist.png";
import darrow from "../images/down-arrow.png";
import uarrow from "../images/up-arrow.png";
import { Dropdown } from "./dropdown";
import { Link } from "react-router-dom";
import hamburger from "../images/hamburger.png";
import hamburger2 from "../images/hamburgerwhite.png";

const categories = [
  { id: 1, name: "Clothes" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Furniture" },
  { id: 4, name: "Shoes" },
  { id: 5, name: "Phones" },
];

export default function Nav() {
  const [dropdownId, setDropdownId] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleCategoryHover = (id) => {
    setDropdownId(id);
    console.log(id)
  };

  const handleCategoryLeave = () => {
    setDropdownId(null);
  };

  return (
    <div className="navmain">
      <section className="navFirstSection">
        <Link to="/">
        <img src={logo} alt="Logo" className="navlogo" />
        </Link>
        <div className="navAction">
          <input type="text" placeholder="SEARCH..." />
          <div className="navicons">
            <Link to="/cart">
            <img src={cart} alt="Cart" />
            </Link>
            <Link to="/wishlist">
            <img src={wish} alt="Wishlist" />
            </Link>
            <img
              src={hamburger}
              alt="Menu"
              className="burger"
              onClick={() => setIsMobileNavOpen(true)}
            />
          </div>
          <Link to="/signin">
            <h2>SIGN IN</h2>
          </Link>
        </div>
      </section>

      {isMobileNavOpen && (
        <div className="mobilenav" id="mobilenavigation">
          <section className="menucont">
            <img
              src={hamburger2}
              alt="Close Menu"
              id="burger2"
              onClick={() => setIsMobileNavOpen(false)}
            />
          </section>
          <section className="mobilecat">
            {categories.map((cat) => (
              <h4 key={cat.id}>{cat.name.toUpperCase()}</h4>
            ))}
          </section>
        </div>
      )}

<section className="navSecondSection">
  {categories.map((cat) => (
    <div key={cat.id} className="nav-item-with-dropdown" onMouseEnter={() => setDropdownId(cat.id)} onMouseLeave={() => setDropdownId(null)}>
      <h3> {cat.name} <img src={dropdownId === cat.id ? uarrow : darrow} alt="" className="arrow"/></h3>

      {dropdownId === cat.id && (
        <section id="dropdown" className={`dropdn class${cat.id}`}>
          <Dropdown key={cat.id} id={cat.id} />
        </section>
      )}
    </div>
  ))}
</section>
    </div>
  );
}
