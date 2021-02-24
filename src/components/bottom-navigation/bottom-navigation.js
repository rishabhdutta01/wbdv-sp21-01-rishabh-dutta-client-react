import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {TextField} from "@material-ui/core";

const useStyles = makeStyles({
    footer: {
        bottom: 0,
        float: "right",
        position: "sticky",
        background: "transparent"
    },
});

export default function CustomBottomNavigation(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [title, setTitle] = useState('')
    const [owner, setOwner] = useState('')


    const handleClickOpen = () => {
        setOpen(true)
        setTitle("")
        setOwner("")
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateCourse = () => {
        if (title === "")
            alert("Title field is required")
        else
            props.addCourse(title, owner)
        setOpen(false);
    }

    return (
        <>
            <BottomNavigation id={"courseBottomNavigation"}
                              onClick={handleClickOpen}
                              className={classes.footer}>
                <BottomNavigationAction icon={
                    <AddCircleIcon color={"error"} fontSize={"large"}/>
                }/>
            </BottomNavigation>

            <Dialog open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Add New Course
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
                    <TextField
                        margin="dense"
                        id="ownerFld"
                        label="Owned By"
                        type="text"
                        fullWidth
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
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