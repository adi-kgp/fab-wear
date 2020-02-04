import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import {addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({item, addItemToCollection}) => {
  const {name, price, imageUrl} = item;
  return (
  <div className='collection-item'>
    <div 
      className='image'
      style = {{
        backgroundImage: `url(${imageUrl})`
      }} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>₹{price}</span>
      </div>
    <CustomButton onClick = {() => addItemToCollection(item)} inverted>Add to Cart</CustomButton>
  </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addItemToCollection: item => dispatch(addItem(item))
})


export default connect(null, mapDispatchToProps)(CollectionItem);