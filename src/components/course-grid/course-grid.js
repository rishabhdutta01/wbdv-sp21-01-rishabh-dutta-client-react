import React from 'react'
import Grid from '@material-ui/core/Grid';
import CourseCard from "./course-card";
import {Link} from "react-router-dom";
import ListIcon from '@material-ui/icons/List';
import {Typography} from "@material-ui/core";
import DetailsIcon from '@material-ui/icons/Details';
import FolderIcon from "@material-ui/icons/Folder";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import {ThemeProvider} from "@material-ui/core/styles"
import {breakpoints} from "../course-table/course-table";

export default function CourseGrid(props) {
    return (
        <>
            <div className={"row"}>
                <Typography className={"d-none d-md-block col-4"}
                            variant="h6">
                    Recent Documents
                </Typography>
                <Typography className={"d-none d-md-block col-4"}
                            variant="h6"
                            align={"center"}>
                    Owned By me <DetailsIcon/>
                </Typography>
                <div className={"col-12 col-md-4 mt-0"} align={"right"}>
                    <FolderIcon/>
                    <SortByAlphaIcon/>
                    <Link to="/courses/table">
                        <ListIcon fontSize={"large"} color="primary"/>
                    </Link>
                </div>
            </div>

            <ThemeProvider theme={breakpoints}>
                <Grid id={"courseGrid"} container direction={"row"} spacing={3}>
                    {
                        props.courses.map(course =>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <CourseCard
                                    key={course["_id"]}
                                    updateCourse={props.updateCourse}
                                    deleteCourse={props.deleteCourse}
                                    course={course}/>
                            </Grid>
                        )
                    }
                </Grid>
            </ThemeProvider>
        </>
    );
}