import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { CheckCircleSharp } from '@material-ui/icons';
import firebase from 'firebase';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
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

function GetQuestions() {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    db.collection('questions')
      .where('cId', '==', firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        setQuestions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ques: doc.data(),
          }))
        );
      });
    console.log(questions);
  }, []);
  return (
    <div>
      {questions.map(({ id, ques }, index) => (
        <Card className={classes.root} variant='outlined'>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {index + 1 + '. ' + ques.question}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {ques.option1 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option1}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {ques.option2 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option2}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {ques.option3 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option3}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              {ques.option4 === ques.answer ? (
                <CheckCircleSharp style={{ color: 'green' }} />
              ) : (
                ''
              )}
              {' ' + ques.option4}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default GetQuestions;
