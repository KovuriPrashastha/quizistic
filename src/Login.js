//login.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, TextField, Typography, Paper } from '@material-ui/core';
import StudentQuiz from './StudentQuiz';
import { withStyles } from '@material-ui/core/styles';
import { db } from './firebase';
//import vector1 from './images/vector2.png';
import background from './images/background.jpg';

function Login({
  signInPasswordError,
  signInEmailError,
  signInEmail,
  setSignInPassword,
  SignInPassword,
  setSignInEmail,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleSignup,
  emailError,
  passwordError,
  userNull,
}) {
  const [quizCode, setQuizCode] = useState('');
  const handleQuizCode = (event) => {
    setQuizCode(event.target.value);
    console.log(quizCode, event.target.value);
  };
  const [quizGiver, setQuizGiver] = useState();
  const [quizName, setQuizName] = useState();
  const [questions, setQuestions] = useState();
  const [responserName, setResponserName] = useState('');
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleResponserName = (event) => {
    setResponserName(event.target.value);
  };
  const WhiteTextTypography = withStyles({
    root: {
      color: '#FFFFFF',
    },
  })(Typography);
  var code;
  var answersResponse = { marks: 0 };
  const handleOpenSignUp = () => {
    if (openSignUp) setOpenSignUp(false);
    else setOpenSignUp(true);
  };
  const getQuestions = () => {
    db.collection('allQuizes')
      .doc(code[0])
      .collection(code[1])
      .onSnapshot((snapshot) => {
        setQuestions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ques: doc.data(),
          }))
        );
      });
  };

  function getUniqueCode() {
    if (quizCode) {
      console.log('hii', quizCode);
      db.collection('generatedQuizes')
        .doc(quizCode)
        .collection('urlMap')
        .get()
        .then((snap) => {
          if (snap.empty) {
            console.error('No such document!');
          } else {
            let doc = snap.docs[0];
            console.log('hii', doc.data());
            code = doc.data().url.split('/');
            console.log(code[0], code[1]);
            setQuizGiver(code[0]);
            setQuizName(code[1]);
            console.log('now here  ', code[0], code[1]);
            setTimeout(getQuestions, 100);
            if (doc.data().user) {
              doc
                .data()
                .user.get()
                .then((res) => {
                  if (!res.exists) {
                    console.log('user ref not found!');
                  }
                  return res.data();
                })
                .catch((err) => console.error(err));
            }
          }
          return;
        })
        .catch((err) => {
          console.log('Error getting document', err);
        });
    }
  }
  function storeResult() {
    console.log('now here  ', quizGiver, quizName); // code[0], code[1]);
    db.collection('responses').doc(quizGiver).collection(quizName).add({
      marks: answersResponse.marks,
      name: responserName,
    });
  }
  var number = 0;
  function getSingleQuestion() {
    setTimeout(() => {
      for (var i = 0; i < 2000; i++) continue;
    }, 10);
    while (number < questions.length) {
      return (
        <StudentQuiz
          key={number}
          questions={questions[number++].ques}
          answersResponse={answersResponse}
        />
      );
    }
    storeResult();
    return (
      <div>
        <WhiteTextTypography variant='h6' gutterBottom>
          {'Your response is stored'}
        </WhiteTextTypography>
        <WhiteTextTypography variant='h6' gutterBottom>
          {'Thank You !!'}
        </WhiteTextTypography>
      </div>
    );
  }
  return (
    <div
      className='login'
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* <Card styles={{ width: '200px', height: '200px' }}> */}

      <center className='landing-page'>
        <Paper
          style={{
            width: '35%',
            'border-style': 'solid',
            'border-color': '#5a24b4',
            'border-radius': '25px',
            'border-width': 'thick',
          }}
        >
          {/* <img src={vector1} alt='' width='500' height='400' /> */}
          <WhiteTextTypography
            color='#FFFFFF'
            style={{ fontSize: 20 }}
            className='form__heading'
          >
            {' '}
            Sign In to create Quiz{' '}
          </WhiteTextTypography>
          <input
            placeholder='Email'
            className='form__field'
            type='text'
            autoFocus
            required
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
          />
          <p className='error_'> {signInEmailError} </p>{' '}
          <input
            className='form__field'
            placeholder='Password'
            type='password'
            required
            value={SignInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
          />
          <p className='error_'> {signInPasswordError} </p>{' '}
          <Button variant='outlined' color='primary' onClick={handleLogin}>
            Sign In
          </Button>
          <br />
          <br />
        </Paper>
        <br />
        <br />
        <WhiteTextTypography
          style={{ fontSize: 14, cursor: 'pointer' }}
          onClick={handleOpenSignUp}
        >
          Not Registered? Create an account
          <strong> Sign Up </strong>
        </WhiteTextTypography>
        {openSignUp ? (
          <Paper
            style={{
              width: '35%',
              'border-style': 'solid',
              'border-color': '#5a24b4',
              'border-radius': '25px',
              'border-width': 'thick',
            }}
          >
            <WhiteTextTypography
              style={{ fontSize: 20 }}
              className='form__heading'
            >
              {' '}
              Sign Up below{' '}
            </WhiteTextTypography>
            <input
              className='form__field'
              placeholder='Your Name'
              type='text'
              autoFocus
              required
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            {userNull ? <p className='error_'>Enter A User Name</p> : null}
            <br />
            <br />
            <input
              className='form__field'
              placeholder='Email'
              type='text'
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='error_'> {emailError} </p>
            <input
              className='form__field'
              placeholder='Choose Your Password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='error_'> {passwordError} </p>
            <Button
              variant='outlined'
              color='primary'
              className='btn'
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <br />
            <br />
          </Paper>
        ) : (
          ''
        )}
        <br />
        <br />
        <Router>
          <Paper
            style={{
              width: '35%',

              'border-style': 'solid',
              'border-color': '#5a24b4',
              'border-radius': '25px',
              'border-width': 'thick',
            }}
          >
            <br />
            <TextField
              value={quizCode}
              onChange={handleQuizCode}
              placeholder='Enter Code'
            ></TextField>
            <br />
            <TextField
              value={responserName}
              onChange={handleResponserName}
              placeholder='Enter Name'
            ></TextField>
            <br />
            <br />
            <Link to='/attemptquiz'>
              <Button
                variant='outlined'
                color='primary'
                className='btn'
                onClick={getUniqueCode}
                disabled={quizCode === '' || responserName === ''}
              >
                Get Quiz
              </Button>
              <br />
              <br />
            </Link>
          </Paper>
          <Switch>
            {questions ? (
              <Link>
                <Route path='/attemptquiz'>{getSingleQuestion}</Route>
                {/* <Button to='/attemptquiz' color='primary' variant='outlined'>
                Next Question
              </Button> */}
              </Link>
            ) : (
              // <Route exact path='/attemptquiz'>
              //   {getSingleQuestion}
              //   {/* {questions.map(({ id, ques }, index) => (
              //     <StudentQuiz questions={ques} />
              //   ))} */}
              //   <Button onClick={getSingleQuestion}>Next Question</Button>
              // </Route>
              <div></div>
            )}
          </Switch>
        </Router>
      </center>
      {/* </Card> */}
    </div>
  );
}

export default Login;
