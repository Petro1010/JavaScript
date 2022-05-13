import React from "react";
import Header from "./components/Header";
import Meme from "./components/Meme";

function App() {

  //setting up an event listener in React******************** EXAMPLE 1

  /*
  function handleClick() {
    console.log("I was Clicked");
  };

  function mouseHover(){
    console.log("Button Hovered Over");
  };
  */
  return (
    <div className="App">

      {/*<button 
        onClick={handleClick}
        onMouseOver={mouseHover}
        >Click Me</button>*/}
      <Header />
      <Meme />
    </div>
  );
}

export default App;
