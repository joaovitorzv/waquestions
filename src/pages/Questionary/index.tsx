import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Chip,
  Paper,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavigateNextOutlined from '@material-ui/icons/NavigateNextOutlined'
import { useHistory } from 'react-router-dom'

import Header from '../../components/Header'
import { useQuestions, QuestionsReducerType } from '../../hooks/questions'
import api from '../../api'

const questionaryStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  header: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.light
  },
  question: {
    padding: theme.spacing(2),
    '& p': {
      fontWeight: theme.typography.fontWeightBold
    }
  },
  form: {
    marginTop: theme.spacing(2)
  },
  nextButton: {
    marginTop: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  }
}))

const Questionary: React.FC = () => {
  const [answer, setAnswer] = useState<string | null>(null)
  const { questionary, dispatch } = useQuestions()

  const history = useHistory()

  useEffect(() => {
    if (!questionary.quantity) {
      history.push('/')
    }

    async function fetchQuestions() {
      const response = await api.get(`?amount=${questionary.quantity}`)
      dispatch({ type: QuestionsReducerType.LOAD_QUESTIONARY, questions: response.data.results })
    }

    fetchQuestions()
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value)
  }

  const classes = questionaryStyles()
  return (
    <>
      {questionary.questions.length === 0 && (
        <Backdrop open={true} className={classes.backdrop}>
          <CircularProgress color='primary' />
        </Backdrop>
      )}
      <Header />
      <Container maxWidth='md' className={classes.root}>
        <Box className={classes.header} component='header'>
          <Typography variant='h2'>
            Questionary
          </Typography>
          <Chip label='Question 1 of 30' variant='outlined' size='small' disabled />
        </Box>
        <Paper elevation={0} variant='outlined' className={classes.question}>
          <Typography variant='body1' component='p'>{questionary.questions[0].question}</Typography>
          <FormControl component='fieldset' className={classes.form}>
            <RadioGroup aria-label='Answer' value={answer} onChange={handleChange}>
              <FormControlLabel value='Answer A' control={<Radio />} label={questionary.questions[0].correct_answer} />
              <FormControlLabel value='Answer B' control={<Radio />} label={questionary.questions[0].incorrect_answers[0]} />
              <FormControlLabel value='Answer C' control={<Radio />} label={questionary.questions[0].incorrect_answers[1]} />
              <FormControlLabel value='Answer D' control={<Radio />} label={questionary.questions[0].incorrect_answers[2]} />
            </RadioGroup>
            <Button
              variant='contained'
              color='primary'
              endIcon={<NavigateNextOutlined />}
              className={classes.nextButton}
              disableElevation
              size='large'
            >
              Next question
          </Button>
          </FormControl>
        </Paper>
      </Container>
    </>
  );
}

export default Questionary;