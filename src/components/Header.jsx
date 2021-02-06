import React, {useEffect} from 'react';
// import useScript from '../app/hooks/useScript';
import './Header.css';

const Header = (props) => {
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
                                    flyass@gmail.com
                                </li>
                                <li className='top-cart'>
                                    <a href='/carts'>
                                        <i className='fa fa-shopping-cart'></i>
                                        My Cart - $
                                        <span className='price'>0</span>
                                    </a>
                                </li>
                                <li className='top-account'>
                                    <a href='/users'>
                                        <i className='fas fa-user'></i>
                                    Account
                                    </a>
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
                            <a href='/'>
                                <img width='165' height='70'
                                    src='https://demo.colorlib.com/tyche/wp-content/uploads/sites/64/2017/06/logo.png' alt='' />
                            </a>
                        </div>
                    </div>
                </div>
                <nav id='site-nav' className='site-nav' role='navigation'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <ul id='desktop-menu' className='desktop-menu'>
                                    <li className='desktop-menu-item active'>
                                        <a href='/'>Home</a>
                                    </li>
                                    <li className='desktop-menu-item'>
                                        <a href='/products'>Shop</a>
                                    </li>
                                    <li className='desktop-menu-item'>
                                        <a href='/'>Blog</a>
                                    </li>
                                    <li className='desktop-menu-item'>
                                        <a href='/'>Contact</a>
                                    </li>
                                </ul>
                                <button id='mobile-menu-trigger' className='mobile-menu-trigger' style={{display: 'none'}}>
                                    <i className='fa fa-bars'></i>
                                </button>
                                <ul id='mobile-menu' className='mobile-menu' style={{display: 'none'}}>
                                    <li className='mobile-menu-item'>
                                        <a href='/'>Home</a>
                                    </li>
                                    <li className='mobile-menu-item'>
                                        <a href='/products'>Shop</a>
                                    </li>
                                    <li className='mobile-menu-item'>
                                        <a href='/'>Blog</a>
                                    </li>
                                    <li className='mobile-menu-item'>
                                        <a href='/'>Contact</a>
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