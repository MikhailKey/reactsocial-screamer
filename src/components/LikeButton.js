import React from 'react'
import CustomButton from '../util/customButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//MUI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
  

const LikeButton = (props) => {

	const likedScream = () => {
    if (props.user.likes && props.user.likes.find(like => like.screamId === props.screamId)) {
      return true;
    } else return false;
	};
	
	const likeScream = () => {
    props.likeScream(props.screamId);
  }
  const unlikeScream = () => {
    props.unlikeScream(props.screamId);
	}
	const {user: {authenticated}} = props;

	const likeButton = !authenticated ? (
		<CustomButton tip="Like">
			<Link to="/login">
				<FavoriteBorder color="primary" />
			</Link>
		</CustomButton>
	) : (
			likedScream() ? (
				<CustomButton tip="Undo like" onClick={unlikeScream}>
					<FavoriteIcon color="primary" />
				</CustomButton>
			) : (
					<CustomButton tip="Like" onClick={likeScream}>
						<FavoriteBorder color="primary" />
					</CustomButton>
				)
		);
	return likeButton;
}
LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {
  likeScream,
  unlikeScream
}
export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
