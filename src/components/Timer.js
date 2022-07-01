import React from 'react';
// import PropTypes from 'prop-types';

class Timer extends React.Component {
    state = {
      setTimer: 30,
    }

    componentDidMount() {
      const segundo = 1000;
      setInterval(() => this.timeOut(), segundo);
    }

    timeOut= () => {
      const { setTimer } = this.state;
      if (setTimer === 0) {
        this.timeIsOver();
      } else {
        this.setState({ setTimer: setTimer - 1 });
      }
    }

    timeIsOver() {
    //   this.setState({ setTimer: 'TEMPO ACABOU' });
    }

    render() {
      const { setTimer } = this.state;
      return (
        <div>
          TIMER AQUI
          <p>{setTimer}</p>
        </div>

      );
    }
}

Timer.propTypes = {

};

export default Timer;
