import React, { useState } from 'react';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { CheckCircleSharp, Edit } from '@material-ui/icons';
import firebase from 'firebase';
import './constant.css';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 600,
    width: '80%',
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
var questionToEdit;
var qId;
var qName;
var q, o1, o2, o3, o4, ans;
function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [question, setQuestion] = React.useState(q);
  // const [option1, setOption1] = React.useState(o1);
  // const [option2, setOption2] = React.useState(o2);
  // const [option3, setOption3] = React.useState(o3);
  // const [option4, setOption4] = React.useState(o4);
  const [chooseAnswer, setChooseAnswer] = React.useState('');
  const handleChange = (event) => {
    setQuestion(event.target.value);
    q = event.target.value;
  };
  const handleChangeOp1 = (event) => {
    // setOption1(event.target.value);
    o1 = event.target.value;
  };
  const handleChangeOp2 = (event) => {
    //setOption2(event.target.value);
    o2 = event.target.value;
  };
  const handleChangeOp3 = (event) => {
    // setOption3(event.target.value);
    o3 = event.target.value;
  };
  const handleChangeOp4 = (event) => {
    //setOption4(event.target.value);
    o4 = event.target.value;
  };
  const handleSetAnswer = (event) => {
    setChooseAnswer(event.target.value);
    ans = event.target.value;
    console.log(ans);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  function handleUpdateQuestion() {
    console.log(firebase.auth().currentUser.displayName, qName, qId);
    db.collection('allQuizes')
      .doc(firebase.auth().currentUser.displayName)
      .collection(qName)
      .doc(qId)
      .update({
        question: q,
        option1: o1,
        option2: o2,
        option3: o3,
        option4: o4,
        answer: chooseAnswer,
      });

    // setQuestion('');
    // setOption1('');
    // setOption2('');
    // setOption3('');
    // setOption4('');
  }
  if (questionToEdit) {
    // setQuestion(questionToEdit.question);
    // setOption1(questionToEdit.option1);
    // setOption2(questionToEdit.option2);
    // setOption3(questionToEdit.option3);
    // setOption4(questionToEdit.option4);
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>
          Edit your question
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <TextField
                label='Enter Question'
                value={q}
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
                  value={o1}
                  control={<Radio />}
                  label={<TextField value={o1} onChange={handleChangeOp1} />}
                />
                <FormControlLabel
                  control={<Radio />}
                  value={o2}
                  label={<TextField value={o2} onChange={handleChangeOp2} />}
                />
                <FormControlLabel
                  control={<Radio />}
                  value={o3}
                  label={<TextField value={o3} onChange={handleChangeOp3} />}
                />
                <FormControlLabel
                  control={<Radio />}
                  value={o4}
                  label={<TextField value={o4} onChange={handleChangeOp4} />}
                />
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className='button button1'
            onClick={handleUpdateQuestion}
            color='primary'
          >
            Edit Question
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return <div></div>;
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
//const emails = ['username@gmail.com', 'user02@gmail.com'];
function GetData(props) {
  const [open, setOpen] = React.useState(false);
  //const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  function handleQuestionToEdit(ques, id, qname) {
    console.log('hi');
    questionToEdit = ques;
    qId = id;
    qName = qname;
    q = ques.question;
    o1 = ques.option1;
    o2 = ques.option2;
    o3 = ques.option3;
    o4 = ques.option4;
    ans = ques.answer;
    handleClickOpen();
    console.log(questionToEdit);
    console.log('id here : ', id, qname, o1, o2, o3, o4);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    //setSelectedValue(value);
  };
  return (
    <div>
      {props.questions.map(({ id, ques }, index) => (
        <center>
          <Card className={props.classes.root} variant='outlined'>
            <IconButton>
              <Edit
                onClick={(event) => handleQuestionToEdit(ques, id, props.qName)}
              />
            </IconButton>
            <SimpleDialog open={open} onClose={handleClose} question={ques} />
            <CardContent>
              <Typography align='left' variant='h5' component='h2'>
                {index + 1 + '. ' + ques.question}
              </Typography>
              <Typography
                align='left'
                className={props.classes.pos}
                color='textSecondary'
              >
                {ques.option1 === ques.answer ? (
                  <CheckCircleSharp style={{ color: 'green' }} />
                ) : (
                  ''
                )}
                {' ' + ques.option1}
              </Typography>
              <Typography
                align='left'
                className={props.classes.pos}
                color='textSecondary'
              >
                {ques.option2 === ques.answer ? (
                  <CheckCircleSharp style={{ color: 'green' }} />
                ) : (
                  ''
                )}
                {' ' + ques.option2}
              </Typography>
              <Typography
                align='left'
                className={props.pos}
                color='textSecondary'
              >
                {ques.option3 === ques.answer ? (
                  <CheckCircleSharp style={{ color: 'green' }} />
                ) : (
                  ''
                )}
                {' ' + ques.option3}
              </Typography>
              <Typography
                align='left'
                className={props.classes.pos}
                color='textSecondary'
              >
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
    qName = event.target.value;
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
        <div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
          <TextField
            style={{ padding: 10 }}
            size='small'
            variant='outlined'
            label='Enter Quiz Name'
            value={quizName}
            onChange={handleQuizName}
          />
          <center>
            <Button
              className='button button1'
              style={{ width: 100 }}
              onClick={getQuestions}
            >
              Get
            </Button>
          </center>
        </div>
      </center>
      {quizName === '' ? null : (
        <GetData questions={questions} classes={classes} qName={quizName} />
      )}
    </div>
  );
}

export default DisplayQuiz;
