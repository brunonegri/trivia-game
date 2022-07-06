import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimeout } from '../redux/actions';

class Timer extends React.Component {
  componentDidMount() {
    const segundo = 1000;
    setInterval(() => this.timeOut(), segundo);
  }

    timeOut= () => {
      const { dispatchTimer, setTimer } = this.props;
      if (setTimer === 0) {
        this.timeIsOver();
      } else {
        dispatchTimer(setTimer - 1);
      }
    }

    timeIsOver() {
    //   this.setState({ setTimer: 'TEMPO ACABOU' });
    }

    render() {
      // console.log(this.props);
      const { setTimer } = this.props;
      return (
        <div>
          <p className="timer">{setTimer}</p>
        </div>

      );
    }
}

Timer.propTypes = {
  setTimer: PropTypes.number.isRequired,
  dispatchTimer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchTimer: (timer) => dispatch(setTimeout(timer)),
});

const mapStateToProps = (state) => ({
  setTimer: state.gameReducer.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
