import React from 'react'
import {breakpoints} from "../course-table/course-table";
import {findCourseById} from "../../services/course-service";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import './course-editor.css';

export const useStyles = makeStyles((theme) => ({
        moduleMenu: {
            backgroundColor: "white",
            height: "100vh",
            padding: "0"
        },

        hiddenMD: {
            padding: "0px",
            [breakpoints.breakpoints.down('md')]:
                {
                    display: 'none',
                }
        }
        ,
        hiddenXS: {
            padding: "0px",
            [breakpoints.breakpoints.down('xs')]:
                {
                    display: 'none',
                }
        }
        ,
        variableWidth: {
            padding: "0px",
            [breakpoints.breakpoints.up('lg')]:
                {
                    width: '10%',
                }
            ,
            [breakpoints.breakpoints.down('md')]:
                {
                    width: '18%',
                }
            ,
            [breakpoints.breakpoints.down('xs')]:
                {
                    width: '25%',
                }
        }
    }))
;
//const classes = useStyles();


export default class CourseEditor extends React.Component {

    state = {
        course: {
            _id: "",
            title: ""
        }
    }

    componentDidMount() {
        findCourseById(this.props.match.params.courseId)
            .then(actualCourse => this.setState({
                course: actualCourse
            }))
    }

    render() {
        return (
            <div id="courseEditorDiv"
                 className="container-fluid">
                <div className="row">
                    <div id="moduleList"
                         className="col-3 col-sm-2">
                        <div className="row">
                            <CloseIcon fontSize={"large"}
                                       color={"error"}
                                       onClick={
                                           () => window.history.back()
                                       }/>
                            <h3 id="courseName">
                                {this.state.course.title}
                            </h3>
                        </div>

                        <div className="row">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Module 1 - JQuery
                                    <i className="fa fa-times float-right"></i>
                                </li>
                                <li className="list-group-item">
                                    Module 2 - React
                                    <i className="fa fa-times float-right"></i>
                                </li>
                                <li className="list-group-item">
                                    Module 3 - Angular
                                    <i className="fa fa-times float-right"></i>
                                </li>
                                <li className="list-group-item">
                                    <i className="fa fa-plus-circle fa-2x color-red float-right"></i>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="moduleMenu" className="col-9 col-sm-10">
                        <nav className="nav navbar-tabs navbar-expand-sm sticky-top nav-fill" id="nav-tab"
                             role="tablist">
                            <a className="nav-item nav-link border-custom" id="nav-build-tab" data-bs-toggle="tab"
                               role="tab"
                               aria-controls="nav-build" aria-selected="true">Build<i className="fa fa-times ml-2"></i></a>
                            <a className="nav-item nav-link border-custom" id="nav-pages-tab" data-bs-toggle="tab"
                               role="tab"
                               aria-controls="nav-pages" aria-selected="false">Pages<i className="fa fa-times ml-2"></i></a>
                            <a className="nav-item nav-link border-custom" id="nav-theme-tab" data-bs-toggle="tab"
                               role="tab"
                               aria-controls="nav-theme" aria-selected="false">Theme<i className="fa fa-times ml-2"></i></a>
                            <a className="nav-item nav-link border-custom" id="nav-store-tab" data-bs-toggle="tab"
                               role="tab"
                               aria-controls="nav-store" aria-selected="false">Store<i className="fa fa-times ml-2"></i></a>
                            <a className="nav-item nav-link border-custom" id="nav-app-tab" data-bs-toggle="tab"
                               role="tab"
                               aria-controls="nav-app" aria-selected="false">App<i className="fa fa-times ml-2"></i></a>
                            <a className="nav-item nav-link border-custom" id="nav-settings-tab" data-bs-toggle="tab"
                               role="tab"
                               aria-controls="nav-settings" aria-selected="false">Settings<i
                                className="fa fa-times ml-2"></i></a>
                            <i className="nav-item nav-link border-custom fa fa-plus-circle fa-2x color-red"></i>
                        </nav>

                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-build" role="tabpanel"
                                 aria-labelledby="nav-build-tab">
                                <nav className="navbar nav-pills navbar-sm-expand nav-fill mt-3">
                                    <a className="nav-item nav-link border-custom active">Topic 1<i
                                        className="fa fa-times ml-2"></i></a>
                                    <a className="nav-item nav-link border-custom active">Topic 2<i
                                        className="fa fa-times ml-2"></i></a>
                                    <a className="nav-item nav-link border-custom active">Topic 3<i
                                        className="fa fa-times ml-2"></i></a>
                                    <a className="nav-item nav-link border-custom active">Topic 4<i
                                        className="fa fa-times ml-2"></i></a>
                                    <i className="nav-item nav-link border-custom fa fa-plus-circle fa-2x color-red"></i>
                                </nav>
                            </div>

                            <div className="tab-pane fade" id="nav-pages" role="tabpanel"
                                 aria-labelledby="nav-pages-tab">
                                <nav className="navbar nav-pills navbar-sm-expand nav-fill mt-3">
                                    <a className="nav-item nav-link border-custom active">Topic 1<i
                                        className="fa fa-times float-right"></i></a>
                                    <a className="nav-item nav-link border-custom active">Topic 2<i
                                        className="fa fa-times float-right"></i></a>
                                    <i className="nav-item nav-link border-custom fa fa-plus-circle fa-2x color-red"></i>
                                </nav>
                            </div>
                            <div className="tab-pane fade" id="nav-theme" role="tabpanel"
                                 aria-labelledby="nav-theme-tab">...
                            </div>
                            <div className="tab-pane fade" id="nav-store" role="tabpanel"
                                 aria-labelledby="nav-store-tab">...
                            </div>
                            <div className="tab-pane fade" id="nav-app" role="tabpanel"
                                 aria-labelledby="nav-app-tab">...
                            </div>
                            <div className="tab-pane fade" id="nav-settings" role="tabpanel"
                                 aria-labelledby="nav-settings-tab">...
                            </div>
                        </div>
                    </div>
                </div>
                <footer id="footer">
                    <i id="footerIcon" className="fa fa-plus-circle fa-2x color-red"></i>
                </footer>
            </div>
        );
    }
}