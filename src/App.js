import {
    BrowserRouter as Router,
    Switch, Route, Redirect
} from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./pages/protectedroutes";
import NotFound from "./components/icons/notfound";
import AuthPage from "./pages/Auth";


// Route pages and create global state for header and pages
function App() {

    const currentUser = useSelector( (state) => state.scrumer.user.isLoggedIn );

    return (
        <Router>
            <div className="h-screen w-screen text-off-gray-dark overflow-hidden">
                <Switch>
                    <Route exact path={['/', '/tasksboard', '/settings', '/logout']}>
                        {
                            (!localStorage.getItem('user_logged') && !document.cookie) || (!currentUser && !document.cookie)
                                ?
                                <Redirect to="/login" />
                                :
                                <ProtectedRoutes />
                        }
                    </Route>
                    <Route exact path={["/login", "/register"]}>
                        {
                            (localStorage.getItem('user_logged') && document.cookie) || (currentUser && document.cookie)
                                ?
                                <Redirect to="/" />
                                :
                                <AuthPage />
                        }
                    </Route>
                    <Route path="*">
                        <div className="h-screen w-screen bg-off-gray-light">
                            <div className="h-full w-full flex justify-center">
                                <NotFound/>
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
