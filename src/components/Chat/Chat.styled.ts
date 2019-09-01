import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 350px;
    height: 400px;
    border: 10px solid ${({ theme }) => theme.borderColor};
    background: ${({ theme }) => theme.chatBackground};
    padding: 5px;
`;


export const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DialogWrapper = styled.div`
    height: 370px;
    overflow: auto;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 30px;
`;

export const StyledButton = styled.button`
    background: ${({ theme }) => theme.buttonColor};
    border-radius: 5px;
    :focus {
        outline: none;
    }
`;