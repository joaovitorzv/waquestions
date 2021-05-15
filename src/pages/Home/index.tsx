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
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      marginTop: theme.spacing(4),
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
  const classes = homeStyles()
  return (
    <Container maxWidth='md' className={classes.root}>
      <Box component='header' className={classes.header}>
        <Typography variant='h1' component='h1' className={classes.title}>WaQuestions</Typography>
      </Box>

      <Paper variant='outlined' className={classes.questionsQuantityContainer}>
        <Typography variant='h4' component='h2'>How many questions are you up to?</Typography>
        <TextField label='Quantity' type='number' />
        <Button variant='contained' color='primary'>
          Start
        </Button>
      </Paper>
      <Box className={classes.lastAttempts}>
        <Typography variant='h3'>Last attempts</Typography>
      </Box>
      <ResultTable />
    </Container>
  );
}

export default Home;