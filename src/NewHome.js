import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ExitToAppTwoTone } from '@material-ui/icons';
import { fire } from './firebase';
import CreateQuiz from './CreateQuiz';
import Home from './Home';
import DisplayQuiz from './DisplayQuiz';
import GenerateQuiz from './GenerateQuiz';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function NewHome() {
  return (
    <Router>
      <div>
        <Link to='/'>
          <Button color='primary' variant='outlined'>
            Home
          </Button>
        </Link>

        <Link to='/createquiz'>
          <Button color='primary' variant='outlined'>
            Create Quiz
          </Button>
        </Link>

        <Link to='/displayquiz'>
          <Button color='primary' variant='outlined'>
            Display Quiz
          </Button>
        </Link>
        <Link to='/generatequiz'>
          <Button color='primary' variant='outlined'>
            Generate Quiz
          </Button>
        </Link>
        <Button
          startIcon={<ExitToAppTwoTone />}
          onClick={() => {
            fire.auth().signOut();
          }}
          color='primary'
          variant='outlined'
        >
          Logout
        </Button>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/createquiz'>
            <CreateQuiz />
          </Route>
          <Route path='/displayquiz'>
            <DisplayQuiz />
          </Route>
          <Route path='/generatequiz'>
            <GenerateQuiz />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
