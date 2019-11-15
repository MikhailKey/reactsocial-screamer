import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';
import {submitComment} from '../../redux/actions/dataActions'; 
//MUI 
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
	...theme.forms,
	...theme.comments
})
const CommentForm = (props) => {
	const [body, setBody] = useState('');
	const [errors, setErrors] =  useState({});


	useEffect(() => {
		if (props.UI.errors) {
			setErrors(props.UI.errors);
		}
		if (!props.UI.errors && !props.UI.commentloading) {
			setBody('');
		}
	}, [props.UI.errors, props.UI.commentloading]);
	
	const handleChange = (e) => {
		setBody(e.target.value);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		props.submitComment(props.screamId, {body});
	}
	const { classes, authenticated, UI: {commentloading} } = props; 
	const commentFormMarkup = authenticated ? (
		<Grid item sm={12} style={{textAlign: 'center'}}>
			<form onSubmit={handleSubmit}>
				<TextField 
				name="body" 
				type="text" 
				label="Comment on scream" 
				error={errors.comment ? true : false} 
				helperText={errors.comment}
				value={body}
				onChange={handleChange}
				fullWidth
				className={classes.textField}/>
				<Button 
				type="submit" 
				variant="contained" 
        color="primary" 
        disabled={commentloading}
        className={classes.button}
				>Submit
        {commentloading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
        </Button>
			</form>
			<hr className={classes.visibleSeparator}/>
		</Grid>
	) : null;

	return commentFormMarkup;
}
CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	authenticated: state.user.authenticated
})
export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))
