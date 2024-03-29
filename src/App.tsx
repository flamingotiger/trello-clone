import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import Board from 'pages/Board';
import NotFound from 'pages/NotFound';
import Header from 'components/Header';
import styled from 'styled-components';

const AppStyle = styled.div`
  display:flex;
  flex-direction: column;
  height: 100vh;
`

const App: React.FC = () => {
  const [location, history] = [useLocation(), useHistory()];
  if (location.pathname === '/') {
    history.replace('/trello-clone');
  }
  return (
    <AppStyle>
      <Header />
      <Switch>
        <Route exact path="/trello-clone" component={Home} />
        <Route path="/board/:id" component={Board} />
        <Route component={NotFound} />
      </Switch>
    </AppStyle>
  );
}

export default App;
