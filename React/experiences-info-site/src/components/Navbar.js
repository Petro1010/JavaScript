import React from "react";
import cameraLogo from "../images/camera.png"

function Navbar() {
    return (
        <nav className="navbar">
            <img src={cameraLogo} className="navbar--logo"></img>
            <h1 className="navbar--text">Experiences</h1>
        </nav>
    );
}

export default Navbar;