import React, {useState} from "react";
import {FormControlLabel, makeStyles, Radio, RadioGroup, Typography} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {Button} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    correct: {
        backgroundColor: '#d5f5d5',
    },
    wrong: {
        backgroundColor: '#f3d6d6',
    }
}));

const MultipleChoiceQuestion = ({question, buttonClicked}) => {
    const classes = useStyles()

    const [value, setValue] = useState('')
    const [answerChosen, setAnswerChosen] = useState('')

    const handleRadioChange = (event) => {
        question.answer = event.target.value
        setAnswerChosen(event.target.value)
        setValue(event.target.value)
    };

    let trueHighlightClass = "", falseHighlightClass = "";

    const correctClass = `${classes.correct} correct--class`,
        wrongClass = `${classes.wrong} wrong--class`;

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
                {
                    question.choices.map((option) =>
                    {
                        let clsName = "";
                        if(buttonClicked){
                            if(answerChosen == option) {
                                if (option === question.correct) {
                                    clsName = correctClass;
                                } else {
                                    clsName = wrongClass;
                                }
                            }else if(option === question.correct){
                                clsName = correctClass;
                            }
                        }
                        return(
                            <FormControlLabel disabled={buttonClicked} value={option}
                                              className={clsName}
                                              control={<Radio/>}
                                              label={option}/>
                        )
                    })
                }
            </RadioGroup>


            <Typography component="p">
                Your Answer:
                {
                    buttonClicked &&
                    value
                }
            </Typography>
        </div>
    )
}

export default MultipleChoiceQuestion