import React from 'react';
import { fire } from './firebase.js';
import { AddTwoTone } from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Divider,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
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
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [question, setQuestion] = React.useState('');
  const [option1, setOption1] = React.useState('');
  const [option2, setOption2] = React.useState('');
  const [option3, setOption3] = React.useState('');
  const [option4, setOption4] = React.useState('');
  const [chooseAnswer, setChooseAnswer] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(question, option1, option2, option3, option4);
    setOpen(false);
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
    setChooseAnswer(event.target.value);
  };
  return (
    <React.Fragment>
      <Button
        startIcon={<AddTwoTone />}
        color='primary'
        variant='outlined'
        onClick={handleClickOpen}
      >
        Add Question
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
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
                  control={<Radio />}
                  label={
                    <TextField value={option1} onChange={handleChangeOp1} />
                  }
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <TextField value={option2} onChange={handleChangeOp2} />
                  }
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <TextField value={option3} onChange={handleChangeOp3} />
                  }
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <TextField value={option4} onChange={handleChangeOp4} />
                  }
                />
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={() => {
          fire.auth().signOut();
        }}
      >
        Logout
      </Button>
    </React.Fragment>
  );
}

export default Home;
