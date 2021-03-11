import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default function TitleDialog(
    {
        openedByButton,
        parentID,
        createItem
    }
)
{
    const [open, setOpen] = React.useState(openedByButton);

    const [title, setTitle] = useState('')

    const handleClose = () => {
        setOpen(false);
    }

    const handleCreateCourse = () => {
        if (title === "")
            alert("Title field is required")
        else
            createItem(parentID, title)
        setOpen(false);
    }

    return (
        <>
            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Add New Item
                </DialogTitle>
                <DialogContent>
                    <TextField autoFocus
                               margin="dense"
                               id="titleFld"
                               label="Title"
                               type="text"
                               fullWidth
                               value={title}
                               onChange={
                                   (e) => setTitle(e.target.value)
                               }/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateCourse} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}