import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import QuizzesService from "../../services/quizzes-service";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    flexColumn: {
        display: 'flex',
    },
}));

const QuizzesList = () => {

    const classes = useStyles()

    const {courseId} = useParams()

    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        if (courseId !== "undefined" && typeof courseId != "undefined") {
            QuizzesService.findAllQuizzes()
                .then((quizzes) => {
                    setQuizzes(quizzes)
                })
        }
    }, [courseId])

    return (
        <div>
            <h2>Quizzes</h2>
            <div className="list-group">
                {
                    quizzes.map((quiz) => {
                        return (
                            <div className={classes.flexColumn}>
                                <Link
                                    to={`/courses/${courseId}/quizzes/${quiz._id}`}
                                    className="list-group-item">
                                    {quiz.title}
                                </Link>
                                <Link
                                    to={`/courses/${courseId}/quizzes/${quiz._id}/attempts`}
                                    className="list-group-item">
                                    Attempts History
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QuizzesList;