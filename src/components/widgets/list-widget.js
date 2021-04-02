import React, {useState} from "react"
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItem, ListItemText,
    makeStyles,
    MenuItem,
    Select
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    // horizontalItems: {
    //     display: "flex",
    //     flexDirection: "row"
    // },
    verticalItems: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column"
    }
}));

const ListWidget = (
    {
        widget,
        updateWidget,
        deleteWidget
    }
) => {

    const classes = useStyles();

    const [cachedWidget, setCachedWidget] = useState(widget)
    const [editing, setEditing] = useState(false)

    const saveWidget = () => {
        setEditing(false)
        updateWidget(cachedWidget)

    }

    return (
        <>
            {!editing &&
            <>
                <div className={classes.verticalItems}>
                    {
                        widget.ordered &&
                        <ol>
                            {
                                widget.text.split("\n").map((item) => {
                                    return (
                                        <li>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    }
                    {
                        !widget.ordered &&
                        <ul>
                            {
                                widget.text.split("\n").map((item) => {
                                    return (
                                        <li>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>

                <SettingsIcon onClick={() => setEditing(true)}
                              className={"float-right"}/>
            </>
            }

            {
                editing &&
                <>
                    <div className={classes.verticalItems}>
                        <FormControlLabel
                            //value="start"
                            control={<Checkbox color="primary"
                                               checked={cachedWidget.ordered}
                                               onChange={
                                                   (e) => setCachedWidget({
                                                       ...cachedWidget,
                                                       ordered: !cachedWidget.ordered
                                                   })
                                               }/>}
                            label="Ordered"
                        />

                        <textarea
                            value={widget.text}
                            onChange={
                                (e) => setCachedWidget({
                                    ...cachedWidget,
                                    text: e.target.value
                                })
                            }
                            value={cachedWidget.text}
                            className="form-control"
                        rows={5}/>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="widgetType">Type</InputLabel>
                            <Select labelId="widgetType"
                                    value={cachedWidget.type}
                                    onChange={(e) =>
                                        setCachedWidget({
                                            ...cachedWidget,
                                            type: e.target.value
                                        })
                                    }>
                                <MenuItem value={"HEADING"}>Heading</MenuItem>
                                <MenuItem value={"PARAGRAPH"}>Paragraph</MenuItem>
                                <MenuItem value={"IMAGE"}>Image</MenuItem>
                                <MenuItem value={"LIST"}>List</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <CheckIcon className="float-right"
                               onClick={() => saveWidget()}/>

                    <DeleteIcon className="float-right"
                                onClick={() => {
                                    deleteWidget(cachedWidget)
                                }}/>
                </>
            }
        </>
    )
}

export default ListWidget