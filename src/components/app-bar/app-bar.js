import React, {useState} from 'react';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {breakpoints} from "../course-table/course-table";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        color: "white"
    },
    title: {
        [breakpoints.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    titleFld: {
        flexGrow: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [breakpoints.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(2),
            width: 'auto',
        },
    },
    inputRoot: {
        display: "block",
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`
    },
    addButton: {
        marginLeft: theme.spacing(2),
    }
}));

export default function CustomAppBar(props) {
    const classes = useStyles();

    const [title, setTitle] = useState("")

    const handleCreateCourse = () => {
        if (title === "")
            alert("Title field is required")
        else
            props.addCourse(title)
        setTitle("");
    }

    return (
        <>
            <AppBar id="courseAppBar" position="sticky">
                <Toolbar>
                    <Link to={"/"}>
                        <IconButton edge="start"
                                    className={classes.menuButton}>
                            <MenuIcon/>
                        </IconButton>
                    </Link>

                    <Typography className={classes.title} variant="h6" noWrap>
                        Course Manager
                    </Typography>

                    <div className={classes.titleFld}>
                        <InputBase placeholder="Enter title"
                                   classes={{
                                       root: classes.inputRoot,
                                       input: classes.inputInput,
                                   }}
                                   inputProps={{'aria-label': 'titleFld'}}
                                   value={title}
                                   onChange={
                                       (e) => setTitle(e.target.value)
                                   }/>
                    </div>

                    <IconButton edge="end"
                                className={classes.addButton}
                                onClick={handleCreateCourse}>
                        <AddCircleIcon color="error"/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}
