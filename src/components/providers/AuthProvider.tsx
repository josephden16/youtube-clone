import React, { createContext, useEffect, useState } from 'react';
import { auth, createUserProfileDocument } from '../../firebase';

export const UserContext = createContext(null);


const UserProvider = (props: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, {});
        userRef.onSnapshot(snapshot => {
          setUser({ uid: snapshot.id, ...snapshot.data() });
        })
      } else {
        setUser(null);
      }
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
