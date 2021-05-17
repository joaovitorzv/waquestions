import { constants } from "buffer";
import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid'

import { shuffle } from '../utils'
import attemptsStorage from '../services/attemptsStorage'

interface Question {
  id: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Questionary {
  quantity: number | null;
  questions: Question[];
  question_pointer: number;
  answers: { question_id: string, answer: string }[];
}

export interface Attempt {
  id: string;
  date: Date;
  questionary: Questionary;
}

interface QuestionsState {
  questionary: Questionary;
  attempts: Attempt[];
}

interface QuestionsContextData {
  questionary: Questionary;
  attempts: Attempt[];
  dispatch: React.Dispatch<QuestionsReducerActions>;
}

export enum QuestionsReducerType {
  START_QUESTIONARY,
  LOAD_QUESTIONARY,
  NEXT_QUESTION
}

type QuestionsReducerActions =
  | { type: QuestionsReducerType.START_QUESTIONARY, quantity: number }
  | { type: QuestionsReducerType.LOAD_QUESTIONARY, questions: Question[] }
  | { type: QuestionsReducerType.NEXT_QUESTION, question_id: string, answer: string }

const QuestionsContext = createContext<QuestionsContextData>({} as QuestionsContextData)

const initialState: QuestionsState = {
  questionary: {
    quantity: null,
    questions: [],
    question_pointer: 0,
    answers: []
  },
  attempts: attemptsStorage.getAttempts()
}

export const QuestionsProvider: React.FC = ({ children }) => {
  const [data, dispatch] = useReducer(questionsReducer, initialState)

  function questionsReducer(state: QuestionsState, action: QuestionsReducerActions): QuestionsState {
    switch (action.type) {
      case QuestionsReducerType.START_QUESTIONARY:
        return {
          ...state,
          questionary: {
            ...state.questionary,
            quantity: action.quantity
          }
        }

      case QuestionsReducerType.LOAD_QUESTIONARY:
        return {
          ...state,
          questionary: {
            ...state.questionary,
            questions: action.questions.map(question => {
              return {
                id: uuidv4(),
                category: question.category,
                question: question.question,
                correct_answer: question.correct_answer,
                incorrect_answers: shuffle(
                  question.incorrect_answers,
                  question.correct_answer
                )
              }
            })
          }
        }

      case QuestionsReducerType.NEXT_QUESTION:
        if (state.questionary.question_pointer === state.questionary.quantity! - 1) {
          const attempt = {
            id: uuidv4(),
            date: new Date(),
            questionary: {
              ...state.questionary,
              question_pointer: state.questionary.question_pointer + 1,
              answers: [
                ...state.questionary.answers,
                { question_id: action.question_id, answer: action.answer }
              ]
            }
          }

          attemptsStorage.persistAttempts(attempt, state.attempts)
          return {
            questionary: initialState.questionary,
            attempts: [
              ...state.attempts,
              attempt
            ]
          }
        }

        return {
          ...state,
          questionary: {
            ...state.questionary,
            question_pointer: state.questionary.question_pointer + 1,
            answers: [
              ...state.questionary.answers,
              { question_id: action.question_id, answer: action.answer }
            ]
          }
        }
      default:
        return state
    }
  }

  return (
    <QuestionsContext.Provider
      value={{
        questionary: data.questionary,
        attempts: data.attempts,
        dispatch: dispatch
      }}
    >
      {children}
    </QuestionsContext.Provider>
  )
}

export function useQuestions() {
  const context = useContext(QuestionsContext)

  if (!context) {
    throw Error('useQuestions must be wrapped by a QuestionsProvider')
  }

  return context
}