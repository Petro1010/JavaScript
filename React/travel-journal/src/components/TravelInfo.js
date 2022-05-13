import React from "react";

function TravelInfo(props){
    return (
        <div className="container">
            <img className="travel--pic" src={props.img} ></img>
            <div className="travel--info">
                <span className="travel--location">
                    <img className="icon" src="https://www.worth.com/wp-content/uploads/2017/09/map-marker-icon.png"></img>
                    <p>{props.location}</p>
                    <a href={props.google_maps}>View on Google Maps</a>
                </span>
                <h1>{props.title}</h1>
                <h3>{props.start} - {props.end}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    );
};

export default TravelInfo;