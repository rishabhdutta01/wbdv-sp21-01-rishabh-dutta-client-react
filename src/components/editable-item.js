import React, {useState} from 'react'
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import {IconButton, Input} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    itemLink: {
        flexGrow: 1,
    }
}));

const EditableItem = (
    {
        to = "/somewhere/to/go",
        deleteItem,
        updateItem,
        item = {title: "Some Title", _id: "ABC"},
    }) => {

    const classes = useStyles();

    const [editing, setEditing] = useState(false)

    const [newTitle, setNewTitle] = useState(item.title)

    const saveItem = () => {
        setEditing(false)
        if (newTitle === "") {
            alert("Title field is required")
            setNewTitle(item.title)
        } else {
            const newItem = {
                ...item,
                title: newTitle,
            }
            updateItem(newItem)
        }
    }

    return (
        <>
            {
                !editing &&
                <>
                    <Link className={classes.itemLink} to={to}>
                        {item.title}
                    </Link>

                    <EditIcon onClick={() => setEditing(true)}
                              className={"ml-2"}>
                    </EditIcon>
                </>
            }
            {
                editing &&
                <>
                    <Input className={classes.itemLink}
                           onChange={(event) =>
                               setNewTitle(event.target.value)}
                           value={newTitle}/>

                    <CheckIcon onClick={() => saveItem()}
                               className={"ml-2"}>
                    </CheckIcon>

                    <DeleteIcon onClick={() => deleteItem(item)}
                                className={"ml-2"}>
                    </DeleteIcon>
                </>
            }
        </>
    )
}

export default EditableItem