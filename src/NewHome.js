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
    <div>
    <Router>
      <center>
      <div style={{padding:20, display:"flex",justifyContent:"space-around", width:800}}>
        
          <Button component={Link} to={"/"} color='primary' variant='outlined'>
            Home
          </Button>


       
          <Button component={Link} to={"/createquiz"} color='primary' variant='outlined'>
            Create Quiz
          </Button>
       

          <Button component={Link} to={"/displayquiz"} color='primary' variant='outlined'>
            Display Quiz
          </Button>
     
        
          <Button component={Link} to={"/generatequiz"} color='primary' variant='outlined'>
            Generate Quiz
          </Button>
       
       
          <Button component={Link} to={"/getresponses"} color='primary' variant='outlined'>
            Get Responses
          </Button>
     
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
      </div>
      </center>
     
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
    </Router>
    </div>
  );
}
