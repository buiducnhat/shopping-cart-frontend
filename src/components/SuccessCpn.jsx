import React from 'react';
import './SuccessCpn.css';

const SuccessCpn = ({title, content}) => {
    return (
        <div className="success-cpn">
            <div className="title mb-3">
                <span>{title}</span>
            </div>
            <div className="body">
                <div className="icon mb-3">
                    <i class="far fa-check-circle"></i>
                </div>
                <div className="content">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}

export default SuccessCpn;