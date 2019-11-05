import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomButton from '../util/customButton';
import PostScream from '../components/PostScream';
//MUI stuff

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <ToolBar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostScream />
              <Link to="/">
                <CustomButton tip="home">
                  <HomeIcon color="secondary" />
                </CustomButton>
              </Link>
              <Link to="/">
                <CustomButton tip="notifications">
                  <Notifications color="secondary" />
                </CustomButton>
              </Link>
            </Fragment>
          ) : (
              <Fragment>
                <Button component={Link} to="/login" color="inherit">Login</Button>
                <Button component={Link} to="/" color="inherit">Home</Button>
                <Button component={Link} to="/signup" color="inherit">Sign up</Button>
              </Fragment>
            )}

        </ToolBar>
      </AppBar>
    )
  }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
