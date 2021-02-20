import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import listRouters from '../app/listRouters';
import './Header.css';

const Header = (props) => {
    const totalCartCost = useSelector(state => state.cartSlice.total);

    const script = () => {
        const body = document.body;
        const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
        const desktopMenu = document.getElementById('desktop-menu');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuTrigger.addEventListener('click', () => {
            if (mobileMenu.style.display === 'none') {
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.style.display = 'none';
            }
        })

        const responsiveMenu = () => {
            if (window.innerWidth < 768) {
                desktopMenu.style.display = 'none';
                mobileMenuTrigger.style.display = 'block';
            } else {
                desktopMenu.style.display = 'block';
                mobileMenuTrigger.style.display = 'none';
                mobileMenu.style.display = 'none';
            }
        }
        responsiveMenu();
        body.onresize = () => responsiveMenu();
    }
    useEffect(script, []);

    return (
        <React.Fragment>
            <header className='top-header-bar'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <ul className='top-header-bar'>
                                <li className='top-email'>
                                    <i className='far fa-envelope'></i>
                                    gerpandev@gmail.com
                                </li>
                                <li className='top-cart'>
                                    <Link to={{pathname: listRouters.cart}}>
                                        <i className='fa fa-shopping-cart'></i>
                                        My Cart - $
                                        <span className='price'>{` ${totalCartCost || 0}`}</span>
                                    </Link>
                                </li>
                                <li className='top-account'>
                                    <Link to={{pathname: listRouters.account}}>
                                        <i className='fas fa-user'></i>
                                        Account
                                    </Link>
                                </li>
                                <li className='top-search'>
                                    <form role='search' id='top-search-form' action='/' method='get'>
                                        <input type='search' className='top-search-field' placeholder='Search ...' />
                                        <button type='submit' className='top-search-button' id='top-search-button'>
                                            <span className='fas fa-search'></span>
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <header id='masthead' className='site-header'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-4 logo-header'>
                            <Link to={{pathname: listRouters.home}}>
                                <img src='https://i.imgur.com/wI9k3di.png' width='auto' height='100' alt='' />
                            </Link>
                        </div>
                    </div>
                </div>
                <nav id='site-nav' className='site-nav' role='navigation'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <ul id='desktop-menu' className='desktop-menu'>
                                    <li className='desktop-menu-item active'>
                                        <Link to={{pathname: listRouters.home}}>Home</Link>
                                    </li>
                                    <li className='desktop-menu-item'>
                                        <Link to={{pathname: listRouters.product}}>Shop</Link>
                                    </li>
                                    <li className='desktop-menu-item'>
                                        <Link to={{pathname: listRouters.order}}>Contact</Link>
                                    </li>
                                </ul>
                                <button id='mobile-menu-trigger' className='mobile-menu-trigger' style={{display: 'none'}}>
                                    <i className='fa fa-bars'></i>
                                </button>
                                <ul id='mobile-menu' className='mobile-menu' style={{display: 'none'}}>
                                    <li className='mobile-menu-item'>
                                        <Link to={{pathname: listRouters.home}}>Home</Link>
                                    </li>
                                    <li className='mobile-menu-item'>
                                        <Link to={{pathname: listRouters.product}}>Shop</Link>
                                    </li>
                                    <li className='mobile-menu-item'>
                                        <Link to={{pathname: listRouters.home}}>Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default Header