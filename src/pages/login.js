import React, { useEffect, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/login.png';
import { Link } from 'react-router-dom';

//Mui stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.forms
})

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors)
    }
  }, [props.UI.errors])

  const handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email,
      password
    }
    props.loginUser(userData, props.history);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const { classes, UI: { loading } } = props;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img className={classes.icon} src={AppIcon} alt="Register icon" />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
                    </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            helperText={errors.email}
            error={errors.email ? true : false}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            helperText={errors.password}
            error={errors.password ? true : false}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.button}
            disabled={loading}
          >Login
                        {loading && (
              <CircularProgress color="secondary" size={30} className={classes.progress} />
            )}</Button>
          <br />
          <small className={classes.small}>Don't have an account? <Link className={classes.link} to='/signup'>Sign up!</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})
const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
