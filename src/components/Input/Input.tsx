import React from 'react';
import { Props } from '../../typings/Input';
import { StyledInput } from './Input.styled';

export const Input: React.FC<Props> = ({ placeHolder, value, onChange, onPress }) => {
    return <StyledInput placeholder={placeHolder} type="text" value={value} onChange={onChange} onKeyPress={onPress} />
}