import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
    minWidth: 300
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({
  children, open, modalTitle, noBottomButton,
  setOpen, outBoxClose, body, addCloseIcon,
  styles
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      style={styles}
      scroll={body ? 'body' : 'paper'}
      onClose={outBoxClose && handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={addCloseIcon && handleClose}
      >
        {modalTitle}
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {!noBottomButton && (
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
