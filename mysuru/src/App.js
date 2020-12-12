import './App.scss';
import Home from './Home/Home';
import Places from './Places/Places';
// import Nav from './Components/Nav/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import User from './Components/Volunteer';
import GetVolunteers from './Components/GetVolunteers';
import Weather from "./Weather/App";
import UserProvider from './Services/userContext';
import SignIn from './Forms/SignIn';
import Question from "./QandA/postquestion"
import GetQuestions from "./QandA/getquestions"
function App() {
  useEffect(() => {
    window.addEventListener('resize', () => {
      document.querySelector(':root').style
        .setProperty('--vh', window.innerHeight / 100 + 'px');
    })
  }, [])

  return (
    <main>
      {/* <Nav /> */}
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/places' component={Places} />
            <Route exact path='/weather' component={Weather} />
            <Route exact path='/volunteer' component={User} />
            <Route exact path='/volunteer_list' component={GetVolunteers} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path='/Q&A' component={Question} />
            <Route exact path='/questions' component={GetQuestions} />
          </Switch>
        </Router>
      </UserProvider>
    </main>
  );
}

export default App;
