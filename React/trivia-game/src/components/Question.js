import React from "react";

function Question(props){
    //make answer button components and render them all at once
    const buttons = []
    //all the replaceAll are needed to display the correct characters
    for (let i = 0; i < props.options.length; i++){
        let option = props.options[i];
        //conditional styling for each answer:
        let backgroundColour;
        if (props.submitted){
            if (option.value === props.correct){
                backgroundColour = "#94D7A2";
            } else if (option.selected){
                backgroundColour = "#F8BCBC";
            }
        } else {
            if (option.selected){
                backgroundColour = "#D6DBF5";
            } else {
                backgroundColour = "white";
            }
        }

        const styles = {
            background: backgroundColour,
            border: option.selected || props.submitted ? 0 : "1.5px solid #4D5B9E",
            //if props have been sibmitted and its not correct make it dim
            opacity: props.submitted && option.value !== props.correct ? 0.5 : 1
        }
        buttons.push(<button className="answer" style={styles} key={i} onClick={() => props.selectAnswer(props.id, option.value)}>
            {option.value.replaceAll(/&[a-z]*;/g, "\"").replaceAll("&#039;", "'")}
        </button>)
    }
    return (
        <div>
            <h2 className="question">{props.question.replaceAll(/&[a-z]*;/g, "\"").replaceAll("&#039;", "'")}</h2>
            <div className="answer--container">
                {buttons}
            </div>
            <hr />
            
        </div>
    );

}

export default Question;