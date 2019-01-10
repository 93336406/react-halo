import React from 'react';
import JestLink from '../components/JestLink';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
    const Link = renderer.create(<JestLink page="http://www.baidu.com">Baidu</JestLink>);
    let tree = Link.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onMouseEnter();
    tree=Link.toJSON();
    expect(tree).toMatchSnapshot();
});