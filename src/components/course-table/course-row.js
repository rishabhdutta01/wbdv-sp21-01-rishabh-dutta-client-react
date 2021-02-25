import React, {useState} from 'react'
import {Link} from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import moment from "moment";
import {useStyles} from "./course-table";
import {Input} from "@material-ui/core";

export default function CourseRow(
    {
        deleteCourse,
        updateCourse,
        course
    }) {

    const classes = useStyles()

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
        <TableRow id={course["_id"]}>
            <TableCell width={"60%"} component={"th"} scope={"row"}>
                {
                    !editing &&
                    <Link to={`/courses/edit/${course["_id"]}`}>
                        {course.title}
                    </Link>

                }
                {
                    editing &&
                    <Input
                        onChange={(event) => setNewTitle(event.target.value)}
                        value={newTitle}
                        className="form-control"/>
                }
            </TableCell>
            <TableCell className={classes.hiddenXS} align="right">
                {
                    !editing &&
                    course["owner"]
                }
                {
                    editing &&
                    <Input
                        onChange={(event) => setNewOwner(event.target.value)}
                        value={newOwner}
                        className="form-control"/>
                }
            </TableCell>
            <TableCell className={classes.hiddenMD} align="right">
                {moment(Date.parse(course["_updatedAt"])).fromNow()}
            </TableCell>
            <TableCell className={classes.variableWidth} align="right">
                {!editing &&
                <EditIcon className={"ml-2"}
                          onClick={
                              () => setEditing(true)}
                          color={"primary"}>
                </EditIcon>
                }
                {editing &&
                <CheckIcon className={"ml-2"}
                           onClick={
                               () => saveCourse()}
                           color={"primary"}>

                </CheckIcon>}
                {editing &&
                <DeleteIcon className={"ml-2"}
                            onClick={
                                () => deleteCourse(course)}
                            color={"primary"}>

                </DeleteIcon>}
            </TableCell>
        </TableRow>
    )
}