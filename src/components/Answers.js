import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
 decodeEntity=(inputStr) => {
   const textarea = document.createElement('textarea');
   textarea.innerHTML = inputStr;
   return textarea.value;
 }

 render() {
   const { dataTestId, handleClickAswers, resposta, className, isDisabled } = this.props;
   return (
     <button
       disabled={ isDisabled }
       onClick={ handleClickAswers }
       data-testid={ dataTestId }
       type="button"
       className={ className }
     >
       {this.decodeEntity(resposta)}

     </button>
   );
 }
}

Answers.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  dataTestId: PropTypes.string.isRequired,
  handleClickAswers: PropTypes.func.isRequired,
  resposta: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Answers;
