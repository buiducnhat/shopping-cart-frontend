import React from 'react';
import {useLoading, BallTriangle} from '@agney/react-loading';

const LoadingScreen = () => {
    const {containerProps, indicatorEl} = useLoading({
        loading: true,
        indicator: <BallTriangle width='100' />,
    });

    return (
        < section {...containerProps}>
            <div className='container'>
                <div className='row d-flex justify-content-center mt-5'>
                    {indicatorEl}
                </div>
            </div>
        </section >
    );
}

export default LoadingScreen;