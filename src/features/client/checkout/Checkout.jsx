import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder} from '../order/orderSlice';
import {clearCart} from '../cart/cartSlice';
import Loading from '../../../components/Loading';
import SuccessCpn from '../../../components/SuccessCpn';
import './Checkout.css';

const Checkout = props => {
    const dispatch = useDispatch();

    const isPendingCreateOrder = useSelector(state => state.orderSlice.isPendingCreateOrder);

    const cartItems = useSelector(state => state.cartSlice.items);
    const totalCartCost = useSelector(state => state.cartSlice.total);

    const [nameInput, setNameInput] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [orderSuccessfully, setOrderSuccessfully] = useState(false);

    if (orderSuccessfully) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center mt-5">
                        <SuccessCpn title='Successfully' content='Your order is created!' />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className='checkout-list'>
            <div className='container'>
                <div className='row widget-title mb-5'>
                    <div className='col'>
                        <h2>
                            <span>Checkout</span>
                        </h2>
                    </div>
                </div>

                {
                    !cartItems.length ? <h3>Your cart is empty!</h3> :
                        <div className='row flex-row-reverse'>
                            <div className='col-md-7 checkout-items'>
                                {
                                    cartItems.map(cartItem =>
                                        <div className='row checkout-item'>
                                            <div className='col-4 product-image'>
                                                <img src={cartItem.productImage} alt='product' />
                                            </div>
                                            <div className='col-8 product-detail'>
                                                <div className='product-name'>
                                                    <h3>{cartItem.name}</h3>
                                                </div>
                                                <div className='price'>
                                                    <span>$ {cartItem.salePrice}</span>
                                                </div>
                                                <div className='quantity'>
                                                    <span>Quantity: {cartItem.quantity}</span>
                                                </div>
                                                <div className='cost'>
                                                    <span>$ {cartItem.salePrice * cartItem.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div className='col-md-5 checkout-info'>
                                <div className='checkout-info-form'>
                                    <div className='checkout-info-input'>
                                        <label htmlFor='name'>Name</label>
                                        <input type='text' value={nameInput} onChange={(e) => setNameInput(e.target.value)} />

                                        <label htmlFor='phone-number'>Phone number</label>
                                        <input type='text' value={phoneNumberInput} onChange={(e) => setPhoneNumberInput(e.target.value)} />

                                        <label htmlFor='address'>Address</label>
                                        <input type='text' value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
                                    </div>

                                    <div className='cost'>
                                        <p>Subtotal: <span>$ {totalCartCost}</span></p>
                                        <p>Ship: <span>$ 0</span></p>
                                        <p>Total cost: <span>$ {totalCartCost}</span></p>
                                    </div>

                                    <button onClick={() => {
                                        dispatch(createOrder({
                                            name: nameInput,
                                            phoneNumber: phoneNumberInput,
                                            address: addressInput
                                        }));
                                        dispatch(clearCart());
                                        setOrderSuccessfully(true);
                                    }
                                    }>
                                        {
                                            isPendingCreateOrder ?
                                                <Loading size={30} /> :
                                                `Order now`
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </section>
    );
};

export default Checkout;