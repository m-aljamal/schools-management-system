import React from 'react';
import Auth from './authentication/Auth';
import UnAuth from './authentication/UnAuth';
 

function App() {
  const user = true
  return user ? <Auth/> : <UnAuth/>
}

export default App;
