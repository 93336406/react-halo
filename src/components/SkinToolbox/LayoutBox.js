import React from 'react';
import {List, Switch} from 'antd';

/**
 * 几种常用布局
 */
export default ({theme, onChange}) => (
    <List.Item
        actions={[
            <Switch
                size="small"
                checked={theme.tabLayout}
                onChange={checked => onChange(checked)}
            />
        ]}
    >
        页签模式
    </List.Item>
);
