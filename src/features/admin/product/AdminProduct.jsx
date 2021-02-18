import React from 'react';

const AdminProduct = () => {
    return (
        <section className='admin-product'>
            <div className='container'>
                <div className='mt-5'></div>
                <div className='product-table table-responsive-sm'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'>Product ID</th>
                                <th scope='col'>Product Name</th>
                                <th scope='col'>Sale Price</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Last Updated</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='row'>1</th>
                                <td>Bitis Hunter X</td>
                                <td>$ 899</td>
                                <td>$ 1099</td>
                                <td>2021-02-17</td>
                                <td>
                                    <div className='row-handle'>
                                        <button className='button button-edit'>
                                            <i className='far fa-edit'></i>
                                        </button>
                                        <button className='button button-delete'>
                                            <i className='far fa-trash-alt'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='products-handle'>
                    <button>
                        <i className='far fa-plus-square'></i>
                    Add new Product
                </button>
                </div>

            </div>
        </section>
    );
};

export default AdminProduct;