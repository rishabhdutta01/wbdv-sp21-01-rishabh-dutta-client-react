import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";
import {makeStyles, createMuiTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FolderIcon from '@material-ui/icons/Folder';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import AppsIcon from '@material-ui/icons/Apps';

export const breakpoints = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
})

export const useStyles = makeStyles((theme) => ({
    hiddenMD: {
        padding: "0px",
        [breakpoints.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    hiddenXS: {
        padding: "0px",
        [breakpoints.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    variableWidth: {
        padding: "0px",
        [breakpoints.breakpoints.up('lg')]: {
            width: '10%',
        },
        [breakpoints.breakpoints.down('md')]: {
            width: '18%',
        },
        [breakpoints.breakpoints.down('xs')]: {
            width: '25%',
        }
    }
}));

export default function CourseTable(props) {
    const classes = useStyles();

    return (
        <>
            <TableContainer id="courseTableContainer" component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={"60%"}>Title</TableCell>
                            <TableCell className={classes.hiddenXS} align="right">
                                Owned By
                            </TableCell>
                            <TableCell className={classes.hiddenMD} align="right">
                                Last Modified
                            </TableCell>
                            <TableCell className={classes.variableWidth} align="right">
                                <FolderIcon/>
                                <SortByAlphaIcon/>
                                <Link to="/courses/grid"><AppsIcon/></Link>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            props.courses.map((course) =>
                                <CourseRow
                                    key={course["_id"]}
                                    updateCourse={props.updateCourse}
                                    deleteCourse={props.deleteCourse}
                                    course={course}/>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}