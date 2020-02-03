import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  state = {
    loading: true
  };

  unSubscribeFromSnapshot = null;

  componentDidMount(){
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');

    // fetch('https://firestore.googleapis.com/v1/projects/fab-wear/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections));

    collectionRef.get().then(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false});
    });
  }

  render (){
    const {loading} = this.state;
    const {match} = this.props;
    return(
      <div className='shop-page'>
        <Route exact path = {`${match.path}`} 
          render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
        <Route path = {`${match.path}/:collectionId`} 
          render={(props) => <CollectionPageWithSpinner isLoading={loading}{...props} />} />
      </div>
    );
  }
} 

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);