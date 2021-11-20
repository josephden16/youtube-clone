import { createContext, useEffect, useState } from "react";
import {
  auth,
  createUserChannelDocument,
  createUserProfileDocument,
} from "../../firebase";

export const UserContext = createContext(null);

const UserProvider = (props: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // creates a new user profile document if none exists
        const userRef = await createUserProfileDocument(userAuth, {});
        await createUserChannelDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setUser({ uid: snapshot.id, ...snapshot.data() });
          setLoading(false);
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [props]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
