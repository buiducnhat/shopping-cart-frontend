import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListProducts} from './productSlice';
import './ProductList.css';
import qs from 'qs';
import Product from './Product';
import LoadingScreen from '../../../components/LoadingScreen';

const ProductList = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let params = qs.parse(props.location.search, {ignoreQueryPrefix: true});
        dispatch(fetchListProducts({pageNumber: params?.page, sortType: params?.sort}));
    }, [dispatch, props.location.search]);

    const productsList = useSelector(state => state.productSlice.products);
    const isPendingProducts = useSelector(state => state.productSlice.isPendingProducts);

    return (
        <section className='product-list'>
            <div className='container'>
                <div className='row'>
                    <div className='widget-title'>
                        <div className='col'>
                            <h2>
                                <span>All products</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {
                        (!isPendingProducts && productsList.length) ?
                            productsList.map((product, index) =>
                                <div className='col-lg-3 col-md-6'>
                                    <Product
                                        key={index}
                                        props={props}
                                        id={product._id}
                                        name={product.name}
                                        productImage={product.productImage}
                                        price={product.price}
                                        salePrice={product.salePrice}
                                        description={product.description}
                                    />
                                </div>
                            ) :
                            <LoadingScreen />
                    }
                </div>
            </div>
        </section>
    )
}

export default ProductList;