//studentquiz.js
// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

// const useStyles = makeStyles({
//   root: {
//     '&:hover': {
//       backgroundColor: 'transparent',
//       minWidth: 200,
//     },
//   },
//   icon: {
//     borderRadius: '50%',
//     width: 16,
//     height: 16,
//     boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
//     backgroundColor: '#f5f8fa',
//     backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
//     '$root.Mui-focusVisible &': {
//       outline: '2px auto rgba(19,124,189,.6)',
//       outlineOffset: 2,
//     },
//     'input:hover ~ &': {
//       backgroundColor: '#ebf1f5',
//     },
//     'input:disabled ~ &': {
//       boxShadow: 'none',
//       background: 'rgba(206,217,224,.5)',
//     },
//   },
//   checkedIcon: {
//     backgroundColor: '#137cbd',
//     backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
//     '&:before': {
//       display: 'block',
//       width: 16,
//       height: 16,
//       backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
//       content: '""',
//     },
//     'input:hover ~ &': {
//       backgroundColor: '#106ba3',
//     },
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

// function StudentQuiz(props) {
//   const classes = useStyles();

//   return (
//     <Radio
//       className={classes.root}
//       disableRipple
//       color="default"
//       checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
//       icon={<span className={classes.icon} />}
//       {...props}
//     />
//   );
// }

// export default function CustomizedRadios() {
//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend">Gender</FormLabel>
//       <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios">
//         <FormControlLabel value="female" control={<StyledRadio />} label="Female" />
//         <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
//         <FormControlLabel value="other" control={<StyledRadio />} label="Other" />
//         <FormControlLabel
//           value="disabled"
//           disabled
//           control={<StyledRadio />}
//           label="(Disabled option)"
//         />
//       </RadioGroup>
//     </FormControl>
//   );
// }

// import React from 'react';
// import { db } from './firebase';
// import { makeStyles } from '@material-ui/core/styles';
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
// } from '@material-ui/core';
// import { CheckCircleSharp } from '@material-ui/icons';

// const useStyles = makeStyles({

// });

// function StudentQuiz({ questions }) {
//   const classes = useStyles();
//   return (
//     <div>
//       {questions.map(({ id, ques }, index) => (
//         <Card className={classes.root} variant='outlined'>
//           <CardContent>
//             <Typography variant='h5' component='h2'>
//               {index + 1 + '. ' + ques.question}
//             </Typography>
//             <Typography className={classes.pos} color='textSecondary'>
//               {ques.option1 === ques.answer ? (
//                 <CheckCircleSharp style={{ color: 'green' }} />
//               ) : (
//                 ''
//               )}
//               {' ' + ques.option1}
//             </Typography>
//             <Typography className={classes.pos} color='textSecondary'>
//               {ques.option2 === ques.answer ? (
//                 <CheckCircleSharp style={{ color: 'green' }} />
//               ) : (
//                 ''
//               )}
//               {' ' + ques.option2}
//             </Typography>
//             <Typography className={classes.pos} color='textSecondary'>
//               {ques.option3 === ques.answer ? (
//                 <CheckCircleSharp style={{ color: 'green' }} />
//               ) : (
//                 ''
//               )}
//               {' ' + ques.option3}
//             </Typography>
//             <Typography className={classes.pos} color='textSecondary'>
//               {ques.option4 === ques.answer ? (
//                 <CheckCircleSharp style={{ color: 'green' }} />
//               ) : (
//                 ''
//               )}
//               {' ' + ques.option4}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default StudentQuiz;

import React from 'react';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

import { CheckCircleSharp } from '@material-ui/icons';

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

function StudentQuiz({ questions, answersResponse }) {
  const [chooseAnswer, setChooseAnswer] = React.useState('');

  const handleSetAnswer = (event) => {
    //console.log('here', event.target.value);
    setChooseAnswer(event.target.value);
    if (event.target.value === questions.answer) {
      answersResponse.marks = answersResponse.marks + 1;
      console.log('correct answer!!', answersResponse.marks);
    }
  };

  const classes = useStyles();
  return (
    <div>
      {/* {questions.map(({ id, ques }, index) => ( */}
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <TextField
                value={questions.question}
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
                  value={questions.option1}
                  control={<Radio />}
                  label={<TextField value={questions.option1} />}
                />
                <FormControlLabel
                  control={<Radio />}
                  value={questions.option2}
                  label={<TextField value={questions.option2} />}
                />
                <FormControlLabel
                  control={<Radio />}
                  value={questions.option3}
                  label={<TextField value={questions.option3} />}
                />
                <FormControlLabel
                  control={<Radio />}
                  value={questions.option4}
                  label={<TextField value={questions.option4} />}
                />
                <div>{questions.answer}</div>
              </RadioGroup>
            </FormControl>
          </form>
          {/* <Typography variant='h5' component='h2'>
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
            </Typography> */}
        </CardContent>
      </Card>
      {/* ))} */}
    </div>
  );
}

export default StudentQuiz;
