import React from 'react';
import {useLoading, BallTriangle} from '@agney/react-loading';

const Loading = ({size}) => {
    const {containerProps, indicatorEl} = useLoading({
        loading: true,
        indicator: <BallTriangle width={size} />,
    });

    return (
        < section {...containerProps}>
            {indicatorEl}
        </section >
    );
}

export default Loading;