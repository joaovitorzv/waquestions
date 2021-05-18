import { Attempt } from '../hooks/questions'

const key = 'persist:attempts'

const attemptsStorage = {
  getAttempts: () => {
    const attempts = localStorage.getItem(key)
    if (attempts) {
      return JSON.parse(attempts)
    } else {
      return []
    }
  },
  persistAttempts: (attempt: Attempt, lastAttempts: Attempt[]) => {
    const updatedAttempts = [
      {
        id: attempt.id,
        date: attempt.date,
        questionary: attempt.questionary,
        questions_total: attempt.questions_total,
        questions_correct: attempt.questions_correct,
        questions_incorrect: attempt.questions_incorrect
      },
      ...lastAttempts
    ]
    localStorage.setItem(key, JSON.stringify(updatedAttempts))
  }
}

export default attemptsStorage