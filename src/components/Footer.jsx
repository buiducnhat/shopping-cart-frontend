import React from 'react';
import {Link} from 'react-router-dom'
import listRouters from '../app/listRouters';
import './Footer.css';

const Footer = (props) => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='row pt-3 mb-3 text-center d-flex justify-content-center link'>
                    <div className='col-md'>
                        <h6 className='link-title'>
                            <Link to={{pathname: listRouters.login}}>Sign in</Link>
                        </h6>
                    </div>
                    <div className='col-md'>
                        <h6 className='link-title'>
                            <Link to={{pathname: listRouters.product}}>Products</Link>
                        </h6>
                    </div>
                    <div className='col-md'>
                        <h6 className='link-title'>
                            <Link to={{pathname: listRouters.home}}>About us</Link>
                        </h6>
                    </div>
                    <div className='col-md'>
                        <h6 className='link-title'>
                            <Link to={{pathname: listRouters.home}}>Contact</Link>
                        </h6>
                    </div>
                </div>
                <hr className='hr' />
                <div className='row mb-3 content'>
                    <div className='col-md-8 col-12'>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia vero amet fugiat corporis nihil
                        omnis aspernatur. Ipsam necessitatibus nostrum praesentium repellat eveniet culpa voluptatibus
                        doloremque itaque explicabo, facere sunt commodi.</p>
                    </div>
                </div>
                <div className='row social'>
                    <div className='col-2 item'>
                        <Link to={{pathname: 'www.facebook.com/gerpan.4701'}}><i className='fab fa-facebook'></i></Link>
                    </div>
                    <div className='col-2 item'>
                        <Link to={{pathname: 'https://github.com/gerpann'}}><i className='fab fa-github'></i></Link>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                <div className='container'>
                    <div className='row'>
                        <div className='col item'>
                            <span>© 2021 Copyright: <Link to={{pathname: 'www.facebook.com/gerpan.4701'}}>Gerpan</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;