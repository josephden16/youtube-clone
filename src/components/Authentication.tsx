import React, { useContext } from 'react';
import { signInWithGoogle, signOut } from '../firebase';
import googleIcon from '../images/google-symbol.svg';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './providers/AuthProvider';

const Authentication = () => {
  const user: any = useContext(UserContext);

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <div className="transistion-colors dark:bg-dark flex flex-col space-y-3 items-center text-center mt-16 mb-2">
      <button onClick={signInWithGoogle} className="dark:bg-dark dark:text-lightGray justify-center text-center bg-lightGray text-gray inline-flex space-x-2 font-bold shadow-md pt-3 pb-3 pl-10 pr-10">
        <img className="w-4" alt="google" src={googleIcon} /> <span>Sign in with Google</span>
      </button>
      <button onClick={handleSignOut} className={!user ? 'hidden' : "bg-red rounded-md text-lightGray w-24 pt-2 pb-2"}>
        Sign Out
      </button>
      {user && <h2>Signed in as: {user.displayName}</h2>}
    </div>
  )
}


export default Authentication;
