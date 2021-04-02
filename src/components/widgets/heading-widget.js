import React, {useState} from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import {FormControl, Input, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
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

const HeadingWidget = (
    {
        to = "/somewhere/to/go",
        updateWidget,
        deleteWidget,
        widget = {},
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
                {(widget.size === 1 || widget.size === "1") && <h1>{widget.text}</h1>}
                {(widget.size === 2 || widget.size === "2") && <h2>{widget.text}</h2>}
                {(widget.size === 3 || widget.size === "3") && <h3>{widget.text}</h3>}
                {(widget.size === 4 || widget.size === "4") && <h4>{widget.text}</h4>}
                {(widget.size === 5 || widget.size === "5") && <h5>{widget.text}</h5>}
                {(widget.size === 6 || widget.size === "6") && <h6>{widget.text}</h6>}
                </div>

                <SettingsIcon onClick={() => setEditing(true)}
                              className={"float-right"}/>
            </>
            }

            {editing &&
            <>
                <div className={classes.verticalItems}>
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

                    <TextField label={"Text"}
                               value={cachedWidget.text}
                               onChange={
                                   (e) => setCachedWidget({
                                       ...cachedWidget,
                                       text: e.target.value
                                   })
                               }/>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="widgetSize">Size</InputLabel>
                        <Select labelId="widgetSize"
                                value={cachedWidget.size}
                                onChange={(e) =>
                                    setCachedWidget({
                                        ...cachedWidget,
                                        size: e.target.value
                                    })
                                }>
                            <MenuItem value={1}>Heading 1</MenuItem>
                            <MenuItem value={2}>Heading 2</MenuItem>
                            <MenuItem value={3}>Heading 3</MenuItem>
                            <MenuItem value={4}>Heading 4</MenuItem>
                            <MenuItem value={5}>Heading 5</MenuItem>
                            <MenuItem value={6}>Heading 6</MenuItem>
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

export default HeadingWidget