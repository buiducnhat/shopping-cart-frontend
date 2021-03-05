import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDetailProduct} from './productSlice';
import {addToCart} from '../cart/cartSlice';
import Loading from '../../../components/Loading/Loading';
import LoadingScreen from '../../../components/Loading/LoadingScreen';
import listRouters from '../../../app/listRouters';
import './ProductDetail.css';

const ProductDetail = props => {
    const dispatch = useDispatch();

    const {productId} = props.match.params;
    const [quantity, setQuantity] = useState(1);
    const isPendingFetchDetailProduct = useSelector(state => state.productSlice.isPendingFetchDetailProduct);
    const currentProduct = useSelector(state => state.productSlice.currentProduct);
    const isPendingAddToCart = useSelector(state => state.cartSlice.isPendingAddToCart);

    const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);

    const {name, productImage, description, orignalPrice, salePrice, currentPrice} = currentProduct;

    useEffect(() => {
        dispatch(fetchDetailProduct({productId}));
    }, [dispatch, productId]);

    useEffect(() => {
        (quantity <= 0 || isNaN(quantity)) && setQuantity(1);
    }, [quantity]);

    return (
        isPendingFetchDetailProduct ? <LoadingScreen /> :
            <section className='product-detail'>
                <div className='container'>
                    <div className='row'>
                        <div className='widget-title'>
                            <div className='col'>
                                <h2>
                                    <span>Product Detail</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6 product-detail-image'>
                            <img src={productImage} alt='product-detail' />
                        </div>
                        <div className='col-sm-6 product-detail-info'>

                            <div className='product-detail-name'>
                                <h3>{name}</h3>
                            </div>

                            <div className='product-detail-description'>
                                <p>{description}</p>
                            </div>

                            <div className='product-detail-price'>
                                {
                                    salePrice ?
                                        <React.Fragment>
                                            <span className='old-price'>{`$ ${orignalPrice}`}</span>
                                            <span className='sale-price'>{`$ ${salePrice}`}</span>
                                        </React.Fragment>
                                        : <span className='orignal-price'>{`$ ${currentPrice}`}</span>
                                }
                            </div>

                            <div className='product-detail-quantity'>
                                <button onClick={() => setQuantity(quantity - 1)}>
                                    <i className='fas fa-minus'></i>
                                </button>
                                <input type='text' value={quantity} onChange={e => setQuantity(Number.parseInt(e.target.value))} />
                                <button onClick={() => {setQuantity(quantity + 1)}}>
                                    <i className='fas fa-plus'></i>
                                </button>
                            </div>

                            <div className='product-detail-cart'>
                                <button onClick={() => {
                                    isLoggedIn ? dispatch(addToCart({productId, quantity})) :
                                        <Redirect to={{pathname: listRouters.login}} />
                                }}>
                                    {
                                        isPendingAddToCart ?
                                            <Loading size={30} /> :
                                            <React.Fragment>
                                                <i className='fas fa-cart-plus'></i>
                                                <span>Add to cart</span>
                                            </React.Fragment>
                                    }
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
    );
}

export default ProductDetail;