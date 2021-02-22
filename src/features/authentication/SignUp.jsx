import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from './authenticationSlice';
import Loading from '../../components/Loading';
import listRouters from '../../app/listRouters';
import './SignUp.css';

const SignUp = props => {
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [rePasswordInput, setRepasswordInput] = useState('');

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);
    const isPendingSignUp = useSelector(state => state.authenticationSlice.isPendingSignUp);
    const signUpErrMsg = useSelector(state => state.authenticationSlice.signUpErrMsg);

    if (isLoggedIn) {
        return <Redirect to={{pathname: listRouters.home}} />;
    }

    return (
        <section className="signup">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h2 className='title'>Sign Up</h2>
                        <div id='signup-form'>
                            <label htmlFor='email' className='email-label'>Email address</label>
                            <div className='input'>
                                <input type='text' name='email' value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                            </div>

                            <label htmlFor='name' className='name-label'>Full Name</label>
                            <div className='input'>
                                <input type='text' name='name' value={nameInput} onChange={e => setNameInput(e.target.value)} />
                            </div>

                            <label htmlFor='phone-number' className='phone-number-label'>Phone Number</label>
                            <div className='input'>
                                <input type='text' name='phone-number' value={phoneNumberInput} onChange={e => setPhoneNumberInput(e.target.value)} />
                            </div>

                            <label htmlFor='address' className='address-label'>Address</label>
                            <div className='input'>
                                <input type='text' name='address' value={addressInput} onChange={e => setAddressInput(e.target.value)} />
                            </div>

                            <label htmlFor='password' className='password-label'>Password</label>
                            <div className='input'>
                                <input type='password' name='password' value={passwordInput} onChange={e => setPasswordInput(e.target.value)} />
                            </div>

                            <label htmlFor='re-password' className='re-password-label'>Confirm Password</label>
                            <div className='input'>
                                <input type='password' name='re-password' value={rePasswordInput} onChange={e => setRepasswordInput(e.target.value)} />
                            </div>

                            {
                                isPendingSignUp && <Loading size={50}/>
                            }

                            {
                                signUpErrMsg &&
                                <div className="signup-status">
                                    <i className="far fa-times-circle"></i>
                                    {`${signUpErrMsg.replace(signUpErrMsg.charAt(0).toUpperCase())}`}
                                </div>
                            }

                            <span>
                                Already had an account?
                                <Link className='ml-1' to={{pathname: listRouters.login}}>Log In now</Link>
                            </span>

                            <button
                                id='submit-btn'
                                onClick={() => dispatch(signUp({
                                    email: emailInput,
                                    name: nameInput,
                                    phoneNumber: phoneNumberInput,
                                    address: addressInput,
                                    password: passwordInput
                                }))}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SignUp;