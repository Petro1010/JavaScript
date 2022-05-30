import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate();
    return (
        <nav className="nav">
            <img alt="" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png"  className="benfica--logo"></img>
            <h1 className="title">BenficaFacts</h1>
            <div className="nav--links">
                <h3 onClick={() => navigate("/")}>Home</h3>
                <h3 onClick={() => navigate("/history")}>History</h3>
                <h3 onClick={() => navigate("/team")}>Team</h3>
                <h3 onClick={() => navigate("/stadium")}>Stadium</h3>
            </div>
            
        </nav>
        
    );
};

export default NavBar;