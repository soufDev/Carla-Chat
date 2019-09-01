import React from 'react';
import { StyledMessage } from './Message.styled';
import { Props } from '../../typings/Message';

export const Message: React.FC<Props> = ({ isAnwser, message }) => {
    return (
        <StyledMessage isAnswer={isAnwser} data-testid="message-id">{message}</StyledMessage>
    )
}