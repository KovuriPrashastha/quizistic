import React, { useState } from 'react';
import { db } from './firebase.js';
import firebase from 'firebase';
import { Button, TextField, IconButton } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import otpGenerator from 'otp-generator';
import './constant.css';

function GenerateQuiz() {
  const [quizName, setQuizName] = useState('');
  const [url, setUrl] = useState('');
  const [otp, setOtp] = useState('');
  const handleQuizName = (event) => {
    setQuizName(event.target.value);
  };
  const getUrl = () => {
    var otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    setOtp(otp);
    console.log(otp);
    var url = firebase.auth().currentUser.displayName + '/' + quizName;
    setUrl(url);
    db.collection('generatedQuizes').doc(otp).collection('urlMap').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      otp: otp,
      url: url,
    });
    // console.log(url);
  };
  function copyUrl() {
    var copyText = document.getElementById('my-url');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }
  return (
    <center>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          height: 200,
          width: 300,
        }}
      >
        <TextField
          size='small'
          id='filled-basic'
          label='Enter Quiz Name'
          variant='filled'
          value={quizName}
          onChange={handleQuizName}
        />
        <Button
          className='button button1'
          onClick={getUrl}
          color='primary'
          variant='outlined'
        >
          Generate Code
        </Button>
        <div>
          <TextField size='small' id='my-url' variant='filled' value={otp} />
          <IconButton className='button button1' onClick={copyUrl}>
            <FileCopy />
          </IconButton>
        </div>{' '}
      </div>
    </center>
  );
}

export default GenerateQuiz;
