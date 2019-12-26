import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Board from 'pages/Board';
import NotFound from 'pages/NotFound';
import Header from 'components/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/board/:id" component={Board} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
