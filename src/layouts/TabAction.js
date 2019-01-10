/**
 * Created by esong on 2019/1/2.
 */
import React, {PureComponent} from 'react';
import {Menu} from 'antd';
import Icon from '@/components/Icon';
import cx from 'classnames';
import HeaderDropdown from '@/components/HeaderDropdown';
import './styles/tabAction.less';

export default class TabAction extends PureComponent {
    state = {
        visible: false,
    };
    handleVisibleChange = visible => {
        this.setState({visible});
    };
    handleClick = ({key}) => {
        this.props.onTabsActions({key});
        this.setState({visible: false});
    };

    render() {
        const {visible} = this.state;
        const {currTabCanClose} = this.props;
        const action = (<Menu onClick={this.handleClick}>
            <Menu.Item key="close" disabled={!currTabCanClose}>关闭当前</Menu.Item>
            <Menu.Item key="closeother">关闭其它</Menu.Item>
            <Menu.Item key="closeall">关闭所有</Menu.Item>
        </Menu>);
        return (
            <HeaderDropdown
                placement={"bottomLeft"}
                overlay={action}
                onVisibleChange={this.handleVisibleChange}
            >
                <span className={cx("tab-action", "tab-tool", {opened: visible})}>
                   操作
                  <Icon type="down" antd/>
                </span>
            </HeaderDropdown>
        );
    }
}