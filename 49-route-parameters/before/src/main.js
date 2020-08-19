import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
    useParams,
} from "react-router-dom";


export default function App() {
  return (
    <Router>
      <div>
        <Menu />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users/:id">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li><Link to="/users/1">users/1</Link></li>
        <li><Link to="/users/2">users/2</Link></li>
        <li><Link to="/users/3">users/3</Link></li>
      </ul>
    </nav>

  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

const Users = function Users() {
  const [SWCharacter, setSWCharacter] = useState(null);
  const {id} = useParams();

  useEffect( function() {
    setSWCharacter(null);
    const $xhr = $.getJSON(`https://swapi.dev/api/people/${id}/`, setSWCharacter);

    return function abort() {
      $xhr.abort();
    }
  }, [id]);

  const content = SWCharacter ? SWCharacter.name : "Loading..";
  return  content;
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
