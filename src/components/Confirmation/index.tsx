import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom'

import { useQuestions, QuestionsReducerType } from '../../hooks/questions'

type Props = {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmation: boolean;
  questionsQuantity: number;
}

const Confirmation: React.FC<Props> = (props) => {
  const { dispatch } = useQuestions()
  const history = useHistory()

  const handleClose = () => {
    props.setShowConfirmation(false);
  };

  const handleStart = () => {
    dispatch({ type: QuestionsReducerType.START_QUESTIONARY, quantity: props.questionsQuantity })
    history.push('/questionary')
  }

  return (
    <div>
      <Dialog
        open={props.showConfirmation}
        onClose={handleClose}
        aria-labelledby='questionary-confirmation'
      >
        <DialogTitle id='questionary-confirmation'>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be redirected to the questionary to answer {props.questionsQuantity} questions
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleStart} color='primary'>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Confirmation