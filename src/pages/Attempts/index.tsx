import {
  Container,
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import HighlightOff from '@material-ui/icons/HighlightOff'

import { useQuestions } from '../../hooks/questions'
import Header from '../../components/Header'
import Attempt from '../../components/Attempt'

const attemptsStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  header: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.light
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(4)
  }
}))

const Attempts: React.FC = () => {
  const { attempts } = useQuestions()

  const classes = attemptsStyles()
  return (
    <>
      <Header />
      <Container className={classes.root} maxWidth='sm'>
        <Box className={classes.header} component='header'>
          <Typography variant='h2'>
            Last Attempts
          </Typography>
          {attempts.length === 0 && (
            <Box className={classes.empty}>
              <HighlightOff />
              <Typography variant='body1'>It's empty here</Typography>
            </Box>
          )}
          {attempts.map((attempt, idx) => (
            <Attempt key={attempt.id} idx={idx} attempt={attempt} />
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Attempts;