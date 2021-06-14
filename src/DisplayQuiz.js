import React, { useState } from 'react';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { CheckCircleSharp } from '@material-ui/icons';
import firebase from 'firebase';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 600,
    width:"80%"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function GetData(props) {
  return (
    <div>
      {props.questions.map(({ id, ques }, index) => (
        <center>
        <Card className={props.classes.root} variant='outlined' style={{}}>
          <CardContent>
            <Typography align="left" variant='h5' component='h2'>
              {index + 1 + '. ' + ques.question}
            </Typography>
            <Typography align="left" className={props.classes.pos} color='textSecondary'>
              {ques.option1 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option1}
            </Typography>
            <Typography align="left" className={props.classes.pos} color='textSecondary'>
              {ques.option2 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option2}
            </Typography>
            <Typography align="left" className={props.pos} color='textSecondary'>
              {ques.option3 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option3}
            </Typography>
            <Typography align="left" className={props.classes.pos} color='textSecondary'>
              {ques.option4 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option4}
            </Typography>
          </CardContent>
        </Card>
        </center>
      ))}
    </div>
  );
}

function DisplayQuiz() {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [quizName, setQuizName] = useState('');

  const handleQuizName = (event) => {
    setQuizName(event.target.value);
  };

  const getQuestions = () => {
    db.collection('allQuizes')
      .doc(firebase.auth().currentUser.displayName)
      .collection(quizName)

      .onSnapshot((snapshot) => {
        setQuestions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ques: doc.data(),
          }))
        );
      });
  };
  return (
    <div>
    <center>
    <div style={{display:"flex", flexDirection:"column",width:300}}> 

      <TextField
      style={{padding:10}}
      size="small"
      variant='outlined'

        label='Enter Quiz Name'
        value={quizName}
        onChange={handleQuizName}
      />
   <center>
      <Button style={{width:100}} onClick={getQuestions}>Get</Button>
      </center>
      </div>
      
      </center>
      {quizName === '' ? (
       null
      ) : (
        <GetData questions={questions} classes={classes} />
      )}
  
    </div>
    
  );
}

export default DisplayQuiz;
