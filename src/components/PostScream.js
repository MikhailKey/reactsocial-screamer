import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../util/customButton';
//redux
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';
//mui
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  ...theme.forms,
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '3%'
  }
})
const PostScream = (props) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(props.UI.errors);
  }, [props.UI.errors, props.UI]);

  useEffect(() => {
    setBody('');
    handleClose();
    console.log(props.UI.loading)
  }, [props.UI.loading]);

  useEffect(() => {
    console.log(props)
  }, [props])

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({
  //       errors: nextProps.UI.errors
  //     })
  //   }
  //   if (!nextProps.UI.errors && !nextProps.UI.loading) {
  //     this.setState({body: ''});
  //     this.handleClose()
  //   }
  // }
  const handleOpen = () => { 
    setOpen(true);
  }
  const handleClose = () => { 
    setOpen(false);
    setErrors({});
  }
  const handleChange = (e) => {
    setBody(e.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    props.postScream({body});
  }
  const { classes, UI: { loading } } = props;
  return (
    <Fragment>
      <CustomButton onClick={handleOpen} tip="Create a scream!">
        <AddIcon color="secondary" />
      </CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
          <CustomButton tip="close" onClick={handleClose} tipClassName={classes.closeButton}>
            <CloseIcon/>
          </CustomButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
            <TextField 
              name="body" 
              type="text" 
              label="Please, write your scream" 
              rows="3"
              placeholder="Scream at your fellow friends"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}  
              onChange={handleChange}
              fullWidth/>
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
              Submit
              {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
            </Button>
            </form>
          </DialogContent>
      </Dialog>
    </Fragment>
  )
}
PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream))
