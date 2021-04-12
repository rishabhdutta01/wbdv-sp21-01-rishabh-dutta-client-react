const QUIZZES_URL = 'http://localhost:3001/api/quizzes'

const findQuestionsForQuiz = (quizId) => {
    return fetch(`${QUIZZES_URL}/${quizId}/questions`)
        .then(response => response.json())
}

const  QuestionService = {
    findQuestionsForQuiz
}

export default QuestionService