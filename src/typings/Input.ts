import React from 'react';

export interface Props {
    placeHolder: string;
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    onPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}