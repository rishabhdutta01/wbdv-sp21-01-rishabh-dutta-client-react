import React from 'react'
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    home: {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
        textAlign: "center"
    }
}));

export default function Home() {
    const classes = useStyles();

    const raiseAlert = () => {
        alert("Please choose a course!!!")
    }

    return (
        <div className={classes.home}>
            <ul>
                <Link button to="/courses/table" className="list-group-item">
                    Courses Table
                </Link>
                <Link button to="/courses/grid" className="list-group-item">
                    Courses Grid
                </Link>
                <Link button to="/courses/edit/" className="list-group-item" onClick={raiseAlert}>
                    Course Editor
                </Link>
            </ul>
        </div>
    );
}