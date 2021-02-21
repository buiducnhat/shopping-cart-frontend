import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getCart, saveCart} from './cartSlice';
import CartItem from './CartItem';
import listRouters from '../../../app/listRouters';
import './Cart.css';
import LoadingScreen from '../../../components/LoadingScreen';
import Loading from '../../../components/Loading';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartSlice.items);
    const cartTotal = useSelector(state => state.cartSlice.total);
    const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);
    const isPendingGetCart = useSelector(state => state.cartSlice.isPendingGetCart);
    const isPendingSaveCart = useSelector(state => state.cartSlice.isPendingSaveCart);

    useEffect(() => {
        isLoggedIn && dispatch(getCart());
    }, [isLoggedIn, dispatch]);

    return !isLoggedIn ?
        <Redirect to={{pathname: listRouters.login, state: {lastUrl: listRouters.cart}}} />
        : (
            isPendingGetCart ? <LoadingScreen /> :
                <div className='cart'>
                    <div className='container'>
                        <div className='row widget-title mb-5'>
                            <div className='col'>
                                <h2>
                                    <span>My Cart</span>
                                </h2>
                            </div>
                            <div className='cart-save'>
                                <button onClick={() => dispatch(saveCart({newItems: cartItems}))}>
                                    {
                                        isPendingSaveCart ? <Loading size={30} />
                                            : (
                                                <React.Fragment><i className='far fa-save'></i>Save</ React.Fragment>
                                            )
                                    }
                                </button>
                            </div>
                        </div>
                        {
                            cartItems.length ?
                                <React.Fragment>
                                    <div className='row cart-items'>
                                        {
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
                                        }
                                    </div>
                                    <div className="row cart-checkout">
                                        <span>Total: <span>${cartTotal}</span></span>
                                        <button>
                                            <Link to={{pathname: listRouters.checkout}}>Checkout</Link>
                                        </button>
                                    </div>
                                </React.Fragment>
                                :
                                <div className='no-item ml-3'>
                                    <h4>Your cart is empty!</h4>
                                </div>
                        }
                    </div>
                </div>
        )
}

export default Cart;