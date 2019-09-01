import React from 'react';
import { render } from '@testing-library/react';
import { Props } from '../../typings/Message';
import { Message } from './Message';

let props: Props = {
    isAnwser: false,
    message: 'hello',
}
test('should render without crashing', () => {
    const { container } = render(<Message {...props} />)
    expect(container.firstChild).toBeInTheDocument();
})

test('test if that render the message', () => {
    const { getByText } = render(<Message {...props} />)
    expect(getByText(props.message)).toBeInTheDocument();
    expect(getByText(props.message).textContent).toBe(props.message);
})