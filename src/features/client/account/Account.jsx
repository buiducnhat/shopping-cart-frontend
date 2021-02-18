import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getUserData, logout} from '../../authentication/authenticationSlice';
import {clearCart} from '../cart/cartSlice';
import listRouters from '../../../app/listRouters';
import LoadingScreen from '../../../components/LoadingScreen'
import './Account.css';

const AccountCpn = (props) => {
    const {userData} = props;
    return (
        <div className='account'>
            <div className='container'>
                <div className="row account-profile">

                    <div className="col-md-6 avatar">
                        <img src={userData.avatar} alt='avatar' />
                        <div className="logout">
                            <button onClick={() => {
                                props.dispatch(clearCart());
                                props.dispatch(logout());
                            }}>
                                <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>

                    <div className="col-md-6 profile-detail">
                        <div className="profile-detail-item name">
                            <i className="fas fa-user"></i>
                            <p>{userData.name}</p>
                        </div>
                        <div className="profile-detail-item email">
                            <i className="fas fa-envelope"></i>
                            <p>{userData.email}</p>
                        </div>
                        <div className="profile-detail-item phone-number">
                            <i className="fas fa-phone"></i>
                            <p>{userData.phoneNumber}</p>
                        </div>
                        <div className="profile-detail-item address">
                            <i className="fas fa-map-marker-alt"></i>
                            <p>{userData.address}</p>
                        </div>
                        <div className="profile-detail-item join-time">
                            <i className="fas fa-calendar-alt"></i>
                            <p>{userData.createdAt.split('T')[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Account = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authenticationSlice.isLoggedIn);
    const isPendingGetUserData = useSelector(state => state.authenticationSlice.isPendingGetUserData);
    const userData = useSelector(state => state.authenticationSlice.userData);

    useEffect(() => {
        !isLoggedIn && dispatch(getUserData());
    }, [dispatch, isLoggedIn]);

    // if (isLoggedIn) {
    //     return (isPendingGetUserData ?
    //         <LoadingScreen /> :
    //         <AccountCpn userData={userData} dispatch={dispatch} />
    //     );
    // } else {
    //     return (isPendingGetUserData ?
    //         <LoadingScreen /> :
    //         <Redirect to={{pathname: listRouters.login, state: {lastUrl: listRouters.account}}} />
    //     );
    // }

    if (isPendingGetUserData) {
        return <LoadingScreen />;
    } else {
        return isLoggedIn ?
            <AccountCpn userData={userData} dispatch={dispatch} /> :
            <Redirect to={{pathname: listRouters.login, state: {lastUrl: listRouters.account}}} />;
    }
};

export default Account;
