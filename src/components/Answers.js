import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { dataTestId, handleClickAswers, resposta, className } = this.props;
    return (
      <button
        onClick={ handleClickAswers }
        data-testid={ dataTestId }
        type="button"
        className={ className }
      >
        {resposta}

      </button>
    );
  }
}

Answers.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  handleClickAswers: PropTypes.func.isRequired,
  resposta: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Answers;
