import React from "react"
import photos from "../images/photo-grid.png"

function Hero(){
    return (
        <div className="hero">
            <img className="hero--pic" src={photos}></img>
            <h1 className="hero--header">Online Experiences</h1>
            <p className="hero--content">
                Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.
            </p>
        </div>
    );
}

export default Hero;