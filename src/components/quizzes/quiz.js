import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import Question from "./questions/question"
import QuestionsService from "../../services/questions-service";
import QuizzesService from "../../services/quizzes-service";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";

const Quiz = () => {

    const {courseId, quizId} = useParams()

    const [questions, setQuestions] = useState([])

    const [buttonClicked, setButtonClicked] = useState(false)
    const [scoresButtonClicked, setScoresButtonClicked] = useState(false)
    const [scores, setScores] = useState(0)

    useEffect(() => {
        if (courseId !== "undefined" && typeof courseId != "undefined"
            && quizId !== "undefined" && typeof quizId != "undefined") {
            QuestionsService.findQuestionsForQuiz(quizId)
                .then(questions => setQuestions(questions))
        }
    }, [courseId, quizId])

    const onSubmitOfQuiz = () => {
        setButtonClicked(true)
        QuizzesService.submitQuiz(quizId, questions)
    }

    const scoresButtonWasClicked = () => {
        setScoresButtonClicked(true)
        QuizzesService.findLastQuizAttempt(quizId)
            .then(response => setScores(response[0]["score"]))
    }

    return (
        <div>
            <h2>Quiz {quizId}</h2>
            {
                buttonClicked &&
                <Button color={"primary"}
                        onClick={scoresButtonWasClicked}>
                    Get Scores
                </Button>
            }
            {
                scoresButtonClicked &&
                <Typography>Scores - {scores}</Typography>
            }

            <ul>
                {
                    questions.map(question =>
                        <li>
                            <Question question={question} buttonClicked={buttonClicked}/>
                        </li>
                    )
                }
            </ul>
            <Button color={"primary"}
                    disabled={buttonClicked}
                    onClick={onSubmitOfQuiz}>SUBMIT</Button>
        </div>
    );
}

export default Quiz