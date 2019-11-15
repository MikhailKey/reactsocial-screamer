import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/customButton';
//redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

//mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  button: {
    float: 'right'
  },
  textField: {
    margin: '5px auto 5px auto'
  },
}
const EditDetails = (props) => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false)

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : '');
    setWebsite(credentials.website ? credentials.website : '');
    setLocation(credentials.location ? credentials.location : ''); 
  }
  useEffect(() => {
    const { credentials } = props;
    mapUserDetailsToState(credentials);
  }, [props]); 

  const handleOpen = () => {
    setOpen(true)
    mapUserDetailsToState(props.credentials);

  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChangeBio = (event) => {
    setBio(event.target.value);
  }
  const handleChangeWebsite = (event) => {
    setWebsite(event.target.value);
  }
  const handleChangeLocation = (event) => {
    setLocation(event.target.value); 
  }
  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    props.editUserDetails(userDetails);
    handleClose();
  }
  const { classes } = props;
  return (
    <Fragment>
      <CustomButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}>
        <EditIcon color="secondary" />
      </CustomButton>
      <Dialog open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
        <DialogTitle>Edit Your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField name="bio"
              type="text"
              label="Bio"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleChangeBio}
              fullWidth
            />
            <TextField name="website"
              type="text"
              label="Website"
              placeholder="Your personal website"
              className={classes.textField}
              value={website}
              onChange={handleChangeWebsite}
              fullWidth
            />
            <TextField name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={handleChangeLocation}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
                          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
                          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
})

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
