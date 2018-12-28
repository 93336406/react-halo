import React from 'react';
import {Tooltip, Icon} from 'antd';
import './style/ThemeColor.less';

const Tag = ({color, check, ...rest}) => (
    <div
        {...rest}
        style={{
            backgroundColor: color,
        }}
    >
        {check ? <Icon type="check"/> : ''}
    </div>
);

const ThemeColor = ({title, theme, onChange}) => {
    const colorList = [
        {
            key: 'darkgrey',
            title: '默认',
            color: '#30363e',
        },
        {
            key: 'light',
            title: "亮白",
            color: '#efefef',
        },
        {
            key: 'dark',
            title: "深蓝",
            color: '#001529',
        },
        {
            key: 'gem',
            title: '宝石',
            color: '#00859d',
        },
        {
            key: 'sun',
            title: '阳光',
            color: '#FF6600',
        },
        {
            key: 'warmth',
            title: '热情',
            color: '#CC0033',
        },
        {
            key: 'elegance',
            title: '典雅',
            color: '#8468ff',
        },
        {
            key: 'youth',
            title: '青春',
            color: '#009966',
        }
    ];
    return (
        <div className="themeColor">
            <h3 className="title">{title}</h3>
            <div className="content">
                {colorList.map(({key, color, title}) => (
                    <Tooltip key={color} title={title}>
                        <Tag
                            className="colorBlock"
                            color={color}
                            check={theme.primarySkin.key === key}
                            onClick={() => onChange && onChange({key, color})}
                        />
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default ThemeColor;
