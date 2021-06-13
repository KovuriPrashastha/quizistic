import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@material-ui/core';
import { db } from './firebase.js';
import firebase from 'firebase';

function GetResponses() {
  const [quizName, setQuizName] = useState();
  const [responses, setResponses] = useState();
  const handleQuizName = (event) => {
    setQuizName(event.target.value);
  };
  function display() {
    console.log(responses);
  }
  const getResponses = () => {
    if (quizName) {
      db.collection('responses')
        .doc(firebase.auth().currentUser.displayName)
        .collection(quizName)

        .onSnapshot((snapshot) => {
          setResponses(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              student: doc.data(),
            }))
          );
        });
      display();
    }
  };
  return (
    <div>
      <TextField
        value={quizName}
        onChange={handleQuizName}
        placeholder='get code'
      ></TextField>
      {responses ? (
        <div>
          {responses.map(({ id, student }, index) => (
            <Card variant='outlined'>
              <Typography>Name : {student.name}</Typography>
              <Typography>Marks : {student.marks}</Typography>
            </Card>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <Button onClick={getResponses} color='primary' variant='outlined'>
        Get Responses
      </Button>
    </div>
  );
}

export default GetResponses;
