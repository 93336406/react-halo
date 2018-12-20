import React from 'react';
import {Spin} from 'antd';
import './PageLoading.less'

export default ({loading}) => {
    if (loading) {
        return <div className={`loading-spinner`} style={{ textAlign: 'center'}}>
            <Spin size="large"/>
        </div>;
    } else {
        return null;
    }
};