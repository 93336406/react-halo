import './style/index.less';
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {Divider, Button} from 'antd';
import cx from 'classnames';
import Icon from '../Icon';
import $$ from 'cmn-utils';
import HeaderDropdown from '../HeaderDropdown';
import ThemeColor from './ThemeColor';
import LayoutBox from './LayoutBox';

const Body = ({children, title, style}) => (
    <div
        style={{
            ...style,
            marginBottom: 24,
        }}
    >
        <h3 className="title">{title}</h3>
        {children}
    </div>
);

/**
 * 设置皮肤的右侧滑动的面板
 */
class SkinToolbox extends PureComponent {
    state = {
        visible: false,
    };
    changeSetting = (key, value) => {
        var props = {...this.props.theme};
        props[key] = value;
        this.props.onChangeTheme(props);
    };
    clearThemeStore = () => {
        $$.removeStore('crux-theme');
        this.props.onChangeTheme(null);
        this.popover.click();
    };
    handleVisibleChange = visible => {
        this.setState({visible});
    };

    render() {
        const {theme} = this.props;
        const {visible} = this.state;
        const skin = (
            <div className="content">
                <ThemeColor
                    title="主题色"
                    theme={theme}
                    onChange={theme => this.changeSetting('primarySkin', theme)}
                />
                <Divider/>
                <Body title="布局">
                <LayoutBox
                    theme={theme}
                    onChange={theme => this.changeSetting('tabLayout', theme)}
                />
                </Body>
                <Button block onClick={this.clearThemeStore}>
                    恢复默认设置
                </Button>
            </div>
        );
        return (
            <HeaderDropdown
                overlay={skin}
                overlayClassName={cx("popover")}
                visible={visible}
                onVisibleChange={this.handleVisibleChange}
                placement={"bottomCenter"}
                ref={node => (this.popover = ReactDOM.findDOMNode(node))}
            >
                <span className={cx("dropDown", {opened: visible})}>
                  <Icon type="skin" antd/>
                </span>
            </HeaderDropdown>
        );
    }
}

export default SkinToolbox;
