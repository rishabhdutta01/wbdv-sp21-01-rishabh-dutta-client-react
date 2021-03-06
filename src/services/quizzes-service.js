//const QUIZZES_URL = 'http://localhost:3001/api/quizzes'
const QUIZZES_URL = 'https://wbdv-assignment-node-rishabh.herokuapp.com/api/quizzes'

const findAllQuizzes = () => {
    return fetch(QUIZZES_URL)
        .then(response => response.json())
}

const findQuizById = (quizId) => {
    return fetch(`${QUIZZES_URL}/${quizId}`)
        .then(response => response.json())
}

const submitQuiz = (quizId, questions) => {
    fetch(`${QUIZZES_URL}/${quizId}/attempts`, {
        method: 'POST',
        body: JSON.stringify(questions),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const findLastQuizAttempt = (quizId) => {
    return fetch(`${QUIZZES_URL}/${quizId}/attempts/last`)
        .then(response => response.json())
}

export const getQuizAttempts = (qid) =>
    fetch(`${QUIZZES_URL}/${qid}/attempts`)
        .then(response => response.json());

const QuizzesService = {
    findAllQuizzes,
    findQuizById,
    submitQuiz,
    findLastQuizAttempt,
    getQuizAttempts
}

export default QuizzesService