const QUIZZES_URL = 'http://localhost:3001/api/quizzes'

const findAllQuizzes = () => {
    return fetch(QUIZZES_URL)
        .then(response => response.json())
}

const findQuizById = (quizId) => {
    return fetch(`${QUIZZES_URL}/${quizId}`)
        .then(response => response.json())
}

const QuizService = {
    findAllQuizzes,
    findQuizById
}

export default QuizService