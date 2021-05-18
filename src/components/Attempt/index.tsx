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
import { decodeHtml } from '../../utils';

const attemptStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },
  questionsStatus: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'start',
      '& .MuiChip-root': {
        marginRight: theme.spacing(2),
      }
    }
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(1)
  },
  questionResult: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  questionResultChip: {
    marginTop: theme.spacing(1)
  }
}))

type Props = {
  attempt: AttemptType,
  idx: number
}

const Attempt: React.FC<Props> = (props) => {
  const classes = attemptStyles()

  const date = new Date(props.attempt.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })

  return (
    <div id={props.attempt.id}>
      <Paper elevation={0} variant='outlined' className={classes.root}>
        <Typography variant='subtitle2'>
          {date}
        </Typography>
        <Box className={classes.questionsStatus}>
          <Chip
            size='small'
            label={props.attempt.questionary.quantity === 1
              ? `${props.attempt.questionary.quantity} question`
              : `${props.attempt.questionary.quantity} questions`}
            variant='outlined'
          />
          <Chip size='small' label={`${props.attempt.questions_correct} correct`} color='primary' variant='outlined' icon={<Check />} />
          <Chip size='small' label={`${props.attempt.questions_incorrect} incorrect`} color='secondary' variant='outlined' icon={<Clear />} />
        </Box>
        <Divider />
        {props.attempt.questionary.questions.map((questionObj, idx) => (
          <Box className={classes.questionResult}>
            <Box className={classes.details}>
              <Typography variant='subtitle2'>{questionObj.category}</Typography>
              <Chip size='small' label={questionObj.difficulty} />
            </Box>
            <Typography variant='body1'>{idx + 1} - {decodeHtml(questionObj.question)}</Typography>
            <Chip
              className={classes.questionResultChip}
              icon={<Check />}
              label={decodeHtml(questionObj.correct_answer)}
              color='primary'
            />
            {!props.attempt.questionary.answers[idx].answer.includes(questionObj.correct_answer) && (
              <Chip
                className={classes.questionResultChip}
                icon={<Clear />}
                label={decodeHtml(props.attempt.questionary.answers[idx].answer)}
                color='secondary'
              />
            )}
          </Box>
        ))}
      </Paper>
    </div>
  );
}

export default Attempt;