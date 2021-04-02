import React, {useState} from "react"
import {FormControl, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
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

const ImageWidget = (
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
                    <img width={widget.width} height={widget.height} src={widget.url}/>
                </div>

                <SettingsIcon onClick={() => setEditing(true)}
                              className={"float-right"}/>
            </>
            }

            {
                editing &&
                <>
                    <div className={classes.verticalItems}>
                        <TextField label={"Image URL"}
                                   value={cachedWidget.url}
                                   onChange={
                                       (e) => setCachedWidget({
                                           ...cachedWidget,
                                           url: e.target.value
                                       })
                                   }/>

                        <TextField label={"Image Width"}
                                   value={cachedWidget.width}
                                   onChange={
                                       (e) => setCachedWidget({
                                           ...cachedWidget,
                                           width: e.target.value
                                       })
                                   }/>

                        <TextField label={"Image Height"}
                                   value={cachedWidget.height}
                                   onChange={
                                       (e) => setCachedWidget({
                                           ...cachedWidget,
                                           height: e.target.value
                                       })
                                   }/>

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

export default ImageWidget