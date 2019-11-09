import React from 'react';
import styled from 'styled-components';
import Question from './question';
import Answer from './answer';

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
    };
    this.handleNext = this.handleNext.bind(this);
    this.correctSingleSelection = this.correctSingleSelection.bind(this)
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
        // perhaps a modal with number of clicks wrong on each question or summat. Start again button?
      }
    }, 2200);
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
            />
            <div><h5 className="outcome">{this.state.message}</h5></div>
          </div>
        </div>

      </>
    );
  }
}
/*
import styled components,
this.state.background now becomes a string off default, change,


*/
