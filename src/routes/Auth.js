import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => { //값이 바뀔때마다 onChange함수 실행(event : 무슨일이 일어났는가?)
    
        // console.log(event.target.name);
        const {target: {name, value}} = event;
        console.log(value);
        // target : 변경이 일어난 부분
        if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        };
        //내가 input을 변경할 떄 마다 onChange function 호출
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if(newAccount){
            //create account
        }else{
            //Log in
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name='email'
                    type="email"
                    placeholder='Email'
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name='password'
                    type="password"
                    placeholder='Password'
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;