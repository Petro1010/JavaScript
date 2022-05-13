import React from "react";
import globe from "../images/globe.png";

function Header(){
    return (
        <div className="header">
            <img src={globe} className="globe"></img>
            <h1>My Travel Journal</h1>
        </div>
    );
    
}

export default Header;