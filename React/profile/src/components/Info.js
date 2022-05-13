import React from "react";

function Info(){
    return (
        <div className="info">
            <img className="pic" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/76/760261cecb162a3d81dc8b767078bc53342c7e4e_full.jpg"></img>
            <h1 className="info--name">SpongeBob SquarePants</h1>
            <h3 className="info--job">Chef</h3>
            <h4 className="info--website">www.SpongeBob.com</h4>
            <button className="emailbtn">Email</button>
        </div>
    );
};

export default Info;