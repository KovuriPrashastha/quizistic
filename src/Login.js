//login.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import StudentQuiz from './StudentQuiz';
import { db } from './firebase';
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
  const [quizCode, setQuizCode] = React.useState('');
  const handleQuizCode = (event) => {
    setQuizCode(event.target.value);
    console.log(quizCode, event.target.value);
  };
  const [quizGiver, setQuizGiver] = React.useState();
  const [quizName, setQuizName] = React.useState();
  const [questions, setQuestions] = React.useState();
  const [responserName, setResponserName] = React.useState('');
  const handleResponserName = (event) => {
    setResponserName(event.target.value);
  };

  var code;
  var answersResponse = { marks: 0 };

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
    return <div>{answersResponse.marks}</div>;
  }
  return (
    <center className='landing-page'>
      <h5 className='form__heading'> Sign - In Below </h5>
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
      <button className='btn' onClick={handleLogin}>
        Sign In
      </button>
      <br />
      <h5 className='form__heading'> Sign - Up Below </h5>
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
      <button className='btn' onClick={handleSignup}>
        Sign Up
      </button>
      <Router>
        <div>
          <Link to='/attemptquiz'>
            <TextField
              value={quizCode}
              onChange={handleQuizCode}
              placeholder='get code'
            ></TextField>
            <TextField
              value={responserName}
              onChange={handleResponserName}
              placeholder='Enter Name'
            ></TextField>
            <Button onClick={getUniqueCode}>Get Quiz</Button>
          </Link>
        </div>
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
  );
}

export default Login;

// import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { Button, TextField } from '@material-ui/core';
// import StudentQuiz from './StudentQuiz';
// import { db } from './firebase';
// function Login({
//   signInPasswordError,
//   signInEmailError,
//   signInEmail,
//   setSignInPassword,
//   SignInPassword,
//   setSignInEmail,
//   userName,
//   setUserName,
//   email,
//   setEmail,
//   password,
//   setPassword,
//   handleLogin,
//   handleSignup,
//   emailError,
//   passwordError,
//   userNull,
// }) {
//   const [quizCode, setQuizCode] = React.useState('');
//   // const [user, setUser] = React.useState('');
//   // const [name, setName] = React.useState('');
//   const handleQuizCode = (event) => {
//     // var code = event.target.value;
//     setQuizCode(event.target.value);
//     console.log(quizCode, event.target.value);
//   };
//   //const [getCode, setGetCode] = React.useState();
//   const [questions, setQuestions] = React.useState();
//   // const [urlMap, setUrlMap] = React.useState();
//   var code;
//   const getQuestions = () => {
//     //getUniqueCode();

//     db.collection('allQuizes')
//       .doc(code[0])
//       .collection(code[1])
//       .onSnapshot((snapshot) => {
//         setQuestions(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ques: doc.data(),
//           }))
//         );
//       });
//   };

//   function getUniqueCode() {
//     db.collection('generatedQuizes')
//       .doc(quizCode)
//       .collection('urlMap')
//       .get()
//       .then((snap) => {
//         // snap is a QuerySnapshot
//         if (snap.empty) {
//           console.error('No such document!');
//         } else {
//           // Seems like you're expecting either 0 or 1 documents
//           // Easiest solution is to just grab the first in this case
//           let doc = snap.docs[0];
//           console.log('hii', doc.data());
//           code = doc.data().url.split('/');
//           console.log(code[0], code[1]);
//           //    setUser(code[0]);
//           //  setName(code[1]);
//           console.log('now here  ', code[0], code[1]);
//           //console.log('use state variables here ', name, user);
//           setTimeout(getQuestions, 100);
//           // Make sure to get the data from the doc before getting fields
//           if (doc.data().user) {
//             doc
//               .data()
//               .user.get()
//               .then((res) => {
//                 if (!res.exists) {
//                   console.log('user ref not found!');
//                 }
//                 return res.data();
//               })
//               .catch((err) => console.error(err));
//           }
//         }
//         return;
//       })
//       .catch((err) => {
//         console.log('Error getting document', err);
//       });
//   }
//   function doNothing() {
//     // for(var i = 0; i < 5000; i++)
//   }
//   var number = 0;
//   function getSingleQuestion() {
//     while (number < questions.length) {
//       console.log('yes here   ', questions[number].ques);
//       return <StudentQuiz questions={questions[number++].ques} />;
//     }
//     // for (var i = 0; i < questions.length; i++) {
//     //   console.log('yes here   ', questions[i].ques);
//     //   return <StudentQuiz questions={questions[i].ques} />;
//     //   //setTimeout(doNothing, 5000);
//     // }
//   }
//   return (
//     <center className='landing-page'>
//       <h5 className='form__heading'> Sign - In Below </h5>
//       <input
//         placeholder='Email'
//         className='form__field'
//         type='text'
//         autoFocus
//         required
//         value={signInEmail}
//         onChange={(e) => setSignInEmail(e.target.value)}
//       />
//       <p className='error_'> {signInEmailError} </p>{' '}
//       <input
//         className='form__field'
//         placeholder='Password'
//         type='password'
//         required
//         value={SignInPassword}
//         onChange={(e) => setSignInPassword(e.target.value)}
//       />
//       <p className='error_'> {signInPasswordError} </p>{' '}
//       <button className='btn' onClick={handleLogin}>
//         Sign In
//       </button>
//       <br />
//       <h5 className='form__heading'> Sign - Up Below </h5>
//       <input
//         className='form__field'
//         placeholder='Your Name'
//         type='text'
//         autoFocus
//         required
//         value={userName}
//         onChange={(e) => {
//           setUserName(e.target.value);
//         }}
//       />
//       {userNull ? <p className='error_'>Enter A User Name</p> : null}
//       <br />
//       <br />
//       <input
//         className='form__field'
//         placeholder='Email'
//         type='text'
//         autoFocus
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <p className='error_'> {emailError} </p>
//       <input
//         className='form__field'
//         placeholder='Choose Your Password'
//         type='password'
//         required
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <p className='error_'> {passwordError} </p>
//       <button className='btn' onClick={handleSignup}>
//         Sign Up
//       </button>
//       <Router>
//         <div>
//           <Link to='/attemptquiz'>
//             <TextField
//               value={quizCode}
//               onChange={handleQuizCode}
//               placeholder='get code'
//             ></TextField>
//             <Button onClick={getUniqueCode}>Get Quiz</Button>
//           </Link>
//         </div>
//         <Switch>
//           {questions ? (
//             <Route exact path='/attemptquiz'>
//               {getSingleQuestion}
//               {/* {questions.map(({ id, ques }, index) => (
//                 <StudentQuiz questions={ques} />
//               ))} */}
//               <Button onClick={getSingleQuestion}>Next Question</Button>
//             </Route>
//           ) : (
//             <div></div>
//           )}
//         </Switch>
//       </Router>
//     </center>
//   );
// }

// export default Login;
