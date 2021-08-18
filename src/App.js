import { useContext } from "react";
import {
    BrowserRouter as Router,
    Switch, Route, Redirect
} from "react-router-dom";
import Feed from "./pages/Feed";
import Board from "./pages/Board";
import AuthPage from "./pages/Auth";
import Settings from "./pages/Settings";
import Header from "./components/header";
import SideMenu from "./components/sidemenu";
import { Context } from "./utils/store";


// Route pages and create global state for header and pages
function App() {

    const { state } = useContext(Context);

    return (
        <Router>
            <div className="h-screen w-screen text-off-gray-dark overflow-hidden">
                <Switch>
                    <Route exact path={['/', '/tasksboard', '/settings', '/logout']}>
                        {
                            (!localStorage.getItem('user_logged') && !document.cookie) || (!state.user.isLoggedIn && !document.cookie)
                                ?
                                <Redirect to="/login" />
                                :
                                <>
                                    <Header />
                                    <div className="relative flex items-center justify-content-center h-main">
                                        <div className="relative h-full w-24">
                                            <div className="absolute h-full w-full">
                                                <SideMenu />
                                            </div>
                                        </div>
                                        <div className="h-full w-full">
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
                        }
                    </Route>
                    <Route exact path={["/login", "/register"]}>
                        {
                            (localStorage.getItem('user_logged') && document.cookie) || (state.user.isLoggedIn && document.cookie)
                                ?
                                <Redirect to="/" />
                                :
                                <AuthPage />
                        }
                    </Route>
                    <Route path="*">
                        <div className="h-screen w-screen bg-off-gray-light">
                            <div className="h-full w-full flex justify-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 512, height: 512, marginTop: 96 }} viewBox="0 0 512 512">
                                        <style>
                                            {
                                                `
                                                    text{
                                                        font-size: 48px;
                                                        font-weight: 400;
                                                        font-family: Roboto, sans-serif;
                                                    }
                                                    text.smaller{
                                                        font-size: 24px;
                                                    }
                                                    circle{
                                                        animation-duration: 4s;
                                                        animation-iteration-count: infinite;
                                                        animation-timing-function: ease-in-out;
                                                    }
                                                    .stDiag{
                                                        animation-name: movingCircle1;
                                                    }
                                                    .ndDiag{
                                                        animation-name: movingCircle3;   
                                                    }
                                                    .antistDiag{
                                                        animation-name: movingCircle2;   
                                                    }
                                                    .antindDiag{
                                                        animation-name: movingCircle4;
                                                    }
                                                    .ndDiag, .antindDiag{
                                                        animation-delay: 1s;
                                                    }
                                                    @keyframes movingCircle1 {
                                                        0% {
                                                            transform: translateZ(200px);
                                                            transform: translate(0%, 0%);
                                                        }

                                                        50% {
                                                            transform: translateZ(200px);
                                                            transform: translate(73%, 73%);
                                                        }

                                                        100%{
                                                            transform: translate(0%, 0%);
                                                        }
                                                    }

                                                    @keyframes movingCircle2 {
                                                        0% {
                                                            transform: translate(0%, 0%);
                                                        }

                                                        50% {
                                                            transform: translateZ(200px);
                                                            transform: translate(-73%, -73%);
                                                        }

                                                        100%{
                                                            transform: translateZ(200px);
                                                            transform: translate(0%, 0%);
                                                        }
                                                    }

                                                    @keyframes movingCircle3 {
                                                        0% {
                                                            transform: translateZ(200px);
                                                            transform: translate(0%, 0%);
                                                        }

                                                        50% {
                                                            transform: translateZ(200px);
                                                            transform: translate(-73%, 73%);
                                                        }

                                                        100%{
                                                            transform: translate(0%, 0%);
                                                        }
                                                    }

                                                    @keyframes movingCircle4 {
                                                        0% {
                                                            transform: translate(0%, 0%);
                                                        }

                                                        50% {
                                                            transform: translateZ(200px);
                                                            transform: translate(73%, -73%);
                                                        }

                                                        100%{
                                                            transform: translateZ(200px);
                                                            transform: translate(0%, 0%);
                                                        }
                                                    }
                                                `
                                            }
                                        </style>
                                        <g>
                                            <g>
                                                <text x="216.5" y="235" stroke="#212121">404</text>
                                                <text className="smaller" x="169" y="288" stroke="#4c4c4c">Page Not Found</text>
                                            
                                                <circle className="ndDiag" cx="442" cy="70" r="30" fill="#85104e" />
                                                <circle className="stDiag" cx="70" cy="70" r="30" fill="#ec615b" />
                                                <circle className="antindDiag" cx="70" cy="442" r="30" fill="#5e35b0" />
                                                <circle className="antistDiag" cx="442" cy="442" r="30" fill="#4ec1e8" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
