import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const rankingPLayers = JSON.parse(localStorage.getItem('ranking'));
    console.log(rankingPLayers.sort());
    const sortRank = rankingPLayers.sort((a, b) => ((b.score - a.score)));
    return (
      <div className="rankings-container">
        <h1 data-testid="ranking-title">RANKING</h1>
        {sortRank.map((player, i) => (
          <div className="players-ranking" key={ i }>
            <img src={ player.picture } alt="playerPic" />
            <p data-testid={ `player-name-${i}` }>{player.name}</p>
            <p data-testid={ `player-score-${i}` }>{player.score}</p>
          </div>))}
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-go-home"
        >
          Play Again

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
