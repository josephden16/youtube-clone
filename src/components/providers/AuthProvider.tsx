import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';

export const UserContext = createContext(null);


const UserProvider = (props: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      setUser(user);
    })

    return () => {
      unsubscribeFromAuth();
    }
  })

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  )
}


export default UserProvider;
