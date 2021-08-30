import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { addUser } from '../utils/reducer';
import UserIcon from "./icons/user";


function Header(props) {

    async function handleLogOut() {
        try {
            const { status } = await axios.get('/logout');
            if (status === 200) {
                document.cookie = `carrier=; expires=${moment().subtract(8, 'hours')}; SameSite=Strict; Secure`;
                props.addUser({ loggedin: false, name: '', mail: "", pic: "" });
                localStorage.removeItem('user_logged');
                localStorage.removeItem('user_pic');
                window.location.href = '/login';
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <header className="h-16 text-white bg-off-blue-biased border-b-2 border-gray-200 shadow-lg">
            <div className="relative flex px-10 items-center justify-between h-full">
                <h1 className="text-xl font-bold">Personal Scrum Board</h1>
                <div className="group rounded-full w-max shadow-lg cursor-pointer">
                    {/* access user pic or default */}
                    <div className="rounded-full overflow-hidden group-hover:bg-white group-hover:text-off-blue-biased">
                        {
                            props.state.pic 
                            ?
                                <img className="h-8 w-8 object-cover object-center" src={props.state.pic} alt={props.state.name} />
                            :
                                <UserIcon height="h-8" width="h-8"/>
                        }
                    </div>
                    <div className="hidden group-hover:block">
                        <div className="transition-all absolute z-10 -bottom-14 right-10 shadow-xl bg-white rounded-sm px-2 pb-1 pt-8 text-off-gray-dark">
                            <div className="border-t-2 py-1 pr-8">
                                <button onClick={handleLogOut} className="text-sm font-regular">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    return {
        state: state.scrumer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: data => dispatch(addUser(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);