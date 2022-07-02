import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={ (props) => <Login { ...props } /> }
        />

        <Route
          exact
          path="/settings"
          component={ (props) => <Settings { ...props } /> }
        />
        <Route exact path="/game" component={ Game } />
        <Route
          exact
          path="/feedback"
          component={ (props) => <Feedback { ...props } /> }
        />
        <Route
          exact
          path="/ranking"
          component={ (props) => <Ranking { ...props } /> }
        />
      </Switch>
    </div>
  );
}
