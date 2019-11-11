/* eslint-disable */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import SingleSummary from 'single-summary'
import styled from 'styled-components';

import './styles/modalStyles.css';

const ShadedBackdrop = styled.div`
position : fixed;
z-index : 105;
left : 0;
top: 0;
overflow : hidden;
width : 100%;
height : 100%;
background : rgba(0, 0, 0, 0.35);
transition: all ease-in 0.3s;
opacity: ${props => {
switch (props.fadeType) {
  case "in":
    return "1";
  case "out":
    return "0";
  default:
    return "0";
  };
}};
`
const StyledModal = styled.div`
position: fixed; /* Stay in place */
z-index: 110; /* Sit on top */
left: 0;
overflow: hidden;
width: 100%; /* Full width */
height: 100%; /* Full height *//* Enable scroll if needed */
margin-top : 8vh;
opacity: ${props => {
switch (props.fadeType) {
  case "in":
    return "1";
  case "out":
    return "0";
  default:
    return "0";
  };
}};
transition: ${props => {
  switch (props.fadeType) {
    case "in":
      return `all ease-in 0.45s;`;
    case "out":
      return `all ease-in 0.45s;`;
    default:
      return "";
    }
  }};
  top: ${props => {
  switch (props.fadeType) {
    case "in":
      return "0";
    case "out":
      return "-100vh";
    default:
      return "100vh";
    };
  }};
`;

function Modal({toggleModal, summary}) {
  const [show, setShow] = useState()
  const [questionArray, were] = useState(Object.keys(summary))
  useEffect(function() {
    setShow(show => "in")
    return function() {
      setShow(show => "out")
    }
  },[]);
  function transitionEnd(e) {
    if (e.propertyName !== "opacity" || show === "in") return;
    if (show === "out") {
      toggleModal()
      }
    };
  return ReactDOM.createPortal(
    <>
    <div>
      <ShadedBackdrop fadeType = {show}/>
      <StyledModal onTransitionEnd = {transitionEnd} fadeType = {show}>
        <div className = "modal">
          <div className = "inner-modal">
            <div className = "header">
              <div className = "top">
                <span className = "close" onClick = {() => setShow(show=>"out")}>&times;</span>
                </div>
                <div className = "under">
                <h3 className = "head">How did you do?</h3>
                </div>
                </div>
                {questionArray.map((element) => {
                  return <div style = {{display : "grid"}}><SingleSummary
                  questionNumber = {element}
                  question = {summary[element]["Question"]}
                  incorrectAnswers = {summary[element]["Wrong answers"]}
                  incorrectClicks = {summary[element]["Incorrect clicks"]}
                  /></div>
                }
              )}
              <div className = "modal-footer">
              </div>
            </div>
        </div>

      </StyledModal>
    </div>
    </>,
    document.getElementById('modal')
  )
}

export default Modal;

/*


solve this then,
outside click and cross in top corner
then display one answers thing
  and design
    then implement a map of them all
    and design based on screen sizing (width)

  then create a start again button
*/
