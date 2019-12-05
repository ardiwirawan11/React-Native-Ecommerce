import React from 'react';
import { shallow } from 'enzyme';
import Button from '../src/components/Button';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe('Button', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Button/>);
            expect(component).toMatchSnapshot();
        });
    });
});