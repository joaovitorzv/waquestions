import { createContext, useState } from "react";

interface Question {
  id: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Questionary {
  quantity: number;
  questions: Question[];
  correct_answers: {
    question_id: string;
    answer: string;
  }[];
  wrong_answers: {
    question_id: string;
    answer: string;
  }[];
}

interface Attempt {
  id: string;
  date: string;
  questionary: Questionary;
}

interface QuestionsState {
  questionary: Questionary | null;
  attempts: Attempt[] | null;
}

interface QuestionsContextData {
  questionary: Questionary;
  attempts: Attempt[];
  startQuestionary: (quantity: number) => Question;
  nextQuestion: (question_id: string, answer: string) => Question;
}

const QuestionsContext = createContext<QuestionsContextData>({} as QuestionsContextData)

export const QuestionsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<QuestionsState>()

  return (
    <QuestionsContext.Provider
      value={{
        questionary: data?.questionary,
        attempts: data?.attempts
      }}
    >
      {children}
    </QuestionsContext.Provider>
  )
}
