import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import listRouters from '../../../app/listRouters';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../cart/cartSlice';
import Loading from '../../../components/Loading';
import './Product.css'

const Product = props => {
    const {id, name, price, salePrice, productImage} = props;
    const dispatch = useDispatch();
    const isPendingAddToCart = useSelector(state => state.cartSlice.isPendingAddToCart);
    const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);

    return (
        <div className='product'>
            <div className='product-image'>
                <img src={productImage} alt='' />
            </div>
            <div className='product-info'>
                <h4 className='product-title'>
                    <Link to={{pathname: `${listRouters.product}/${id}`}}>
                        {name}
                    </Link>
                </h4>
                <div className='product-price-area'>
                    {
                        salePrice ?
                            (
                                <React.Fragment>
                                    <div className='price orignal-price line-through'>
                                        <span>{`$ ${price.toLocaleString()}`}</span>
                                    </div>
                                    <div className='price sale-price'>
                                        <span>{`$ ${salePrice.toLocaleString()}`}</span>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <div className='price orignal-price'>
                                    <span>{`$ ${price.toLocaleString()}`}</span>
                                </div>
                            )
                    }
                </div>
            </div>
            <div className='product-cart'>
                <button className='product-cart-button'
                    onClick={
                        () => {
                            isLoggedIn ? dispatch(addToCart({productId: id, quantity: 1})) :
                                <Redirect to={{pathname: listRouters.login}} />
                        }
                    }
                >
                    {
                        isPendingAddToCart ? <Loading size={30} /> :
                            (<React.Fragment>
                                <i className='fas fa-shopping-cart'></i>
                                <span>Add to Cart</span>
                            </ React.Fragment>)
                    }
                </button>
            </div>
        </div>
    )
}

export default Product;