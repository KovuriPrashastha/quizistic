import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@material-ui/core';
import { db } from './firebase.js';
import firebase from 'firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        .orderBy('marks', 'desc')
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
        style={{ padding: 10 }}
        value={quizName}
        onChange={handleQuizName}
        placeholder='get code'
      />

      {responses ? (
        <center>
          {responses.map(({ id, student }, index) => (
            <TableContainer
              style={{ margin: 10, width: 300 }}
              component={Paper}
            >
              <Table aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell align='left'>
                      {' '}
                      <Typography>Name </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      {' '}
                      <Typography>{student.name}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>
                      {' '}
                      <Typography>Marks </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      {' '}
                      <Typography>{student.marks}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </center>
      ) : (
        <div></div>
      )}
      <Button
        style={{ margin: 10 }}
        onClick={getResponses}
        color='primary'
        variant='outlined'
      >
        Get Responses
      </Button>
    </div>
  );
}

export default GetResponses;
