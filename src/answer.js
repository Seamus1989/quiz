import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import OptionsComponent from './optionsComponent';
// Import Styles
import './styles/answerStyles.css';


export default class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: this.props.choices.map((element) => element.data),
      correctAnswers: this.props.choices.reduce((obj, val) => ({ [val.number]: val.answer, ...obj }), {}),
      selectedAnswers: this.props.choices.reduce((obj, val) => ({ [val.number]: '', ...obj }), {}),
      toggleAbility: this.props.choices.reduce((obj, val) => ({ [val.number]: true, ...obj }), {}),
      sliderControls: this.props.choices.reduce((obj, val) => ({ [val.number]: {}, ...obj }), {}),
      textColour: this.props.choices.reduce((obj, val) => ({ [val.number]: null, ...obj }), {}),
      complete: false,
    };
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }


  // ////////////////////////////////////////////////////////////////////////////
  componentDidUpdate(prevProps) {
    if (prevProps.choices !== this.props.choices) {
      this.setState({
        choices: this.props.choices.map((element) => element.data),
        correctAnswers: this.props.choices.reduce((obj, val) => ({ [val.number]: val.answer, ...obj }), {}),
        selectedAnswers: this.props.choices.reduce((obj, val) => ({ [val.number]: '', ...obj }), {}),
        toggleAbility: this.props.choices.reduce((obj, val) => ({ [val.number]: true, ...obj }), {}),
        sliderControls: this.props.choices.reduce((obj, val) => ({ [val.number]: {}, ...obj }), {}),
        textColour: this.props.choices.reduce((obj, val) => ({ [val.number]: null, ...obj }), {}),
      });
    }
    if (prevProps.complete !== this.props.complete) {
      this.setState((state) => ({
        complete: !state.complete,
      }));
    }
  }

  handleAnswerClick(selectedElement, questionNumber, index) {
    // if answer was previously incorrect, toggle is still available
    if (this.state.toggleAbility[questionNumber]) {
      // set answer
      const answers = Object.assign(this.state.selectedAnswers, {});
      answers[questionNumber] = selectedElement;
      // set slider
      const elementToHighlight = Object.assign(this.state.sliderControls, {});
      elementToHighlight[questionNumber] = index;
      // set text colour
      const textColour = Object.assign(this.state.textColour, {});
      textColour[questionNumber] = index;
      this.setState({
        selectedAnswers: answers,
        sliderControls: elementToHighlight,
        textColour,
      });
      // ////////////////////////////////////////////////////////////////////////
      if (this.state.selectedAnswers[questionNumber] === this.state.correctAnswers[questionNumber]) {
        // Correct Answer selected, switch off the ability to toggle answer
        const newToggleAbility = Object.assign(this.state.toggleAbility, {});
        newToggleAbility[questionNumber] = false;
        this.setState((state) => ({
          toggleAbility: newToggleAbility,
        }));
        if (Object.values(this.state.toggleAbility).filter((elem) => elem === true).length === 0) {
          // if all questions are correct, fire next function from parent component
          this.props.handleNext();
        } else {
          // fire intermediate background colour
          this.props.intermediate()
        }
      }
    } else {
      console.log('Answer already correct, cannot toggle');
    }
  }

  render() {
    // Renders a list of options for each particular answer field
    // Independent of question length etc
    const listedOptions = this.state.choices.map((element) => (
      <div
        key={element}
      >
        <OptionsComponent
          questionNumber={1 + this.state.choices.indexOf(element)}
          options={element}
          handleAnswerClick={this.handleAnswerClick}
          sliderControls={this.state.sliderControls}
          textColour={this.state.textColour}
          complete={this.state.complete}
        />
      </div>
    ));
    return (
      <>
        {listedOptions}
      </>
    );
  }
}

Answer.propTypes = {
  choices: PropTypes.array.isRequired,
  handleNext: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,

};
