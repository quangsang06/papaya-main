import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type ModalProps = {
  open: boolean;
  title: string;
  content?: string | ReactNode;
  handleClose: () => void;
  handleConfirm: () => void;
};

const IndexPage = ({ open, handleClose, handleConfirm, title, content }: ModalProps): JSX.Element => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button size="small" variant="contained" color="error" onClick={handleClose}>
          Hủy
        </Button>
        <Button size="small" variant="contained" onClick={handleConfirm}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IndexPage;
