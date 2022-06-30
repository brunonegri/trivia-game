import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { dataTestId, handleClick, resposta } = this.props;
    return (
      <button
        onClick={ handleClick }
        data-testid={ dataTestId }
        type="button"
      >
        {resposta}

      </button>
    );
  }
}

Answers.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  resposta: PropTypes.string.isRequired,
};

export default Answers;
