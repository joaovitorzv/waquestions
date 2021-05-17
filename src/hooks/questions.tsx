import { constants } from "buffer";
import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid'
import api from '../api'

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
  correct_answers: { question_id: string, answer: string }[];
  incorrect_answers: { question_id: string, answer: string }[];
}

interface Attempt {
  id: string;
  date: string;
  questionary: Questionary;
}

interface QuestionsState {
  questionary: Questionary;
  attempts: Attempt[] | null;
}

interface QuestionsContextData {
  questionary: Questionary;
  attempts: Attempt[] | null;
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
    correct_answers: [],
    incorrect_answers: []
  },
  attempts: null
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
        console.log(action.questions)
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
                incorrect_answers: question.incorrect_answers
              }
            })
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