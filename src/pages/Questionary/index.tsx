import { useState } from 'react'
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
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavigateNextOutlined from '@material-ui/icons/NavigateNextOutlined'

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
    marginTop: theme.spacing(2),
    width: '100%'
  }
}))

const Questionary: React.FC = () => {
  const [answer, setAnswer] = useState<string | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value)
  }

  const classes = questionaryStyles()
  return (
    <Container maxWidth='md' className={classes.root}>
      <Box className={classes.header} component='header'>
        <Typography variant='h2'>
          Questionary
        </Typography>
        <Chip label='Question 1 of 30' variant='outlined' size='small' disabled />
      </Box>
      <Paper elevation={0} variant='outlined' className={classes.question}>
        <Typography variant='body1' component='p'>What goes inside normal humans head?</Typography>
        <FormControl component='fieldset' className={classes.form}>
          <RadioGroup aria-label='Answer' value={answer} onChange={handleChange}>
            <FormControlLabel value='Answer A' control={<Radio />} label='Answer A' />
            <FormControlLabel value='Answer B' control={<Radio />} label='Answer B' />
            <FormControlLabel value='Answer C' control={<Radio />} label='Answer C' />
            <FormControlLabel value='Answer D' control={<Radio />} label='Answer D' />
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
  );
}

export default Questionary;