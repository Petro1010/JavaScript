import React from "react";
import star from "../images/star.png"

function Card(props){
    let badgeText;
    if (props.openSpots === 0) {
        badgeText = "SOLD OUT"
    } else if (props.location === "Online") {
        badgeText = "ONLINE"
    }
    return (
        <div className="card">
            {/* Want to conditionally render the sold out badge, do it like so: */}
            {badgeText && <div className="card--rect">{badgeText}</div>}
            {/* Element will never get called if falsy */}
            <img className="card--image" src={props.coverImg}></img>
            <div className="card--info">
                <img className="card--star" src={star}></img>
                <p className="card--des">{props.stats.rating}</p>
                <p className="card--dim">({props.stats.reviewCount}) · </p>
                <p className="card--dim">{props.location}</p>
            </div>
            <p className="card--des">{props.title}</p>
            <p><span className="bold">From ${props.price}</span><span className="card--des">/ person</span></p>
        </div>
        
    );
};

export default Card;

