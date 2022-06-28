import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Games from './pages/Games';
import Settings from './pages/Settings';

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
        <Route path="/game" component={ Games } />
      </Switch>
    </div>
  );
}
