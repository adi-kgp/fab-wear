import React, {lazy, Suspense} from 'react';
import {GlobalStyle} from './global.styles';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const CheckOutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));


class App extends React.Component {

  unSubscribeFromAuth = null;

  componentDidMount(){  
    const {setCurrentUser} = this.props;

    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });   
        });
      } 
      setCurrentUser(userAuth);

    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<div>...Loading</div>}>
              <Route exact path = '/' component= {HomePage} />
              <Route path = '/shop' component= {ShopPage} />
              <Route exact path = '/checkout' component= {CheckOutPage} />
              <Route exact path = '/signin' 
                render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );  
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
// 
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
