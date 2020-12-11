import './App.scss';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.addEventListener('resize', () => {
      document.querySelector(':root').style
        .setProperty('--vh', window.innerHeight / 100 + 'px');
      console.log(window.innerHeight);
    })
  }, [])

  return (
    <main>
      <Nav />
      <Router>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
