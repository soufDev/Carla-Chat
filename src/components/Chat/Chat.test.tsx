import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Chat } from './Chat';
import { readQuestion } from '../../utils';

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

jest.mock('../../config/questions', () => ([
    {
        questionId: 'name',
        questionText: 'What is your name ?',
    },
    {
        questionId: 'age',
        questionText: 'What is your age ?'
    }
]));

const questions = [
    {
        questionId: 'name',
        questionText: 'What is your name ?',
    },
    {
        questionId: 'age',
        questionText: 'What is your age ?'
    }
];

test('test the questions generator function', () => {
    const gen = readQuestion();
    const firstValue = gen.next();
    const secondValue = gen.next();
    const finalIteration = gen.next();

    expect(firstValue.done).toBe(false);
    expect(firstValue.value.questionText).toBe(questions[0].questionText);
    expect(firstValue.value.questionId).toBe(questions[0].questionId);

    expect(secondValue.done).toBe(false);
    expect(secondValue.value.questionText).toBe(questions[1].questionText);
    expect(secondValue.value.questionId).toBe(questions[1].questionId);

    expect(finalIteration.done).toBe(true);
})

test('should render without crashing', () => {
    const { container } = render(<Chat />);
    expect(container.firstChild).toBeInTheDocument();
});

test('should render just one answer', () => {
    const { getAllByTestId } = render(<Chat />);
    expect(getAllByTestId(/message-id/).length).toBe(1);
});

test('should add an answer to the dom on click in the button', async () => {
    const { getByPlaceholderText, getByText, getAllByTestId } = render(<Chat />);
    const input = getByPlaceholderText('Type Message here...');
    const submitButton = getByText('submit');
    fireEvent.change(input, { target: { value: 'bejamain' } });
    fireEvent.click(submitButton);
    let messages = await waitForElement(() => getAllByTestId(/message-id/));
    
    expect(messages.length).toBe(3);
    expect(scrollIntoViewMock).toHaveBeenCalled();
    
    fireEvent.change(input, { target: { value: '27' } });
    fireEvent.click(submitButton);
    messages = await waitForElement(() => getAllByTestId(/message-id/));
    
    expect(messages.length).toBe(4);
});

test('should add an answer to the dom on click in the Enter keyboard button', async () => {
    const { getByPlaceholderText, getAllByTestId } = render(<Chat />);
    const input = getByPlaceholderText('Type Message here...');
    fireEvent.change(input, { target: { value: 'bejamain' } });
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });
    let messages = await waitForElement(() => getAllByTestId(/message-id/));
    
    fireEvent.change(input, { target: { value: '28' } });
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });
    messages = await waitForElement(() => getAllByTestId(/message-id/));
    
    expect(messages.length).toBe(4);
});