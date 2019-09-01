import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Props } from '../../typings/Input';
import { Input } from './Input';

let props: Props = {
    placeHolder: 'type answer here',
    value: '',
    onChange: jest.fn(),
    onPress: jest.fn(),
}
test('should render without crashing', () => {
    const { container } = render(<Input {...props} />);
    expect(container.firstChild).toBeInTheDocument();
})

test('should find the input with placehoderText', () => {
    const {getByPlaceholderText } = render(<Input {...props} />);
    expect(getByPlaceholderText(props.placeHolder)).toBeInTheDocument();
})

test('should fire change event and call the onChange func', () => {
    const { getByPlaceholderText } = render(<Input {...props} />);
    const input = getByPlaceholderText(props.placeHolder);
    fireEvent.change(input, { target: { value: 'Heiderlberg' } });
    expect(props.onChange).toHaveBeenCalled();
})

test('should fire change event and call the onPress func', () => {
    const { getByPlaceholderText } = render(<Input {...props} />);
    const input = getByPlaceholderText(props.placeHolder);
    fireEvent.keyPress(input, { key: "Enter", charCode: 13 });
    expect(props.onPress).toHaveBeenCalled();
})