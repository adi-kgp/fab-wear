import  CartActionTypes  from "./cart.types";

const INITIAl_STATE = {
  hidden: true
};

const CartReducer = (state = INITIAl_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN :
      return  {
        ...state,
        hidden: !state.hidden
      }
    default:
      return state;
  }
}

export default CartReducer;