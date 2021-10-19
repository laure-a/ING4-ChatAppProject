import React from "react";
import "./Header.css";
import icon from "./icon.png";

const Header = ({}) => {
    return (
        <header className="Header">
            <h1>Hello I am your header <img src={icon} width="70px" height="70px"/></h1> 

            

        </header>
    )
}
export default Header