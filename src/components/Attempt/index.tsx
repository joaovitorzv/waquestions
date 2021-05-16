import {
  Container,
  Box,
  Typography,
  Paper,
  Chip,
  Divider
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles'

import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'

const attemptStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },
  questionsStatus: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  questionResult: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    '& .MuiChip-root': {
      marginTop: theme.spacing(1)
    }
  }
}))

function renderQuestionResult(question: string, correctAnswer: string, wrongAnswer?: string) {
  const classes = attemptStyles()

  return (
    <Box className={classes.questionResult}>
      <Typography variant='body1'>1 - {question}</Typography>
      <Chip icon={<Check />} label={correctAnswer} color='primary' />
      {wrongAnswer && (
        <Chip icon={<Clear />} label={wrongAnswer} color='secondary' />
      )}
    </Box>
  )
}

const Attempt: React.FC = () => {
  const classes = attemptStyles()

  return (
    <Paper elevation={0} variant='outlined' className={classes.root}>
      <Typography variant='h4'>15/05/2021</Typography>
      <Box display='flex' justifyContent='space-between' className={classes.questionsStatus}>
        <Chip size='small' label='30 Questions' variant='outlined' />
        <Chip size='small' label='18 Correct' color='primary' variant='outlined' icon={<Check />} />
        <Chip size='small' label='12 Wrong' color='secondary' variant='outlined' icon={<Clear />} />
      </Box>
      <Divider />
      {renderQuestionResult('What goes inside normal humans head?', 'Answer B', 'Answer A')}
      {renderQuestionResult('What goes inside normal humans head?', 'Answer C')}
    </Paper>
  );
}

export default Attempt;