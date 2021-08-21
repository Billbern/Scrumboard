import { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import getData from "../../utils/fetchtasksdata";
import SideMenu from "../../components/sidemenu";
import {
    addTasks,
    addUser, setEndate,
    setRewards
} from "../../utils/reducer";
import Header from "../../components/header";
import Settings from "./Settings";
import Board from "./Board";
import Feed from "./Feed";


const userData = { loggedin: true, name: localStorage.getItem('username') }

class ProtectedRoutes extends Component {

    componentDidMount() {
        this.props.addUser(userData);
        getData(this.props.addTasks, this.props.setEndate, this.props.setRewards);
    }

    render() {
        return (
            <>
                <Header />
                <div className="relative flex items-center justify-content-center h-main bg-off-white-one">
                    <div className="relative h-full w-56 bg-white pt-11">
                        <div className="absolute h-full w-full">
                            <SideMenu />
                        </div>
                    </div>
                    <div className="h-full w-full pt-4">
                        <Switch>
                            <Route path="/settings">
                                <Settings />
                            </Route>
                            <Route path="/tasksboard">
                                <Board />
                            </Route>
                            <Route path="/">
                                <Feed />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEndate: () => dispatch(setEndate()),
        setRewards: () => dispatch(setRewards()),
        addTasks: (data) => dispatch(addTasks(data)),
        addUser: (data) => dispatch(addUser(data)),
    }
}

export default connect(null, mapDispatchToProps)(ProtectedRoutes);