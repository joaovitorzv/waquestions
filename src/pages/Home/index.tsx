import { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  Box,
  Paper,
  TextField,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import * as yup from 'yup'

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

const validationSchema = yup.object().shape({
  quantity: yup
    .number()
    .min(1, 'The minimum is one question')
    .max(100, 'The maximum is a hundred')
    .required('Quantity of questions required')
})

const Home: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formik = useFormik({
    initialValues: { quantity: 1 },
    validationSchema: validationSchema,
    onSubmit: () => {
      setShowConfirmation(!showConfirmation)
    }
  })

  const classes = homeStyles()
  return (
    <>
      <Header />
      <Container maxWidth='sm' className={classes.root}>
        <Paper variant='outlined' className={classes.questionsQuantityContainer}>
          <Typography variant='body1' component='h2'>How many questions are you up to?</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label='Quantity'
              type='number'
              id='quantity'
              name='quantity'
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
            >
              Start
            </Button>
            <Confirmation
              questionsQuantity={formik.values.quantity}
              setShowConfirmation={setShowConfirmation}
              showConfirmation={showConfirmation}
            />
          </form>
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