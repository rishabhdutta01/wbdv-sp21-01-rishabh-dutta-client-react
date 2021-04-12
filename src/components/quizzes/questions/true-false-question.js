import React, {useState} from "react";
import {FormControlLabel, makeStyles, Radio, RadioGroup, Typography} from "@material-ui/core";
import {Button} from "react-bootstrap";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import '../questions/questions.css';

const useStyles = makeStyles((theme) => ({
    correct: {
        backgroundColor: '#d5f5d5',
    },
    wrong: {
        backgroundColor: '#f3d6d6',
    }
}));

const TrueFalseQuestion = ({question}) => {

    const classes = useStyles()

    const [value, setValue] = useState('')
    const [answerChosen, setAnswerChosen] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)

    const handleRadioChange = (event) => {
        setValue(event.target.value)
    };

    let trueHighlightClass = "", falseHighlightClass = "";

    const correctClass = `${classes.correct} correct--class`,
            wrongClass = `${classes.wrong} wrong--class`;

    if (buttonClicked) {
        if (question.correct == "true") {
            trueHighlightClass = correctClass;
            if (answerChosen != "true chosen") {
                falseHighlightClass = wrongClass;
            }
        } else if (question.correct == "false") {
            falseHighlightClass = correctClass;
            if (answerChosen != "false chosen") {
                trueHighlightClass = wrongClass;
            }
        }
    }

    return (
        <div>
            <h4>
                {question.question}
                {
                    buttonClicked &&
                    <>
                        {
                            value === question.correct &&
                            <CheckIcon className={"ml-5"}/>
                        }
                        {
                            value !== question.correct &&
                            <CloseIcon className={"ml-5"}/>
                        }
                    </>
                }
            </h4>

            <RadioGroup aria-label="quiz"
                        name={question._id}
                        value={value}
                        onChange={handleRadioChange}>
                <FormControlLabel disabled={buttonClicked} value="true"
                                  className={trueHighlightClass}
                                  control={<Radio/>}
                                  label="True"/>
                <FormControlLabel disabled={buttonClicked} value="false"
                                  className={falseHighlightClass}
                                  control={<Radio/>}
                                  label="False"/>
            </RadioGroup>


            <Typography component="p">
                Your Answer:
                {
                    buttonClicked &&
                    value
                }
            </Typography>


            <Button disabled={buttonClicked}
                    onClick={() => {
                        setButtonClicked(true)
                        setAnswerChosen(`${value} chosen`);
                    }
                    }>
                Grade
            </Button>
        </div>
    )
}

export default TrueFalseQuestion;