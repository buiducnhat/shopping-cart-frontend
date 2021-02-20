import React, {useEffect} from 'react';
import LoadingScreen from '../../../components/LoadingScreen';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import OrderItem from './OrderItem';
import {getOrdersOfUser} from './orderSlice';
import listRouters from '../../../app/listRouters';
import './Order.css';

const Order = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);
    const orders = useSelector(state => state.orderSlice.orders);
    const isPendinggetOrdersOfUser = useSelector(state => state.orderSlice.isPendinggetOrdersOfUser);

    useEffect(() => {
        dispatch(getOrdersOfUser());
    }, [dispatch])

    return (
        !isLoggedIn ?
            <Redirect to={{pathname: listRouters.login, state: {lastUrl: listRouters.order}}} />
            : (
                isPendinggetOrdersOfUser ? <LoadingScreen /> :
                    <div className='order-list'>
                        <div className='container'>
                            <div className='row widget-title mb-5'>
                                <div className='col'>
                                    <h2>
                                        <span>My Order</span>
                                    </h2>
                                </div>
                            </div>
                            {
                                !orders.length ? <h3>You have no order!</h3> :
                                    <div className='row order-items'>
                                        {
                                            orders.map((order, index) =>
                                                <OrderItem
                                                    key={index}
                                                    orderId={order.id}
                                                    address={order.address}
                                                    name={order.name}
                                                    phoneNumber={order.number}
                                                    status={order.status}
                                                    total={order.total}
                                                    createdAt={order.createdAt}
                                                    updatedAt={order.updatedAt}
                                                    items={order.items}
                                                />
                                            )
                                        }
                                    </div>
                            }
                        </div>
                    </div>
            )
    );
}

export default Order;