import React from "react";
import trollface from "../images/troll-face.png";

function Header(){
    return (
        <div className="header">
            <img src={trollface} className="trollface"></img>
            <h1>Meme Generator</h1>
        </div>
    );
    
};

export default Header;