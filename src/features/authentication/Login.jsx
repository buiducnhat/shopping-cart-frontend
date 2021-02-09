import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Loading from '../../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './authenticationSlice';
import './Login.css';
import listRouters from '../../app/listRouters';

const Login = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);
    const isPendingLogin = useSelector(state => state.authenticationSlice.isPendingLogin);
    const loginErrMsg = useSelector(state => state.authenticationSlice.loginErrMsg);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    if (isPendingLogin) {
        return <Loading />;
    }
    if (isLoggedIn) {
        return <Redirect to={{pathname: props.location.state?.lastUrl || listRouters.home}} />;
    }
    return (
        <div className='login'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h2 className='title'>Login</h2>
                        <div id='login-form'>
                            <label htmlFor='email' className='email-label'>Email address</label>
                            <div className='input'>
                                <input type='text' name='email' onChange={e => setEmailInput(e.target.value)} />
                            </div>

                            <label htmlFor='password' className='password-label'>Password</label>
                            <div className='input'>
                                <input type='password' name='password' onChange={e => setPasswordInput(e.target.value)} />
                            </div>

                            {
                                loginErrMsg &&
                                <div className="login-status">
                                    <i className="far fa-times-circle"></i>
                                    {` ${loginErrMsg}`}
                                </div>
                            }
                            <button id='submit-btn'
                                onClick={() => dispatch(login({email: emailInput, password: passwordInput}))}>
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;