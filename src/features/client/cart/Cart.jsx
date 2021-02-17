import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCart, saveCart} from './cartSlice';
import CartItem from './CartItem';
import './Cart.css';
import LoadingScreen from '../../../components/LoadingScreen';
import Loading from '../../../components/Loading';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartSlice.items);
    const isPendingGetCart = useSelector(state => state.cartSlice.isPendingGetCart);
    const isPendingSaveCart = useSelector(state => state.cartSlice.isPendingSaveCart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <div className="cart">
            <div className="container">
                <div className="row widget-title mb-5">
                    <div className="col">
                        <h2>
                            <span>My Cart</span>
                        </h2>
                    </div>
                    <div className="cart-save">
                        <button onClick={() => dispatch(saveCart({newItems: cartItems}))}>
                            {
                                isPendingSaveCart ? <Loading size={30}/>
                                    : (<>
                                        <i className="far fa-save"></i>
                                        Save
                                    </>)
                            }
                        </button>
                    </div>
                </div>
                {
                    (isPendingGetCart && cartItems.length) ? <LoadingScreen /> :
                        (cartItems.length && !isPendingGetCart) ?
                            cartItems.map((cartItem, index) =>
                                <CartItem
                                    key={index}
                                    productId={cartItem.productId}
                                    description={cartItem.description}
                                    productImage={cartItem.productImage}
                                    name={cartItem.name}
                                    price={cartItem.price}
                                    salePrice={cartItem.salePrice}
                                    quantity={cartItem.quantity}
                                />
                            )
                            :
                            <div className="no-item ml-3">
                                <h4>Your cart is empty!</h4>
                            </div>
                }
            </div>
        </div>
    )
}

export default Cart;