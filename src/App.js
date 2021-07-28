import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";
import Feed from "./pages/Feed";
import Board from "./pages/Board";
import Settings from "./pages/Settings";
import Logout from "./components/logout";
import Header from "./components/header";
import SideMenu from "./components/sidemenu";

function App() {
    return (
        <Router>
            <div className="h-screen w-screen text-off-gray-dark overflow-hidden">
                <Header/>
                <div className="relative flex items-center justify-content-center h-full">
                    <div className="fixed h-full">
                        <SideMenu />
                    </div>
                    <div className="h-full ml-24 w-full">
                        <Switch>
                            <Route path="/logout">
                                <Logout />
                            </Route>
                            <Route path="/settings">
                                <Settings />
                            </Route>
                            <Route path="/feed">
                                <Feed />
                            </Route>
                            <Route path="/">
                                <Board />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
