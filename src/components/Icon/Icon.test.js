import React from 'react';
import {render, mount,configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from './Icon';

const testObject={
    bedrooms:3
};
describe("Icon render", () => {
    it("TestObject", () => {
        expect(testObject).toHaveProperty('bedrooms', 3);
    });
    it("Antd Icon render", () => {
        const wrapper = mount(<Icon type="user" antd />);
        expect(wrapper.prop('antd')).toEqual(true);

    });
    it("Icon render", () => {
        const wrapper = render(<Icon type="user" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});