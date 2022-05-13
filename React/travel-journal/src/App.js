import React from "react";
import Header from "./components/Header";
import TravelInfo from "./components/TravelInfo";
import data from "./data";

function App() {
  let travelEntries = data.map(info => <TravelInfo {...info}/>);
  return (
    <div className="App">
      <Header />
      {travelEntries}
    </div>
  );
}

export default App;
