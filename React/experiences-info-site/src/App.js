import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import data from "./data";

function App() {
  /*
  let firstName = "Joe";
  let lastName = "Shmoe";
  const date = new Date();
  const hours = date.getHours % 12;
  let timeOfDay;
  if (hours < 12){
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 17){
    timeOfDay = "afternoon";
  } else{
    timeOfDay = "night";
  }
  */

  //make card components from the data provided
  //let cardComponents = data.map(card => <Card img={card.coverImg} rating={card.stats.rating} reviewCount={card.stats.reviewCount} country={card.location} title={card.title} price={card.price} key={card.id} openSpots={card.openSpots}/>)

  //rather than just pass all the properties of card to the component, just pass the card object and access its properties from within the component

  let cardComponents = data.map(card =>
  <Card 
    key={card.id} 
    card={card}
    {...card} //Another way we can pass all the properties of the card down is using the spread object function, ...card. Dont need to go through card to access them
  />);

  //must include the "key" prop, must be unique for each child
  return (
    <div>
      {/* ||||Example on How to include strings within JSX (if in {} it is treated as JavaScript): ||||
      <h1>Hello {firstName} {lastName}!</h1>

      Anything in the {} is done in JavaScript, therefore you can do many things in them such as computations
      
      <h1>Good {timeOfDay}!</h1>
      */}
      <Navbar />
      <Hero />
      <section className="cards-list">
        {cardComponents}
      </section>
    </div>
  );
}

export default App;
