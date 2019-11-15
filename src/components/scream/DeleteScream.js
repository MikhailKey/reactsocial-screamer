import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../../util/customButton';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { deleteScream } from '../../redux/actions/dataActions';

//mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const styles =  {
  deleteButton: {
    position: 'absolute',
    bottom: '15%',
    left: '90%'
  }
}
function DeleteScream(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
  };
  const deleteScream = () => {
    props.deleteScream(props.screamId); 
    setOpen(false)
  }
  const { classes } = props;
    return (
      <Fragment>
        <CustomButton tip="delete scream" onClick={() => handleOpen()} btnClassName={classes.deleteButton}>
          <DeleteOutline color="secondary"/>
        </CustomButton>
        <Dialog open={open} 
                onClose={() => handleClose()}
                fullWidth
                maxWidth = 'sm'>
                  <DialogTitle>
                    Are you sure you want to delete this scream?
                  </DialogTitle>
                  <DialogActions>
                    <Button color="primary"
                            onClick={() => handleClose()}>
                              Cancel
                            </Button>
                    <Button color="secondary"
                            onClick={() => deleteScream()}>
                              Delete
                            </Button>
                  </DialogActions>
                </Dialog>
      </Fragment>
    )
  }
DeleteScream.propTypes = {
  deleteScream: propTypes.func.isRequired,
  classes: propTypes.object.isRequired,
  screamId: propTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
