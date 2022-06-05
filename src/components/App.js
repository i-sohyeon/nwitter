import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';


function App () {
  const [init, setInit] = useState(false); //초기화 되지 않은 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // import {getAuth, onAuthStateChanged} from 'firebase/auth';
  // useEffect(()=>{
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if(user){
  //       setIsLoggedIn(true);
  //     }else{
  //       setIsLoggedIn(false);
  //     }
  //     setInit(true);
  //   })
  // }, []);

 useEffect(()=>{ //컴포넌트가 mount(처음 실행될때)될 때 실행되는 hook()
   authService.onAuthStateChanged((user)=>{
     if(user) {
       setIsLoggedIn(true);
     }else{
       setIsLoggedIn(false);
     }
     setInit(true);
   });
 },[]);



  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing..."}
    {/* 초기화가 되었다면 router를 보여주고 아니면 initializing보여줌 */}

      <footer>&copy; nwitter {new Date().getFullYear()}</footer>
    </>
  );
};

//function App을 사용하고 그 안에 AppRouter를 사용하는 이유는?
//footer를 사용하고 싶을 수 있기 때문.

export default App;