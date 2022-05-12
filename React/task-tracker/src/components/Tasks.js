// const tasks = [{id: 1, text: "Walk Dog", day: "April 2nd at 3:00pm", reminder: true,},
//  {id: 2, text: "Exercise", day: "April 2nd at 5:00pm", reminder: false,}, 
//  {id: 3, text: "Eat", day: "April 22nd at 9:00pm", reminder: true,}]
import Task from "./Task";

const Tasks = (props) => {
    //we are mapping the elements of our array to actual html components, must include unique ids
      
  return (
    <>
    {props.tasks.map((task) => (<Task key={task.id} task={task} onDelete={props.onDelete} onToggle={props.onToggle}/>))}

    </>
  )
};

export default Tasks;