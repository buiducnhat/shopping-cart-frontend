import React from 'react';
import {useDispatch} from 'react-redux';
import {updateCart, removeItem} from './cartSlice';
import './CartItem.css';

const CartItem = props => {
    let {productId, productImage, name, price, salePrice, quantity} = props;
    quantity = Number.parseInt(quantity);
    const dispatch = useDispatch();

    const updateQuantity = (newQuantity) => {
        const product = {
            productId,
            productImage,
            name,
            price,
            salePrice,
            quantity: newQuantity >= 1 ? newQuantity : 1,
            subTotal: (newQuantity >= 1 ? newQuantity : 1) * salePrice
        };
        dispatch(updateCart({product}))
    }

    return (
        <div className='row cart-product-item'>
            <div className='col-lg-2 col-sm-3 col-5 product-image'>
                <img src={productImage} alt='product' />
            </div>
            <div className='col-lg-10 col-sm-9 col-7 product-detail'>

                <div className='product-name'>
                    <h3>{name}</h3>
                </div>

                <div className='price'>
                    <span>{`$ ${salePrice?.toLocaleString()}`}</span>
                </div>

                <div className='quantity'>
                    <button onClick={() => updateQuantity(quantity - 1)}>
                        <i className='fas fa-minus'></i>
                    </button>
                    <input type='text' value={quantity} onChange={e => updateQuantity(Number.parseInt(e.target.value))} />
                    <button onClick={() => updateQuantity(quantity + 1)}>
                        <i className='fas fa-plus'></i>
                    </button>
                </div>

                <div className='sub-total'>
                    <span>{`$ ${(quantity * salePrice).toLocaleString()}`}</span>
                </div>

                <div className='remove-btn'>
                    <button onClick={() => {
                        if (window.confirm('Are you sure to remove this item?'))
                            dispatch(removeItem({productId}))
                    }}>
                        <i className='fas fa-times'></i>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default CartItem;