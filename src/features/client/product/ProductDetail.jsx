import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDetailProduct} from './productSlice';
import {addToCart} from '../cart/cartSlice';
import Loading from '../../../components/Loading';
import LoadingScreen from '../../../components/LoadingScreen';
import './ProductDetail.css';

const ProductDetail = props => {
    const dispatch = useDispatch();

    const {productId} = props.match.params;
    const [quantity, setQuantity] = useState(1);
    const isPendingFetchDetailProduct = useSelector(state => state.productSlice.isPendingFetchDetailProduct);
    const currentProduct = useSelector(state => state.productSlice.currentProduct);
    const isPendingAddToCart = useSelector(state => state.cartSlice.isPendingAddToCart);

    const {name, productImage, description, price, salePrice} = currentProduct;

    useEffect(() => {
        dispatch(fetchDetailProduct({productId}));
    }, [dispatch, productId]);

    useEffect(() => {
        (quantity <= 0 || isNaN(quantity)) && setQuantity(1);
    }, [quantity]);

    return (
        isPendingFetchDetailProduct ? <LoadingScreen /> :
            <div className='product-detail'>
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
                    <div className='row row-main'>
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
                                <span className='orignal-price'>{`$ ${price}`}</span>
                                <span className='sale-price'>{`$ ${salePrice}`}</span>
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
                                    dispatch(addToCart({productId, quantity}))
                                }}>
                                    {
                                        isPendingAddToCart ?
                                            <Loading size={30}/> :
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
            </div>
    );
}

export default ProductDetail;