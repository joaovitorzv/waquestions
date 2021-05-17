export const shuffle = (incorrect_answers: string[], correct_answer: string): string[] => {
  var shuffledArray = [...incorrect_answers, correct_answer]

  for (var i = shuffledArray.length - 1; i > 0; i--) {
    let randIdx = Math.floor(Math.random() * (i + 1))
    let temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[randIdx]
    shuffledArray[randIdx] = temp
  }

  return shuffledArray
}

export const decodeHtml = (input: string) => {
  let txt = document.createElement('textarea')
  txt.innerHTML = input
  return txt.value
}