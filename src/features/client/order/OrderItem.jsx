import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import {Link} from 'react-router-dom';
import listRouters from '../../../app/listRouters';
import {completeOrder, cancelOrder} from './orderSlice';

const ProductItem = props => {
    const {productId, name, currentPrice, productImage, quantity} = props;

    return (
        <div className='row product-item'>
            <div className='col-3 col-md-2 product-image'>
                <img src={productImage} alt='product' />
            </div>
            <div className='col-9 col-md-10 product-info'>
                <h3 className='name'>
                    <Link to={{pathname: `${listRouters.product}/${productId}`}}>{name}</Link>
                </h3>
                <span className='cost'>$ {currentPrice.toLocaleString()}</span>
                <span className='quantity'>x {quantity}</span>
            </div>
        </div>
    );
};

const OrderItem = props => {
    const dispatch = useDispatch();

    const isPendingCompleteOrder = useSelector(state => state.orderSlice.isPendingCompleteOrder);
    const isPendingCancelOrder = useSelector(state => state.orderSlice.isPendingCancelOrder);

    const {
        orderId,
        status,
        items,
        total,
        createdAt,
        updatedAt
    } = props;

    return (
        <div className='container order-item'>
            <div className='row order-info'>
                <div className='col-6 date row'>
                    <span className='col-md-6'><i className='far fa-calendar-plus'></i>{createdAt.split('T')[0]}</span>
                    {
                        status === 'active' ?
                            <span className={`col-md-6 ${status}`}><i className='far fa-calendar'></i>{updatedAt.split('T')[0]}</span>
                            : (
                                status === 'completed' ?
                                    <span className={`col-md-6 ${status}`}>
                                        <i className='far fa-calendar-check'></i>{updatedAt.split('T')[0]}
                                    </span>
                                    : <span className={`col-md-6 ${status}`}>
                                        <i className='far fa-calendar-times'></i>{updatedAt.split('T')[0]}
                                    </span>
                            )
                    }
                </div>
                <div className='col-3 cost'>
                    <span>$ {total}</span>
                </div>
                <div className='col-2 status'>
                    <span className={`${status}`}>{status.replace(status.charAt(0), status.charAt(0).toUpperCase())}</span>
                </div>

                <div className='col-1 text-right option'>
                    {
                        (isPendingCompleteOrder || isPendingCancelOrder) ?
                            <Loading size={30} /> :
                            <div className='btn-group'>
                                <button type='button' className='dropdown-toggle option-btn' data-toggle='dropdown'
                                    aria-haspopup='true' aria-expanded='false'>
                                </button>
                                <div className='dropdown-menu dropdown-menu-right'>
                                    <button className='dropdown-item' type='button' disabled={status !== 'active'}
                                        onClick={() => dispatch(completeOrder({orderId}))}
                                    >
                                        Complete Order
                                    </button>
                                    <button className='dropdown-item' type='button' disabled={status !== 'active'}
                                        onClick={() => dispatch(cancelOrder({orderId}))}
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            </div>

            {
                items.map((item, index) => {
                    return (
                        <ProductItem
                            key={index}
                            productId={item.productId}
                            name={item.name}
                            price={item.price}
                            salePrice={item.salePrice}
                            currentPrice={item.currentPrice}
                            productImage={item.productImage}
                            quantity={item.quantity}
                        />
                    )
                })
            }

        </div>
    );
};

export default OrderItem;