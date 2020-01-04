import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import BoardPage from 'pages/BoardPage';
import ListPage from 'pages/ListPage';
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
        <Route exact path="/trello-clone" component={BoardPage} />
        <Route exact path="/board/:id" component={ListPage} />
        <Route component={NotFound} />
      </Switch>
    </AppStyle>
  );
}

export default App;
