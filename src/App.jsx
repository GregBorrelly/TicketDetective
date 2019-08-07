import React from 'react';
import {Container} from 'semantic-ui-react'
import './App.scss';
import Navigation from './components/Navigation/navigation'
import HomePage from './pages/Homepage/homepage'
import Search from './pages/Search/search'

function App() {
  return (
    <Container className="App">
      <Navigation />
      <Search />
    </Container>
  );
}

export default App;
