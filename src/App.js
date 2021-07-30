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
import Store from "./utils/store";


// Route pages and create global state for header and pages
function App() {
    return (
        <Router>
            <div className="h-screen w-screen text-off-gray-dark overflow-hidden">
                <Store>
                    <Header/>
                    <div className="relative flex items-center justify-content-center h-main">
                        <div className="relative h-full w-24">
                            <div className="absolute h-full w-full">
                                <SideMenu />
                            </div>
                        </div>
                        <div className="h-full w-full">
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
                </Store>
            </div>
        </Router>
    );
}

export default App;
