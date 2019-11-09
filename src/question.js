import React from 'react';
import PropTypes from 'prop-types';

// Import Styles
import './styles/questionStyles.css';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question !== this.props.question) {
      this.setState({
        question: this.props.question,
      });
    }
  }

  render() {
    return (
      <>
        <h4 className="Question">{this.state.question}</h4>
      </>
    );
  }
}
Question.propTypes = {
  question: PropTypes.string.isRequired,
};
