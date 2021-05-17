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
  persistAttempts: ({ date, id, questionary }: Attempt, lastAttempts: Attempt[]) => {
    const updatedAttempts = [
      ...lastAttempts,
      { date, id, questionary }
    ]
    console.log(updatedAttempts)

    localStorage.setItem(key, JSON.stringify(updatedAttempts))
  }
}

export default attemptsStorage