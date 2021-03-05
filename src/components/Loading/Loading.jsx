import React from 'react';
import {useLoading, BallTriangle} from '@agney/react-loading';

const Loading = ({size}) => {
    const {containerProps, indicatorEl} = useLoading({
        loading: true,
        indicator: <BallTriangle width={size} />,
    });

    return (
        <div {...containerProps}>
            {indicatorEl}
        </div>
    );
}

export default Loading;