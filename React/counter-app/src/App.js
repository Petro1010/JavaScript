import React from "react"
import Count from "./components/Count";

export default function App() {
    //we can declare state by using this function
    //array destructering to more smoothly get values from React.useState
    //const [isImportant, setIsImportant] = React.useState("Yes");
    //console.log(isImportant);  //state stores an array of values

    //to modify values currently in our state, use the function (in this case setIsImportant) that is provided within the state:
    //function handleClick() {
      //setIsImportant("No");
    //}

    const [count, setCount] = React.useState(0);

    function increment() {
      //setCount(count + 1);  cant use count++ in react as we shouldnt do count = count + 1, never explicitly set it

      /**
     * Note: if you ever need the old value of state
     * to help you determine the new value of state,
     * you should pass a callback function to your
     * state setter function instead of using
     * state directly. This callback function will
     * receive the old value of state as its parameter,
     * which you can then use to determine your new
     * value of state.
     */
      setCount(prev => prev + 1);
    }

    function decrement() {
      setCount(prev => prev - 1);
    }

    //combining both props and states. Passing our state value down to a different component
    console.log("App Component Rendered");
    //everytime the App state updates, both App and Count are rerednered.
    //React automatically re-renders the component and any children after a change in state
    return (
      <div className="counter">
        <button className="counter--minus" onClick={decrement}>–</button>
        <Count number={count}/>
        <button className="counter--plus" onClick={increment}>+</button>
      </div>
    )
};