import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/customButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm'; 

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';


//redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.comments
})
const ScreamDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  const [newPath, setNewPath] = useState('');


  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const {userHandle, screamId} = props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    if (oldPath.indexOf(screamId) > -1 && newPath.indexOf(screamId) > -1) {
      oldPath = `/users/${userHandle}`;
    } 
    window.history.pushState(null, null, newPath);
    setOpen(true);
    setOldPath(oldPath);
    setNewPath(newPath);
    props.getScream(props.screamId)
  }
  useEffect(() => {
    if (props.openDialog) {
      handleOpen()
    }
  }, [])
  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    props.clearErrors();
  }

  const { classes, scream: {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments
  }, UI: {
    loading
  }
  } = props;

  let likes = '';
  if (likeCount) {
    if (likeCount === 1 || likeCount.toString().split('').pop() === 1) {
      likes = 'like';
    } else {
      likes = 'likes'
    }
  }
  
  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} thickness={2} />
    </div>
  ) : (
      <Grid container spacing={5}>
        <Grid item >
          <img src={userImage} alt="Profile" className={classes.ProfileImage} />
        </Grid>
        <Grid item>
          <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
            {userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h: mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">
            {body}
          </Typography>
          <LikeButton screamId={screamId}/> 
          <span>{likeCount} {likes}</span>
        <CustomButton tip="comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator}/>
        <CommentForm screamId={screamId}/>
        <Comments comments={comments}/>
      </Grid>
    )
  return (
    <Fragment>
      <CustomButton onClick={handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
        <UnfoldMore color="secondary" />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <CustomButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </CustomButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
})

const mapActionsToProps = {
  getScream,
  clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))