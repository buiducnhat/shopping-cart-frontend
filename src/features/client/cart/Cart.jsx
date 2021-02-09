import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getItemsInCart} from './cartSlice';
import CartItem from './CartItem';
import Loading from '../../../components/Loading';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartSlice.items);
    const isPendingGetItemsInCart = useSelector(state => state.cartSlice.isPendingGetItemsInCart);

    useEffect(() => {
        dispatch(getItemsInCart());
    }, [])

    return (
        <div className="cart">
            <div className="container">
                <div className="row widget-title mb-5">
                    <div className="col">
                        <h3>
                            <span>My Cart</span>
                        </h3>
                    </div>
                    <div className="cart-save">
                        <button>
                            <i className="far fa-save"></i>
                            Save
                        </button>
                    </div>
                </div>
                {
                    cartItems.length && !isPendingGetItemsInCart &&
                    cartItems.map((cartItem, index) =>
                        <CartItem
                            key={index}
                            productId={cartItem.productId}
                            productImage={cartItem.productImage}
                            name={cartItem.name}
                            price={cartItem.price}
                            salePrice={cartItem.salePrice}
                            quantity={cartItem.quantity}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Cart;