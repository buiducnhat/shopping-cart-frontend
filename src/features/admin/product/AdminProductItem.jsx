import React from 'react';
import {Link} from 'react-router-dom';
import listRouters from '../../../app/listRouters';

const AdminProductItem = props => {
    const {productId, name, salePrice, price, updatedAt} = props;

    return (
        <tr>
            <th scope='row'>{productId}</th>
            <td>
                <Link to={{pathname: `${listRouters.product}/${productId}`}}>{name}</Link>
            </td>
            <td>$ {salePrice}</td>
            <td>$ {price}</td>
            <td>{updatedAt}</td>
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
    );
};

export default AdminProductItem;