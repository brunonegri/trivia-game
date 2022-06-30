import React from 'react';
import PropTypes from 'prop-types';

class Next extends React.Component {
  render() {
    const { handleClick, isDisabled } = this.props;
    return (
      <button
        onClick={ handleClick }
        data-testid="btn-next"
        type="button"
        disabled={ isDisabled }
      >
        Next
      </button>
    );
  }
}
Next.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Next;
