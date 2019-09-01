import styled from 'styled-components';

export const StyledMessage = styled.span<{ isAnswer: boolean }>`
    background: ${({ isAnswer, theme }) => isAnswer ? theme.answerColor: theme.questionColor};
    align-self: ${({ isAnswer }) => isAnswer ? 'flex-end': 'flex-start'};
    color: gray;
    border-radius: 10px;
    padding: 5px;
    margin: 5px 0px;
    width: fit-content;
`;