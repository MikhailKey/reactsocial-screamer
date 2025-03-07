import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//Pages 
import themeStyle from './util/theme'
import { Home, Login, Signup, User} from './pages';
import jwtDecode from 'jwt-decode';
//Redux
import { Provider} from 'react-redux';
import store from './redux/store';  
import { SET_AUTHENTICATED } from './redux/types'; 
import { logoutUser, getUserData } from './redux/actions/userActions';

//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute'
import axios from 'axios';
const theme = createMuiTheme(themeStyle);

axios.defaults.baseURL = "https://us-central1-mikhail95-react-social.cloudfunctions.net/api";
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme = {theme}>
        <Provider store={store}>
          <Router>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home}/>
                <AuthRoute 
                  exact
                  path='/login' 
                  component={Login} 
                  />
                <AuthRoute 
                  exact
                  path='/signup' 
                  component={Signup} 
                />
                <Route exact path='/users/:handle' component={User}/>
                <Route exact path="/users/:handle/scream/:screamId" component={User}/>
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
