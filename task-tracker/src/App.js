import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask"
import { useState } from "react"

//"npm start" to start up the dev server

function App() { //main component as a function
  //can only return one element, so everything else must go inside (div in this case)
  
  // Setting up our state with the default array (allows us to update the state), done in App so multiple components can access it,
  //we can send it as a property
  const [tasks, setTasks] = useState([{id: 1, text: "Walk Dog", day: "April 2nd at 3:00pm", reminder: true,},
  {id: 2, text: "Exercise", day: "April 2nd at 5:00pm", reminder: false,}, 
  {id: 3, text: "Eat", day: "April 22nd at 9:00pm", reminder: true,}])

  const [showAddTask, setShowAddTask] = useState(false)

  //Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }
  //Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))  //sets task to only those that do not have the given id
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))  //if task we want keep other properties and change reminder
  }

  return (
    <div className="container">
      
      <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? ( <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Current Tasks')}

    </div>
    
  );
}

//Several general headers that can be made
//const name = "Brad"
//const x = false
//<h1>Hello from React</h1>
//<h2>Hello {x ? name : "no"}</h2>
export default App;
