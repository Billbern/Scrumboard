import axios from 'axios';
import moment from 'moment';
import { useState } from "react";


export default function LoginForm() {

    const [identity, setIdentity] = useState('');
    const [passwd, setPasswd] = useState('');


    function handleInput(e) {
        if (e.target.name === 'identity') {
            setIdentity(e.target.value);
        } else {
            setPasswd(e.target.value);
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (identity && passwd) {
            let userData = { username: identity, password: passwd };
            try {
                const { data, status } = await axios.post('/login', userData)
                if (status === 200) {
                    document.cookie = `carrier=${data.user}; expires=${moment().add(8, 'hours')}; SameSite=Strict; Secure`;
                    localStorage.setItem('user_logged', true);
                    localStorage.setItem('username', data.user);
                    window.location.href = '/';
                } else {
                    console.log(data);
                }
            } catch (err) {
                console.error(err);
            }
        }
        setIdentity(''); setPasswd('');
    }

    return (
        <form className="bg-off-wine-light box-shadow-xl w-3/5 p-4" onSubmit={handleFormSubmit}>
            <div className="p-1">
                <label className="text-sm" htmlFor="user_name_mail">Username/Email</label>
                <input className="block bg-off-white w-full rounded-lg pl-2 py-1 mt-2 mb-4" name="identity" type="text" id="user_name_mail" value={identity} onChange={handleInput} />
            </div>
            <div className="p-1">
                <label className="text-sm" htmlFor="user_pass">Password</label>
                <input className="block bg-off-white w-full rounded-lg pl-2 py-1 mt-2 mb-4" name="passwd" type="password" id="user_pass" value={passwd} onChange={handleInput} />
            </div>
            <div className="flex justify-center">
                <button className="bg-off-cyan-dark text-white py-1.5 px-8 rounded-lg">login</button>
            </div>
        </form>
    )
}