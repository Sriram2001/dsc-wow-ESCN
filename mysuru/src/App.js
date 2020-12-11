import './App.scss';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import User from './Components/Volunteer'
import GetVolunteers from './Components/GetVolunteers'
 
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
          <Route exact path='/' component={Home} />
          <Route exact path='/volunteer' component={User} />
          <Route exact path='/volunteer_list' component={GetVolunteers} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
