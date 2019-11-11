import React from 'react';
import styled from 'styled-components';
import Question from './question';
import Answer from './answer';
import Modal from './modal'
// Import Variables
import { questions } from './variables/questionVariable';

const StyledBackground = styled.div`
opacity: ${(props) => {
    switch (props.control) {
      case 'normal':
        return '1;';
      case 'correct':
        return '0;';
      case 'intermediate':
        return '0;';
      default:
        return '1;';
    }
  }};
`;
const CorrectStyledBackground = styled.div`
opacity: ${(props) => {
    switch (props.control) {
      case 'normal':
        return '0;';
      case 'correct':
        return '1;';
      case 'intermediate':
        return '0;';
      default:
        return '0;';
    }
  }};
}};
`;
const IntermediateStyledBackground = styled.div`
opacity: ${(props) => {
    switch (props.control) {
      case 'normal':
        return '0;';
      case 'correct':
        return '0;';
      case 'intermediate':
        return '1;';
      default:
        return '0;';
    }
  }};
}};
`;
/*
QuestionNumber, question

sub question - incorrect guesses, number of clicks
answers = {
  1 : {
    question : "an animal cell contains:" = this.state.question
    wrongAnswers : [],
    wrongClicks : 0 = wrongAnswers.length

  },
  2 : {

}
object[questionNumber][question]
question and wrong answer
*/
export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    // Initial Construction uses zeroth question
    const theQuestion = [ ...questions ].shift()
      .filter((element) => element.type === 'question')
      .map((element) => element.data)
      .reduce((acc, val) => val);
    const answerChoices = [ ...questions ].shift().filter((element) => element.type === 'choice');
    this.state = {
      questionContainer: [ ...questions ],
      questionIndex: 0,
      questionNumber: 1,
      question: theQuestion,
      answerChoices,
      background: 'normal',
      message: 'The Answer is incorrect',
      setComplete: false,
      summary : {},
      showModal : false
    };
    this.handleNext = this.handleNext.bind(this);
    this.correctSingleSelection = this.correctSingleSelection.bind(this)
    this.wrongAnswers = this.wrongAnswers.bind(this)
    this.toggleModal = this.toggleModal.bind(this) // WE NEED TO DELETE THIS YEAH
  }

  correctSingleSelection() {
    if (this.state.background === 'normal') {
      this.setState(() => ({
        background: 'intermediate'
      }))
    } else if (this.state.background === 'intermediate') {
      this.setState(() => ({
        background: 'normal'
      }))
    }
  }

  handleNext() {
    this.setState({
      background: 'correct',
      message: 'The answer is correct!',
      setComplete: true,
    });
    // set background and message for 2200ms before resetting
    setTimeout(() => {
      if (this.state.questionNumber < this.state.questionContainer.length) {
        // ////////////////////////////////////////////////////////////////////////
        const theQuestion = this.state.questionContainer[this.state.questionNumber]
          .filter((element) => element.type === 'question')
          .map((element) => element.data)
          .reduce((acc, val) => val);
        this.setState((state) => ({
          questionIndex: state.questionIndex + 1,
          questionNumber: state.questionNumber + 1,
          answerChoices: this.state.questionContainer[state.questionIndex + 1].filter((element) => (element.type === 'choice')),
          background: 'normal',
          message: 'The answer is incorrect',
          setComplete: false,
          question: theQuestion,
        }));
      } else if (this.state.questionNumber === this.state.questionContainer.length) {
        console.log('THIS IS THE END SON');
        this.setState((state) => ({
          showModal : true
        }))
        // perhaps a modal with number of clicks wrong on each question or summat. Start again button?
      }
    }, 2200);
  }

  wrongAnswers(selection, bool) {
    let no = this.state.questionNumber
    let summaryDeepCopy = JSON.parse(JSON.stringify(this.state.summary))
    if (!summaryDeepCopy[no]) {
      summaryDeepCopy[no] = {};
      summaryDeepCopy[no]["Question"] = this.state.question
      summaryDeepCopy[no]["Wrong answers"] = [];
      summaryDeepCopy[no]["Incorrect clicks"] = 0
    }
    if (bool && summaryDeepCopy[no]["Wrong answers"].length === 0) {
      summaryDeepCopy[no]["Wrong answers"].push("None!")
      this.setState((state) => ({
        summary: summaryDeepCopy
      }))
    } else if (!bool) {
      summaryDeepCopy[no]["Wrong answers"].push(selection)
      summaryDeepCopy[no]["Incorrect clicks"] = summaryDeepCopy[no]["Wrong answers"].length
      if (summaryDeepCopy[no]["Wrong answers"].includes("None!")) {
        let noneIndex = summaryDeepCopy[no]["Wrong answers"].indexOf("None!")
        summaryDeepCopy[no]["Wrong answers"].splice(noneIndex, 1)
      }
      this.setState((state) => ({
        summary: summaryDeepCopy
      }))
    }
  }

  toggleModal() {
    this.setState((state) => ({
      showModal : !state.showModal
    }))
  }
  componentDidUpdate() {
    console.log(this.state.summary)
  }

  render() {
    return (
      <>
        <StyledBackground className="Mask" control={this.state.background} />
        <IntermediateStyledBackground className="Mask4" control={this.state.background} />
        <CorrectStyledBackground className="Mask2" control={this.state.background} />

        <div className="Mask3">
          <div>
            <Question
              question={this.state.question}
            />
            <Answer
              choices={this.state.answerChoices}
              handleNext={this.handleNext}
              complete={this.state.setComplete}
              intermediate = {this.correctSingleSelection}
              wrongAnswers = {this.wrongAnswers}
            />
            <div><h5 className="outcome">{this.state.message}</h5></div>
          </div>
        </div>
        <button onClick = {this.toggleModal}>hello</button>
        {this.state.showModal && <Modal summary = {this.state.summary} toggleModal = {this.toggleModal}/>}
      </>
    );
  }
}

/*
Make a modal which maps instances of a component that breaks down the wrong clicks etc of the questions

*/
