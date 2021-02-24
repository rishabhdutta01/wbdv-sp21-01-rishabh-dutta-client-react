import React from 'react'
import {Route, Redirect} from "react-router-dom";
import {createCourse, findAllCourses, deleteCourse, updateCourse} from "../services/course-service";
import CustomAppBar from "./app-bar/app-bar";
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import CourseEditor from "./course-editor/course-editor";
import CustomBottomNavigation from "./bottom-navigation/bottom-navigation";

export default class CourseManager extends React.Component {
    state = {
        courses: []
    }

    updateCourse = (course) => {
        updateCourse(course["_id"], course)
            .then(status => this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.map(
                    (c) => c["_id"] === course["_id"] ? course : c)
            })))
    }

    componentDidMount = () =>
        findAllCourses()
            .then(courses => this.setState({courses}))

    addCourse = (title, owner) => {
        const newCourse = {
            title: title,
            owner: owner ? owner : "me",
        }
        createCourse(newCourse)
            .then(course => this.setState(
                (prevState) => ({
                    ...prevState,
                    courses: [
                        course,
                        ...prevState.courses
                    ]
                })))
    }

    deleteCourse = (courseToDelete) => {
        deleteCourse(courseToDelete["_id"])
            .then(status => {
                this.setState((prevState) => ({
                    ...prevState,
                    courses: prevState.courses.filter
                    (course => course !== courseToDelete)
                }))
            })
    }

    render() {
        return (
            <>

                <Route path="/courses/table">
                    <CustomAppBar addCourse={this.addCourse}/>
                    <CourseTable
                        addCourse={this.addCourse}
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                    <CustomBottomNavigation addCourse={this.addCourse}/>
                </Route>

                <Route exact path="/courses">
                    <Redirect to="/courses/table"/>}
                </Route>

                <Route exact path="/courses/edit/">
                    <Redirect to="/courses/table"/>}
                </Route>

                <Route path="/courses/grid">
                    <CustomAppBar addCourse={this.addCourse}/>
                    <CourseGrid
                        addCourse={this.addCourse}
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                    <CustomBottomNavigation addCourse={this.addCourse}/>
                </Route>

                <Route path="/courses/edit/:courseId" exact component={CourseEditor}/>
            </>
        )
    }
}