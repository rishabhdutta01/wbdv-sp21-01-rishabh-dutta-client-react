//const QUIZZES_URL = 'http://localhost:3001/api/quizzes'
const QUIZZES_URL = 'http://wbdv-assignment-node-rishabh.herokuapp.com/api/quizzes'

const findQuestionsForQuiz = (quizId) => {
    return fetch(`${QUIZZES_URL}/${quizId}/questions`)
        .then(response => response.json())
}

const  QuestionsService = {
    findQuestionsForQuiz
}

export default QuestionsService