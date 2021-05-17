import {
  Container,
  Box,
  Typography,
  Paper,
  Chip,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useQuestions } from '../../hooks/questions'

import Header from '../../components/Header'
import AttemptType from '../../components/Attempt'

const attemptsStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  header: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.light
  }
}))

const Attempts: React.FC = () => {
  const { attempts } = useQuestions()

  const classes = attemptsStyles()
  return (
    <>
      <Header />
      <Container className={classes.root}>
        <Box className={classes.header} component='header'>
          <Typography variant='h2'>
            Last Attempts
          </Typography>
          {attempts.map((attempt, idx) => (
            <AttemptType key={attempt.id} idx={idx} attempt={attempt} />
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Attempts;