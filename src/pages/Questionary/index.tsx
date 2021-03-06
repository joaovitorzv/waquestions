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
import { decodeHtml } from '../../utils'

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
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(2)
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

  const currentQuestion = questionary.questions[questionary.question_pointer]

  const history = useHistory()

  useEffect(() => {
    if (!questionary.quantity) {
      history.push('/')
    } else {
      fetchQuestions()
    }

    async function fetchQuestions() {
      const response = await api.get(`?amount=${questionary.quantity}`)
      dispatch({ type: QuestionsReducerType.LOAD_QUESTIONARY, questions: response.data.results })
    }
  }, [dispatch, history, questionary.quantity])

  function handleNextQuestion() {
    if (!answer) {
      return
    }

    dispatch({
      type: QuestionsReducerType.NEXT_QUESTION,
      question_id: currentQuestion.id,
      answer: answer
    })
    setAnswer(null)

    if (questionary.question_pointer === questionary.quantity! - 1) {
      history.push('/attempts')
    }
  }

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
          <Chip
            label={`Question ${questionary.question_pointer + 1} of ${questionary.quantity}`}
            variant='outlined'
            size='small'
            disabled
          />
        </Box>
        {currentQuestion && (
          <Paper elevation={0} variant='outlined' className={classes.question}>
            <Box className={classes.details}>
              <Typography variant='subtitle1'>{currentQuestion.category}</Typography>
              <Chip size='small' label={currentQuestion.difficulty} />
            </Box>
            <Typography variant='body1' component='p'>
              {decodeHtml(currentQuestion.question)}
            </Typography>
            <FormControl component='fieldset' className={classes.form}>
              <RadioGroup aria-label='Answer' value={answer} onChange={handleChange}>
                {currentQuestion.incorrect_answers.map((answer) => (
                  <FormControlLabel
                    key={answer}
                    value={decodeHtml(answer)}
                    label={decodeHtml(answer)}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
              <Button
                variant='contained'
                color='primary'
                endIcon={<NavigateNextOutlined />}
                className={classes.nextButton}
                disableElevation
                size='large'
                onClick={handleNextQuestion}
              >
                Next question
              </Button>
            </FormControl>
          </Paper>
        )}
      </Container>
    </>
  );
}

export default Questionary;