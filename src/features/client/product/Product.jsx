import React from 'react';
import './Product.css'

const Product = props => {
    const {id, name, price, salePrice, productImage, description} = props;
    return (
        <React.Fragment>
            <div className='col-lg-3 col-md-6'>
                <div className='product'>
                    <div className='product-image'>
                        <img src={productImage} alt='' />
                    </div>
                    <div className='product-info'>
                        <h4 className='product-title'>
                            <a href='/'>{name}</a>
                        </h4>
                        <div className='product-price-area'>
                            {
                                salePrice ?
                                    (
                                        <>
                                            <div className='price orignal-price line-through'>
                                                <span>$</span>
                                                <span>{price.toLocaleString()}</span>
                                            </div>
                                            <div className='price sale-price'>
                                                <span>$</span>
                                                <span>{salePrice.toLocaleString()}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='price orignal-price'>
                                            <span>$</span>
                                            <span>{price.toLocaleString()}</span>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div className='product-cart'>
                        <a href='/' className='product-cart-button'>
                            <i className='fas fa-shopping-cart'></i>
                            Add to Cart
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Product;