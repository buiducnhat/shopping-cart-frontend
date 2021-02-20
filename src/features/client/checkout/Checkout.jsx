import React from 'react';
import './Checkout.css';

const Checkout = props => {
    return (
        <section class="checkout-list">
            <div class="container">
                <div class="row widget-title mb-5">
                    <div class="col">
                        <h2>
                            <span>Checkout</span>
                        </h2>
                    </div>
                </div>
                <div class="row flex-row-reverse">
                    <div class="col-md-7 checkout-items">
                        <div class="row checkout-item">
                            <div class="col-4 product-image">
                                <img src="bitis.jpg" alt="product" />
                            </div>
                            <div class="col-8 product-detail">
                                <div class="product-name">
                                    <h3>Bitis Hunter X</h3>
                                </div>
                                <div class="price">
                                    <span>1,099$</span>
                                </div>
                                <div class="quantity">
                                    <span>Quantity: 1</span>
                                </div>
                                <div class="cost">
                                    <span>1,099$</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-5 checkout-info">
                        <div class="checkout-info-form">
                            <div class="checkout-info-input">
                                <label for="name">Name</label>
                                <input type="text" />

                                <label for="phone-number">Phone number</label>
                                <input type="text" />

                                <label for="address">Address</label>
                                <input type="text" />
                            </div>

                            <div class="cost">
                                <p>Subtotal: <span>$ 5099</span></p>
                                <p>Ship: <span>$ 0</span></p>
                                <p>Total cost: <span>$ 5099</span></p>
                            </div>

                            <button>Order now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;