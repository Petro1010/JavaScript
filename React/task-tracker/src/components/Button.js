import PropTypes from 'prop-types'

//once again class name relates back to css
//takes in the onclick function as a property
const Button = (props) => {
  return (
    <button onClick={props.onClick} style={{backgroundColor: props.color}}className='btn'>
      {props.text}
    </button>
  )
};

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;
