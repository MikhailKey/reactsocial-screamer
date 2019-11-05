import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomButton from '../util/customButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//icons
import ChatIcon from '@material-ui/icons/Chat';

//redux
import { connect } from 'react-redux';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    width: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

const Scream = (props) => {
  
  
  dayjs.extend(relativeTime);
  const {
    classes,
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount
    },
    user: {
      authenticated,
      credentials: { handle }
    }
  } = props;
  let likes = '';
  if (likeCount === 1 || likeCount.toString().split('').pop() === 1) {
    likes = 'like';
  } else {
    likes = 'likes'
  }
  
  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId} />
  ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId}/>
        <span>{likeCount} {likes}</span>
        <CustomButton tip="comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  )
}
const mapStateToProps = (state) => ({
  user: state.user,
})
Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Scream))
