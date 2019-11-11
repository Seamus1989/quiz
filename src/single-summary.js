import React from 'react';
import ReactDOM from 'react-dom'
function SingleSummary({
  question,
  questionNumber,
  incorrectClicks,
  incorrectAnswers}) {
  return (
    <>
      <div className = "single-summary">
        <h3>{questionNumber}. {question}</h3>
        <h5 className = "int">Incorrect Number of Clicks</h5>
        <h5 className = "int">{incorrectClicks}</h5>
        <h5 className = "int">Incorrect Clicks</h5>
        <h5 className = "int">{incorrectAnswers.join(", ")}</h5>
      </div>
    </>
  )
}
export default SingleSummary;
