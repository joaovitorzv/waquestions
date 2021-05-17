import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'

import { Attempt as AttemptType } from '../../hooks/questions'

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

function renderQuestionResult(idx: number, question: string, correct: string, incorrect: string) {
  const classes = attemptStyles()

  return (
    <Box className={classes.questionResult}>
      <Typography variant='body1'>{idx} - {question}</Typography>
      <Chip icon={<Check />} label={correct} color='primary' />
      <Chip icon={<Clear />} label={incorrect} color='secondary' />
    </Box>
  )
}

type Props = {
  attempt: AttemptType,
  idx: number
}

const Attempt: React.FC<Props> = (props) => {
  const classes = attemptStyles()

  const dateDay = new Date(props.attempt.date).getDay()
  const dateMonth = new Date(props.attempt.date).getMonth()
  const dateYear = new Date(props.attempt.date).getFullYear()

  const correctQuestions = props.attempt.questionary.answers.filter((answerObj, idx) => {
    return answerObj.answer.toLowerCase()
      .includes(props.attempt.questionary.questions[idx].correct_answer.toLowerCase())
  })

  const incorrectQuestions = props.attempt.questionary.answers.filter((answerObj, idx) => {
    return !answerObj.answer.toLowerCase().includes(props.attempt.questionary.questions[idx].correct_answer.toLowerCase())
  })

  console.log({ correctQuestions, incorrectQuestions })

  return (
    <Paper elevation={0} variant='outlined' className={classes.root}>
      <Typography variant='h4'>
        {`${dateDay}/${dateMonth}/${dateYear}`}
      </Typography>
      <Box display='flex' justifyContent='space-between' className={classes.questionsStatus}>
        <Chip
          size='small'
          label={props.attempt.questionary.quantity === 1
            ? `${props.attempt.questionary.quantity} question`
            : `${props.attempt.questionary.quantity} questions`}
          variant='outlined'
        />
        <Chip size='small' label={`${correctQuestions.length} correct`} color='primary' variant='outlined' icon={<Check />} />
        <Chip size='small' label={`${incorrectQuestions.length} incorrect`} color='secondary' variant='outlined' icon={<Clear />} />
      </Box>
      <Divider />
      {props.attempt.questionary.questions.map((questionObj, idx) => (
        <Box className={classes.questionResult}>
          <Typography variant='body1'>{idx} - {questionObj.question}</Typography>
          <Chip icon={<Check />} label={questionObj.correct_answer} color='primary' />
          {props.attempt.questionary.answers[idx] && (
            <Chip icon={<Clear />} label={props.attempt.questionary.answers[idx].answer} color='secondary' />
          )}
        </Box>
      ))}
    </Paper>
  );
}

export default Attempt;