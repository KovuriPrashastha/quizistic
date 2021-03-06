import React from 'react';
import { db } from './firebase.js';
import { AddTwoTone } from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import './constant.css';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 200,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();
  const [quizName, setQuizName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [question, setQuestion] = React.useState('');
  const [option1, setOption1] = React.useState('');
  const [option2, setOption2] = React.useState('');
  const [option3, setOption3] = React.useState('');
  const [option4, setOption4] = React.useState('');
  const [chooseAnswer, setChooseAnswer] = React.useState(option1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(question, option1, option2, option3, option4);
    setOpen(false);
  };
  const uploadQuestion = () => {
    handleClose();
    db.collection('allQuizes')
      .doc(firebase.auth().currentUser.displayName)
      .collection(quizName)
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        tName: firebase.auth().currentUser.displayName,
        tId: firebase.auth().currentUser.uid,
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: chooseAnswer,
      });
    setQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleChangeOp1 = (event) => {
    setOption1(event.target.value);
  };
  const handleChangeOp2 = (event) => {
    setOption2(event.target.value);
  };
  const handleChangeOp3 = (event) => {
    setOption3(event.target.value);
  };
  const handleChangeOp4 = (event) => {
    setOption4(event.target.value);
  };
  const handleSetAnswer = (event) => {
    // console.log('here', event.target.value);
    setChooseAnswer(event.target.value);
  };
  const handleQuizName = (event) => {
    //console.log('here', event.target.value);
    setQuizName(event.target.value);
  };
  return (
    <div>
      <TextField
        style={{ padding: 10 }}
        size='small'
        label='Enter Quiz Name'
        variant='outlined'
        value={quizName}
        onChange={handleQuizName}
      />
      <br />
      <Button
        className='button button1'
        startIcon={<AddTwoTone />}
        color='primary'
        variant='outlined'
        onClick={handleClickOpen}
      >
        Add Question
      </Button>

      <br />

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>Add your question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* {You can set my maximum width and whether to adapt or not.} */}
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <TextField
                label='Enter Question'
                value={question}
                onChange={handleChange}
                id='standard-full-width'
                style={{ width: '100%' }}
                inputStyle={{ width: '100%' }}
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RadioGroup value={chooseAnswer} onChange={handleSetAnswer}>
                <FormControlLabel
                  value={option1}
                  control={<Radio />}
                  label={
                    <TextField value={option1} onChange={handleChangeOp1} />
                  }
                />
                <FormControlLabel
                  control={<Radio />}
                  value={option2}
                  label={
                    <TextField value={option2} onChange={handleChangeOp2} />
                  }
                />
                <FormControlLabel
                  control={<Radio />}
                  value={option3}
                  label={
                    <TextField value={option3} onChange={handleChangeOp3} />
                  }
                />
                <FormControlLabel
                  control={<Radio />}
                  value={option4}
                  label={
                    <TextField value={option4} onChange={handleChangeOp4} />
                  }
                />
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className='button button1'
            onClick={uploadQuestion}
            color='primary'
          >
            Save Question
          </Button>
          {/* <Snackbar
            open={openSnacbar}
            autoHideDuration={6000}
            onClose={closeSnackbar}
          >
            <Alert onClose={closeSnackbar} severity='success'>
              This is a success message!
            </Alert>
          </Snackbar> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
