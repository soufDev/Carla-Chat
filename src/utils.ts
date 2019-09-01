import questions from './config/questions';
import { QuestionType } from './typings/questions';

export function* readQuestion() {
    for (let i = 0; i < questions.length; i += 1) {
        yield questions[i] as QuestionType;
    }
}