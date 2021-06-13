//newhome.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ExitToAppTwoTone } from '@material-ui/icons';
import { fire } from './firebase';
import CreateQuiz from './CreateQuiz';
import Home from './Home';
import DisplayQuiz from './DisplayQuiz';
import GenerateQuiz from './GenerateQuiz';
import GetResponses from './GetResponses';
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
        <Link to='/getresponses'>
          <Button color='primary' variant='outlined'>
            Get Responses
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
          <Route path='/getresponses'>
            <GetResponses />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
