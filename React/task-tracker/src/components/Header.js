import PropTypes from 'prop-types';
import Button from './Button';  //get the button component from our other file

//creating our header component
//class name will help format according to our css file (takes the format that is specified)
const Header = (props) => {  //takes in properties and gets the title element
    return (
    <header className='header'>
      <h1>{props.title}</h1>
      <Button color={props.showAdd ? "red" : "blue"} text={props.showAdd ? "Close" : "Add"} onClick={props.onAdd}/>
    </header>
  )
}

Header.defaultProps = {  //sets the default values for any props needed
    title: 'Task Tracker',  //default value for the title if none provided
}

Header.propTypes = {  //sets the default values for props
    title: PropTypes.string,  //ensures title is a string
}

//Styling with CSS within JS, 
/* const headingStyle = {
    color: 'red',
    backgroundColor: 'black'
} */

export default Header;
