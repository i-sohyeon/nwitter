import React, { useState } from 'react';
import {authService, firebaseInstance} from "fbase";
import {createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";



const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState("");
    const [error, setError] = useState("");

    const onChange = (event) => { //값이 바뀔때마다 onChange함수 실행(event : 무슨일이 일어났는가?)
    
        // console.log(event.target.name);
        const {target: {name, value}, } = event;
        // console.log(value);
        // target : 변경이 일어난 부분
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
        //내가 input을 변경할 떄 마다 onChange function 호출
    };
    
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
               data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            }else{
            // eslint-disable-next-line
               data = await authService.signInWithEmailAndPassword(
                   email, password
                );
            }
            console.log(data);
        } catch (error){
          console.log(error);
          setError(error.message);
        } 
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    //newAccount의 이전값을 가져와서 그 값에 반대되는 것을 리턴

    const onSocialClick = async (event) =>{ //es6
        // console.log(event.target.name);
        
        const {
            target : {name},
        } =event;
        let provider;
        if(name === "google"){
            // provider = new firebaseInstance.auth.GoogleAuthProvider();
            provider=new GoogleAuthProvider();
        }else if( name === "githeb") {
            // provider = new firebaseInstance.auth.GithubAuthProvider();
            provider=new GithubAuthProvider();
        }
        // const data = await authService.signInWithPopup(provider);
        await signInWithPopup(authService, provider);

    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                {/* <input type="submit" value={newAccount ? "Create Account" : "Log In"} /> */}
                <input 
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                />

                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;