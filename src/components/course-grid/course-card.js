import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import {Link} from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import {Input} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    courseCard: {
        maxWidth: 560,
    }
}));

export default function CourseCard({deleteCourse, updateCourse, course}) {
    const classes = useStyles();

    const [editing, setEditing] = useState(false)

    const [newTitle, setNewTitle] = useState(course.title)
    const [newOwner, setNewOwner] = useState(course.owner)

    const saveCourse = () => {
        setEditing(false)
        if (newTitle === "") {
            alert("Title field is required")
            setNewTitle(course.title)
            setNewOwner(course.owner)
        } else {
            const newCourse = {
                ...course,
                title: newTitle,
                owner: newOwner
            }
            updateCourse(newCourse)
        }
    }

    return (
        <Card className={classes.courseCard} id={course["_id"]}>
            <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png"
                 className="card-img-top"
                 alt="..."/>
            <CardContent className={"pb-0"}>
                {
                    !editing &&
                    <Link to={`/courses/edit/${course["_id"]}`}>
                        {course.title}
                    </Link>
                }
                {
                    editing &&
                    <Input className="form-control"
                           value={newTitle}
                           onChange={
                               (event) => setNewTitle(event.target.value)
                           }/>
                }
            </CardContent>
            <CardContent className={"pb-0"}>
                Owned by: {'\u00A0'}
                {
                    !editing &&
                    course["owner"]
                }
                {
                    editing &&
                    <Input className="form-control"
                           value={newOwner}
                           onChange={
                               (event) => setNewOwner(event.target.value)
                           }/>
                }
            </CardContent>
            <CardContent className={"pb-0"}>
                <Link to={`/courses/edit/${course["_id"]}`}>
                    <Button variant="contained" color="primary">
                        {course.title}
                    </Button>
                </Link>
            </CardContent>
            <CardContent className={"pb-0 pt-0"}>
                <IconButton className={"float-right"} edge={"end"}>
                    {
                        !editing &&
                        <EditIcon className={"ml-2"}
                                  onClick={
                                      () => setEditing(true)
                                  }
                                  color={"primary"}>
                        </EditIcon>
                    }
                    {
                        editing &&
                        <CheckIcon className={""}
                                   onClick={
                                       () => saveCourse()
                                   }
                                   color={"primary"}>
                        </CheckIcon>
                    }
                    {
                        editing &&
                        <DeleteIcon className={"ml-2"}
                                    onClick={
                                        () => deleteCourse(course)
                                    }
                                    color={"primary"}>
                        </DeleteIcon>
                    }
                </IconButton>
            </CardContent>
        </Card>
    );
}
