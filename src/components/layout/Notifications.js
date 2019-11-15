import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import CustomButton from '../../util/customButton';

//MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';


const Notifications = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = props.notifications;

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length > 0 
    ? notificationsIcon = (
      <Badge badgeContent={notifications.filter(not => not.read === false).length}
        color="secondary">
        <NotificationsIcon color="secondary" />
      </Badge>
    ) : (
      notificationsIcon = <NotificationsIcon/>
    )
  } else {
    notificationsIcon = <NotificationsIcon/>
  }
  return (
     <Fragment>
       <ToolTip placement="top" title="Notifications">
         <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
         aria-haspopup="true"
         onClick={handleOpen}>
           {notificationsIcon}
         </IconButton>
       </ToolTip>
       <Menu 
       anchorEl={anchorEl}
       open={Boolean(anchorEl)}
       onClose={handleClose}
       onEntered={onMenuOpened}>
         {notificationsMarkup}
       </Menu>
     </Fragment>
  )
}
const mapStateToProps = state => ({
  notifications: state.user.notifications
})

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);