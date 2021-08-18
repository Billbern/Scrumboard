import axios from "axios";
import { useState } from "react";


export default function RegisterForm() {

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [confpass, setConfpass] = useState('');

    async function handleFormSubmit(e){
        e.preventDefault();
        if(passwd === confpass){
            if(name && mail && passwd){
                const bodyData = {username: name, email: mail, password: passwd};
                try {
                    const {data, status} = await axios.post('/register', bodyData);
                    if(status === 200){
                        window.location.href = '/login';
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }
        setName('');setMail('');setPasswd('');setConfpass('');
    }

    function handleInputChange(e){
        const inputStates = {
            'user_name': (v)=> setName(v), 
            'user_mail': (v)=> setMail(v), 
            'user_pass': (v)=> setPasswd(v),
            'user_conf': (v)=> setConfpass(v)
        };
        inputStates[e.target.name](e.target.value);
        
    }

    return (
        <form className="bg-off-wine-light box-shadow-xl w-3/5 p-4" onSubmit={handleFormSubmit}>
            <div>
                <label className="text-sm" htmlFor="user_name">Username</label>
                <input className="block bg-off-white w-full rounded-lg pl-2 py-1 mt-2 mb-4" name="user_name" type="text" id="user_name" value={name} onChange={handleInputChange} />
            </div>
            <div>
                <label className="text-sm" htmlFor="user_mail">Email</label>
                <input className="block bg-off-white w-full rounded-lg pl-2 py-1 mt-2 mb-4" name="user_mail" type="text" id="user_mail" value={mail} onChange={handleInputChange} />
            </div>
            <div>
                <label className="text-sm" htmlFor="user_pass">Password</label>
                <input className="block bg-off-white w-full rounded-lg pl-2 py-1 mt-2 mb-4" name="user_pass" type="password" id="user_pass" value={passwd} onChange={handleInputChange} />
            </div>
            <div>
                <label className="text-sm" htmlFor="user_conf">Confirm password</label>
                <input className="block bg-off-white w-full rounded-lg pl-2 py-1 mt-2 mb-4" name="user_conf" type="password" id="user_conf" value={confpass} onChange={handleInputChange} />
            </div>
            <div className="flex justify-center">
                <button className="bg-off-cyan-dark text-white py-1.5 px-8 rounded-lg">Register</button>
            </div>
        </form>
    )
}