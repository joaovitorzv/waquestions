import { useState } from 'react'
import {
  Typography,
  Container,
  Box,
  Paper,
  TextField,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ResultTable from '../../components/ResultTable'
import Header from '../../components/Header'
import Confirmation from '../../components/Confirmation'

const homeStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    color: theme.palette.primary.main
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  questionsQuantityContainer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    '& h2': {
      fontWeight: theme.typography.fontWeightBold
    },
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      width: '100%'
    },
    '& .MuiButton-root': {
      width: '100%'
    }
  },
  lastAttempts: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  }
}))

const Home: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);


  const classes = homeStyles()
  return (
    <>
      <Header />
      <Container maxWidth='md' className={classes.root}>
        <Paper variant='outlined' className={classes.questionsQuantityContainer}>
          <Typography variant='body1' component='h2'>How many questions are you up to?</Typography>
          <TextField label='Quantity' type='number' />
          <Button
            variant='contained'
            color='primary'
            onClick={() => setShowConfirmation(!showConfirmation)}
          >
            Start
        </Button>
          <Confirmation
            questionsQuantity={30}
            setShowConfirmation={setShowConfirmation}
            showConfirmation={showConfirmation}
          />
        </Paper>
        <Box className={classes.lastAttempts}>
          <Typography variant='h4'>Last attempts</Typography>
        </Box>
        <ResultTable />
      </Container>
    </>
  );
}

export default Home;