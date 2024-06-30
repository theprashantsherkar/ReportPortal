import SubjectCard from '../components/SubjectCard'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

function Temp() {

    const [open, setOpen] = React.useState(false);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
      <>
          <div className='h-96 w-full bg-slate-800 d-flex align-items-center justify-content-center'>
              <Button variant="outlined" onClick={handleClickOpen}>
                  Slide in alert dialog
              </Button>
              <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
              >
                  <DialogTitle>{"Subjects"}</DialogTitle>
                  <DialogContent>
                      <SubjectCard />
                  </DialogContent>

              </Dialog>

      </div>
      </>
  )
}

export default Temp

//jabjv



