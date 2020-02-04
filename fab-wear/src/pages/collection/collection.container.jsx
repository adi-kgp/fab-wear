import CollectionPage from './collection.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selector';
import {compose} from 'redux';

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;