import {
  Container,
  Box,
  Typography,
  Paper,
  Chip,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Header from '../../components/Header'
import Attempt from '../../components/Attempt'

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
  const classes = attemptsStyles()
  return (
    <>
      <Header />
      <Container className={classes.root}>
        <Box className={classes.header} component='header'>
          <Typography variant='h2'>
            Last Attempts
          </Typography>
          <Attempt />
          <Attempt />
          <Attempt />
          <Attempt />
          <Attempt />
        </Box>
      </Container>
    </>
  );
}

export default Attempts;