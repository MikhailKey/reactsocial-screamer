import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/login.png';
import {Link} from 'react-router-dom';

//Mui stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.forms
})

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        // this.setState({
        //     loading: true,
        // });
        const newUserData= {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        };
        this.props.signupUser(newUserData, this.props.history);
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img className={classes.icon} src={AppIcon} alt="Register icon"/>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            className={classes.textField}
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            value={this.state.email}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                            />
                        <TextField 
                            className={classes.textField}
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                            />
                        <TextField 
                            className={classes.textField}
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm password" 
                            value={this.state.confirmPassword}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={this.handleChange}
                            fullWidth
                            />
                        <TextField 
                            className={classes.textField}
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Handle" 
                            value={this.state.handle}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            onChange={this.handleChange}
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
                        >Sign up
                        {loading && (
                            <CircularProgress color="secondary" size={30} className={classes.progress}/> 
                        )}</Button>
                        <br/>
                        <small className={classes.small}>Already have an account? <Link className={classes.link} to='/login'>Login!</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup))
