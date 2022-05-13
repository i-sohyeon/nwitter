import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {auth} from 'fbase';
import Auth from 'routes/Auth';

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <Auth />
      <footer>&copy; nwitter {new Date().getFullYear()} nwitter</footer>
    </>
  );
};

//function App을 사용하고 그 안에 AppRouter를 사용하는 이유는?
//footer를 사용하고 싶을 수 있기 때문.

export default App;