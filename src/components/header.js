import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import { Context } from '../utils/store';


function Header() {

    // access Global state
    const { state, dispatch } = useContext(Context);

    async function handleLogOut(){
        try {
            const {status} = await axios.get('http://localhost:2200/api/v1/logout');
            if(status === 200){
                dispatch({type: 'SET_USER', payload: {loggedin: false, name: '' }});
                document.cookie = `carrier=; expires=${moment().subtract(8, 'hours')}; SameSite=Strict; Secure`;
                localStorage.removeItem('user_logged');
                localStorage.removeItem('username');
                window.location.href = '/login';
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <header className="h-16 text-white bg-gradient-to-r from-indigo-800 to-off-blue border-b-1 border-gray-500 shadow-lg">
            <div className="relative flex px-10 items-center justify-between h-full">
                <h1 className="text-xl font-bold">Projects</h1>
                <div className="group rounded-full w-max shadow-lg cursor-pointer">
                    {/* access user pic or default */}
                    <div className="rounded-full group-hover:bg-white group-hover:text-off-blue">
                        {
                            state.user.pic
                                ?
                                state.user.pic
                                :
                                <svg className="h-8 w-8 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m256 0c-141.163 0-256 114.837-256 256s114.837 256 256 256 256-114.837 256-256-114.837-256-256-256zm0 490.667c-50.859 0-97.856-16.448-136.341-44.053l55.125-18.389c33.365-13.909 44.48-64 44.48-76.224 0-3.2-1.429-6.208-3.883-8.235-11.925-9.835-24.576-26.901-24.576-39.168 0-14.357-5.867-22.507-11.584-26.496-2.667-7.381-6.976-20.821-7.339-29.291 5.312-0.597 9.451-5.12 9.451-10.603v-56.896c0-30.443 29.077-74.667 74.667-74.667 42.837 0 54.123 18.453 55.552 25.749-0.384 1.365-0.533 2.709-0.405 3.904 0.619 5.781 4.949 8.533 7.275 10.005 3.669 2.325 12.245 7.787 12.245 35.029v56.896c0 5.909 2.859 10.005 8.747 10.005 0.192 0.192 0.448 0.661 0.683 1.131-0.512 8.512-4.651 21.397-7.317 28.736-5.696 3.989-11.584 12.139-11.584 26.496 0 12.267-12.651 29.333-24.576 39.168-2.475 2.027-3.883 5.056-3.883 8.235 0 12.203 11.136 62.315 45.227 76.48l54.379 18.133c-38.466 27.607-85.484 44.055-136.343 44.055zm152.256-56.448c-0.981-3.157-3.243-5.867-6.613-6.997l-56.149-18.688c-19.627-8.171-28.736-39.573-30.869-52.139 14.528-13.504 27.947-33.621 27.947-51.797 0-6.165 1.749-8.555 1.408-8.619 3.328-0.832 6.037-3.2 7.317-6.379 1.045-2.624 10.24-26.069 10.24-41.877 0-0.853-0.107-1.728-0.32-2.581-1.344-5.355-4.48-10.752-9.173-14.123v-49.664c0-30.72-9.365-43.563-19.243-51.008-2.219-15.253-18.56-44.992-76.757-44.992-59.477 0-96 55.915-96 96v49.664c-4.693 3.371-7.829 8.768-9.173 14.123-0.213 0.832-0.32 1.707-0.32 2.581 0 15.808 9.195 39.253 10.24 41.877 1.28 3.179 2.965 5.205 6.293 6.037 0.683 0.405 2.432 2.773 2.432 8.96 0 18.176 13.419 38.293 27.947 51.797-2.133 12.565-11.157 43.925-30.144 51.861l-56.896 18.965c-3.392 1.131-5.653 3.861-6.635 7.04-50.369-43.092-82.455-106.943-82.455-178.26 0-129.387 105.28-234.667 234.667-234.667s234.667 105.28 234.667 234.667c0 71.275-32.064 135.125-82.411 178.219z" />
                                </svg>
                        }
                    </div>
                    <div className="hidden group-hover:block">
                        <div className="transition-all absolute z-10 -bottom-10 right-10 shadow-2xl bg-white p-4 text-off-gray-dark">
                            <button onClick={handleLogOut} className="text-sm font-regular">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;