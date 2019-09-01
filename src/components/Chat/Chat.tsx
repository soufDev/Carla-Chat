import React from 'react';
import { Input } from '../Input/Input';
import Message from '../Message';
import { QuestionType } from '../../typings/questions';
import { readQuestion } from '../../utils';
import { Wrapper, MessageWrapper, InputWrapper, DialogWrapper, StyledButton } from './Chat.styled';
import { QuestionAndAnswser } from '../../typings/Chat';


export const Chat = () => {
    const [answerValue, setAnswerValue] = React.useState<string>('');
    const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);
    const scrollToBottom = React.useRef<HTMLDivElement>(document.createElement('div'));
    
    const questions = React.useMemo(() => readQuestion(), []);
    const firstValue = React.useMemo(() => questions.next().value as QuestionType, []);
    const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState<QuestionAndAnswser[]>([{
        question: firstValue.questionText,
        answer: null,
    }]);

    const questionValue = React.useMemo(() => questions.next(), [questionsAndAnswers.length]);
    
    const handlenInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setAnswerValue(e.currentTarget.value);
    }

    const handler = () => {
        const size = questionsAndAnswers.length;
        if (questionValue.done) {
            let clonedValue = [...questionsAndAnswers];
            clonedValue[size - 1] = { ...clonedValue[size - 1], answer: answerValue.trim() };
            setQuestionsAndAnswers(clonedValue);
            setAnswerValue('');
            setDisableSubmit(true);
        } else {
            const question = questionValue.value.questionText;
            let clonedValue = [...questionsAndAnswers];
            clonedValue[size - 1] = { ...clonedValue[size - 1], answer: answerValue.trim() };
            setQuestionsAndAnswers([...clonedValue, {
                question,
                answer: null,
            }]);
            setAnswerValue('');
        }
        scrollToBottom.current.scrollIntoView({
            block: "end",
        });
    }
    const handleSubmit = (): void => {
        handler();
    }

    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handler();
        }
    }
    return (
        <Wrapper>
            <DialogWrapper>
                {questionsAndAnswers.map((qa: QuestionAndAnswser, index: number) => {
                    if (qa.answer === null) {
                        return (
                            <MessageWrapper key={index}>
                                <Message isAnwser={false} message={qa.question} key={index} />            
                            </MessageWrapper>
                        )
                    }
                    return (
                        <MessageWrapper key={index}>
                            <Message isAnwser={false} message={qa.question} key={index} />            
                            <Message isAnwser={true} message={qa.answer} key={index + 1} />                    
                        </MessageWrapper>
                    )
                })}
                <div ref={scrollToBottom}/>
            </DialogWrapper>       
            <InputWrapper>
                <Input
                    placeHolder="Type Message here..."
                    value={answerValue}
                    onChange={handlenInput}
                    onPress={keyPressHandler}
                />
                <StyledButton disabled={answerValue.trim() === '' || disableSubmit} onClick={handleSubmit}>submit</StyledButton>
            </InputWrapper>
        </Wrapper>
    )
}