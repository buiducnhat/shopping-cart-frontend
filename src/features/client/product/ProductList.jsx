import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListProducts, fetchListProductsByCategory, fetchListCategories} from './productSlice';
import qs from 'qs';
import Product from './Product';
import LoadingScreen from '../../../components/Loading/LoadingScreen';
import ReactPaginate from 'react-paginate';
import './ProductList.css';
import Category from '../../../components/Category/Category';

const ProductList = (props) => {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const [sortType, setSortType] = useState('des-update');
    const [params, setParams] = useState(null);

    const productsList = useSelector(state => state.productSlice.products);
    const total = useSelector(state => state.productSlice.total);
    const isPendingFetchListProducts = useSelector(state => state.productSlice.isPendingFetchListProducts);
    const categories = useSelector(state => state.productSlice.categories);
    const isPendingFetchListCategories = useSelector(state => state.productSlice.isPendingFetchListCategories);

    useEffect(() => {
        dispatch(fetchListCategories());
    }, [dispatch])

    useEffect(() => {
        setParams(qs.parse(props.location.search, {ignoreQueryPrefix: true}));
        setPageNumber(params?.page || 1);
        setSortType(params?.sort || 'des-update');
    }, [params?.page, params?.sort, props.location.search]);

    useEffect(() => {
        if (props.type === 'category') {
            dispatch(fetchListProductsByCategory({pageNumber, sortType, categoryName: props.match.params.categoryName}));
        } else {
            dispatch(fetchListProducts({pageNumber, sortType}));
        }
    }, [dispatch, props.type, pageNumber, sortType, props.match.params.categoryName]);

    return (
        <section className='product-list'>
            <div className='container'>
                <div className='row widget-title'>
                    <div className='col-6'>
                        <h2>
                            <span>All products</span>
                        </h2>
                    </div>
                    <div className='col-6 btn-group sort-menu justify-content-end'>
                        <button type='button' className='dropdown-toggle sort-btn' data-toggle='dropdown'
                            aria-haspopup='true' aria-expanded='false'>
                            {
                                sortType === 'asc-price' ? 'Price ↑' :
                                    sortType === 'des-price' ? 'Price ↓' :
                                        sortType === 'asc-update' ? 'Newest ↑' : 'Newest ↓'
                            }
                        </button>
                        <div className='dropdown-menu dropdown-menu-right'>
                            <button className='dropdown-item' type='button'
                                onClick={() => {
                                    setSortType('asc-price');
                                    dispatch(fetchListProducts({pageNumber, sortType}))
                                }}
                            >
                                Price ↑
                            </button>
                            <button className='dropdown-item' type='button'
                                onClick={() => {
                                    setSortType('des-price');
                                    dispatch(fetchListProducts({pageNumber, sortType}))
                                }}
                            >
                                Price ↓
                            </button>
                            <button className='dropdown-item' type='button'
                                onClick={() => {
                                    setSortType('asc-update');
                                    dispatch(fetchListProducts({pageNumber, sortType}))
                                }}
                            >
                                Newest ↑
                            </button>
                            <button className='dropdown-item' type='button'
                                onClick={() => {
                                    setSortType('des-update');
                                    dispatch(fetchListProducts({pageNumber, sortType}))
                                }}
                            >
                                Newest ↓
                            </button>
                        </div>
                    </div>
                </div>
                {
                    !isPendingFetchListCategories && categories.length && (
                        <Category category={props.match.params.categoryName} />
                    )
                }
                <div className='row product-items'>
                    {
                        isPendingFetchListProducts ? <LoadingScreen /> :
                            !productsList.length ? null :
                                productsList.map((product, index) =>
                                    <div className='col-lg-3 col-md-6'>
                                        <Product
                                            key={index}
                                            props={props}
                                            id={product._id}
                                            name={product.name}
                                            productImage={product.productImage}
                                            orignalPrice={product.orignalPrice}
                                            salePrice={product.salePrice}
                                            currentPrice={product.currentPrice}
                                            description={product.description}
                                        />
                                    </div>
                                )
                    }
                </div>
                <ReactPaginate
                    previousLabel={<i className='fas fa-angle-left'></i>}
                    nextLabel={<i className='fas fa-angle-right'></i>}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(total / 8)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    containerClassName={'row pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    onPageChange={(data) => setPageNumber(data.selected + 1)}
                />
            </div>
        </section >
    )
}

export default ProductList;