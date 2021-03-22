import React, {useState} from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
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
    verticalItems: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column"
    }
}));

const ParagraphWidget = (
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
                    <p>
                        {widget.text}
                    </p>
                </div>

                <SettingsIcon onClick={() => setEditing(true)}
                              className={"float-right"}/>
            </>
            }

            {
                editing &&
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
                            </Select>
                        </FormControl>

                        <textarea
                            value={widget.text}
                            onChange={
                                (e) => setCachedWidget({
                                    ...cachedWidget,
                                    text: e.target.value
                                })
                            }
                            value={cachedWidget.text} className="form-control"/>
                    </div>

                    <CheckIcon className="float-right"
                               onClick={() => {
                                   saveWidget()
                               }}/>

                    <DeleteIcon className="float-right"
                                onClick={() => {
                                    deleteWidget(widget)
                                }}/>
                </>
            }
        </>
    );
}

export default ParagraphWidget