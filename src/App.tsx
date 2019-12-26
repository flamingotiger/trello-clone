import React from 'react';
import { Route } from 'react-router-dom';
import Home from 'pages/Home';
import Board from 'pages/Board';

const App: React.FC = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>    
      <Route exact path="/board/:id" component={Board}/>
    </div>
  );
}

export default App;
