import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';


type Props = {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmation: boolean;
  questionsQuantity: number;
}

const Confirmation: React.FC<Props> = (props) => {
  const handleClose = () => {
    props.setShowConfirmation(false);
  };

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
          <Button onClick={handleClose} color='primary'>
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Confirmation