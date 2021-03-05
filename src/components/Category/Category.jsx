import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import listRouters from '../../app/listRouters';
import beautifyCategoryName from '../../helpers/beautifyCategoryName';
import './Category.css';

const Category = (props) => {
    const categories = useSelector(state => state.productSlice.categories);

    const currentCategory = props?.category;

    return (
        <>
            <div className='row category-option'>
                {
                    categories.map((category, index) =>
                        <div className='col'>
                            <div className="category-option-item">
                                <Link
                                    className='category-option-link'
                                    index={index}
                                    to={{pathname: `${listRouters.productCategory}/${category.name}`}}>
                                    {beautifyCategoryName(category.name)}
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                currentCategory &&
                <div className="current-category">
                    <span>{`>> ${beautifyCategoryName(currentCategory)}`}</span>
                </div>
            }
        </>
    );
};

export default Category;