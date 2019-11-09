import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function OptionsComponent({
  options,
  questionNumber,
  handleAnswerClick,
  sliderControls,
  textColour,
  complete,
}) {
  const [ componentWidth, setWidth ] = useState(null);
  // /// Fuction to handle the click event of answers ///////////////////////////
  function select(selectedElement, questionNo, index) {
    handleAnswerClick(selectedElement, questionNo, index);
  }
  // ////////////////////////////////////////////////////////////////////////////
  function sliderController(questionNo) {
    if (typeof sliderControls[questionNo] === 'number') {
      const width = document.querySelector('.Answer').clientWidth;
      const numberOfOptions = options.length;
      const sliderWidth = width / numberOfOptions;
      const index = sliderControls[questionNo];
      const sliderPosition = sliderWidth * index;
      // ////////////////////////////////////////////////////////////////////////
      const returnStyles = {
        opacity: 1,
        left: sliderPosition,
        width: sliderWidth,
        transition: 'left ease 1.2s, opacity ease 1s',
        backgroundColor: 'rgba(249, 249, 249, 0.5)',
      };
      if (complete) {
        const additionalStyles = { boxShadow: '0 0 6px 1px rgba(0, 115, 101, 0.5)' };
        const mergeStyles = Object.assign(additionalStyles, returnStyles);
        return mergeStyles;
      } if (!complete) {
        const additionalStyles = { boxShadow: '0 0 6px 1px rgba(195, 51, 51, 0.5)' };
        const mergeStyles = Object.assign(additionalStyles, returnStyles);
        return mergeStyles;
      }
    }
    return null;
  }
  function styler(number, index) {
    // style text colour dependent on corect/incorrect and selected with slider or not
    const defaultStyles = { zIndex: 100 };
    const indexOfSelection = textColour[number];
    if (indexOfSelection === index) {
      if (complete) {
        const additionalStyles = { color: '#00b093' };
        const mergeStyles = Object.assign(defaultStyles, additionalStyles);
        return mergeStyles;
      } if (!complete) {
        const additionalStyles = { color: '#e66549' };
        const mergeStyles = Object.assign(defaultStyles, additionalStyles);
        return mergeStyles;
      }
    }
    const styles = { color: '#ffffff' };// , "&:hover" : {textShadow : "0.45px 0.4px 1px #737373"}}
    const defaultColour = Object.assign(defaultStyles, styles);
    return defaultColour;
  }
  // ////////////////////////////////////////////////////////////////////////////
  function updateDimensions() {
    const width = document.querySelector('.Answer').clientWidth;
    setWidth(width);
  }
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    // eslint-disable-next-line
    return function() {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [ componentWidth ]);
  /*
      Rerender when width changes, this will re-set styles of slider to reflect change in window size,
      So if on a tablet device and device is rotated, view changes to reflect change in browser window size.
  */
  // ////////////////////////////////////////////////////////////////////////////
  // single options is an array containing each answer for particular question row
  const singleOptions = options.map((element) => (
    <div
      className="choices"
      key={element}
      style={styler(questionNumber, (options.indexOf(element)))}
      onClick={() => select(element, questionNumber, (options.indexOf(element)))}
      role="button"
    >
      {element}
    </div>
  ));
  return (
    // Returns two divs completely overlapping. One contains the slider, ane one contains single question row of content (answers)
    <>
      <div className="Answer">
        {singleOptions}
        <div style={sliderController(questionNumber)} className="slider" />
      </div>
    </>
  );
}
OptionsComponent.propTypes = {
  options: PropTypes.array.isRequired,
  questionNumber: PropTypes.number.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  sliderControls: PropTypes.object.isRequired,
  textColour: PropTypes.object.isRequired,
  complete: PropTypes.bool.isRequired,
};


export default OptionsComponent;
