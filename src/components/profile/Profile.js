import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import CustomButton from '../../util/customButton';

//Mui stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import  Typography  from '@material-ui/core/Typography';

//Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

//Iсons
import LocationOn from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import ProfileSkeleton from '../../util/ProfileSkeleton';

const styles = (theme) => ({
    paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: theme.palette.primary.main
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
})

const Profile = props => {
  const handleImageChange = (event) => {
    const image= event.target.files[0];   
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.uploadImage(formData);
  }

  const  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  const handleLogout = () => {
    props.logoutUser();
  }

  const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, 
  loading,
  authenticated   
  } 
  } = props;

  let profileMarkup = !loading ? (authenticated ? (
    <Paper className={classes.paper}>
        <div className={classes.profile}>
            <div className="image-wrapper">
                <img className="profile-image" src={imageUrl} alt="profile"/>
                <input  type="file" id="imageInput" 
                        onChange={handleImageChange}
                        hidden="hidden"
                        /> 
                <CustomButton 
                    tip="Edit profile picture" 
                    onClick={handleEditPicture} 
                    btnClassName="button">
                      <EditIcon color="secondary"/>
                </CustomButton>
            </div>
            <hr/>
            <div className="profile-details">
                <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant="h5">
                    {handle}
                </MuiLink>
                <hr/>
                {bio && <Typography variant="body2">{bio}</Typography>}
                <hr/>
                {location && (
                    <Fragment>
                        <LocationOn color="secondary"/><span>{location}</span>
                        <hr/>
                    </Fragment>
                )}
                {website && (
                    <Fragment>
                        <LinkIcon color="secondary"/>
                        <a href={`${website}`} target="_blank" rel="noopener noreferrer">
                            {' '}{website}
                        </a>
                        <br/>
                    </Fragment>
                )}
                <CalendarToday color="secondary"/>{' '}
                <span>Joined {dayjs(createdAt).format('MMM  YYYY')}</span>
            </div>
            <CustomButton 
                tip="Logout" 
                onClick={handleLogout}>
                  <KeyboardReturn color="secondary"/>
            </CustomButton>
            <EditDetails/>
        </div>
    </Paper>
) : (
    <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
            Hmm, seems like you didn't authorized
        </Typography>
        <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">
                Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">
                Sign up
            </Button>
        </div>
    </Paper>
)) : (<ProfileSkeleton/>)

return profileMarkup;

}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {logoutUser, uploadImage}
Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
