import React from "react";
import Question from "./components/Question";
import {nanoid} from "nanoid";

function App() {
  //set up state to know if game has started or not
  const [gameStarted, setGameStarted] = React.useState(false);

  //set up state for the game data
  const [questions, setQuestions] = React.useState([]);

  //set up state to know when we restart
  const [restart, setRestart] = React.useState(false);
  
  //set up state for if the answers have been submitted or not
  const [submitted, setSubmitted] = React.useState(false);

  //state for correct answers
  const [correct, setCorrect] = React.useState(0);

  //make the API call to get the data, (running once for now)
  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple"); //get data
      const data = await res.json();  //convert data
      const newQuestions = [];
      for (let i = 0; i < data.results.length; i++){
        //add additional properties to data we got from API
        //answers now contains all the options and whether they are selected or not
        const newQuestion = {
          ...data.results[i],
          id: nanoid(),
          //get all options in array, shuffle it, and make answer objects for each possible option
          answers: shuffleArray([...data.results[i].incorrect_answers, data.results[i].correct_answer]).map(answer => ({value: answer, selected: false}))
        };
        newQuestions.push(newQuestion);
      }
      setQuestions(newQuestions); //set data
    };
    getQuestions();
  }, [restart]);

  React.useEffect(() => {
    if (submitted) {
      let correctAns = 0;
      for (let i = 0; i < questions.length; i++){
        let choosenAnswer = questions[i].answers.filter(answer => answer.selected)[0];
        //if an answer wasnt selected it automatically doesnt update it
        if (choosenAnswer && choosenAnswer.value === questions[i].correct_answer) correctAns++;
      }
      setCorrect(correctAns);

    } else {
      setCorrect(0);
    }

  }, [submitted, questions]);

  //function to start the game
  function startGame() {
    setGameStarted(true);
  }

  //shuffles the order of the answers
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function selectAnswer(id, value) {
    //make sure answers cant change after the quiz is submitted
    if (!submitted) setQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        //This line is complex so I will break it down:
        //First we must get the question that the user has selected an answer for, if not the question do not modify it
        //If it is the question, we only want to change the answers
        //If the answer is the one selected, make that true, and make all the other ones false 
        return question.id === id ? 
            {...question, 
              answers: question.answers.map(answer => answer.value === value ? {...answer, selected: true} : {...answer, selected: false})
            }
          : question
      })
    })
  }

  //submit the answers you have selected
  function submitAnswers(){
    setSubmitted(true);
  }

  //restart the quiz
  function restartGame(){
    setSubmitted(false); //no longer in a submitted state
    setRestart(prev => !prev);  //signal to get new questions
  }

  //map data to actual elements
  const questionElements = questions.map(question => <Question 
      key={question.id}
      id={question.id}
      question={question.question} 
      options={question.answers}
      selectAnswer={selectAnswer}
      submitted={submitted}
      correct={question.correct_answer}
    />)

  return (
    //conditionally render components depending is game is going or not
    <main>
      {
        gameStarted ?
        
        <div className="questions--container">
          {questionElements}
          {submitted ?
             <div className="game--end">
               <h4>{`You Got ${correct}/5 Questions Correct!`}</h4>
               <button className="play--button" onClick={restartGame}>Play Again</button>
             </div>
           : <button className="submit--button" onClick={submitAnswers}>Check answers</button>}
        </div>
        

        :

        <div className="start--page">
          <h1> Quizzical </h1>
          <p> Put your trivia skills to the test in this quiz game!</p>
          <button className="play--button" onClick={startGame}> Start Quiz </button>
        </div>
      }
      
    </main>
  );
}

export default App;
