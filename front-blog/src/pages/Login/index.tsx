import React, { useState } from 'react';
import tryLogin from '../../services/django/login';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='login-page'>
            <div className='email'>
                Email:
                <input type="email" onChange={(event)=>{setEmail(event.target.value)}} id="login-email">
                </input>
            </div>
            <div className='password'>
                Password:
                <input type="password" onChange={(event)=>{setPassword(event.target.value)}} id="login-password">
                </input>
            </div>
            <button onClick={async()=>{
                const status = await tryLogin(email, password);
                if (status) {
                    // go to home page
                }
                else {
                    // go to login page
                    // show error message
                }
            }}>Login</button>
        </div>
    )
}