import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import ScreamSkeleton from '../util/ScreamSkeleton';

const Home = (props) => {
  useEffect(() => {
    props.getScreams()
  }, [])
  const { screams, loading } = props.data;

  let recentScreamsMarkup = !loading ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : <ScreamSkeleton />
  return (
    <Grid container spacing={3}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  )
}
Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, { getScreams })(Home)
