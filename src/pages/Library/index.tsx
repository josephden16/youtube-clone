import React, { useContext } from 'react';
import Authentication from '../../components/Authentication';
import Layout from '../../components/Layout';
import Main from '../../components/library/Main';
import { UserContext } from '../../components/providers/AuthProvider';


const Library = () => {
  const user = useContext(UserContext);
  return (
    <Layout>
      {!user &&
        <div className="text-center mt-8 space-y-3">
          <div>You must be signed in to access your library.</div>
          <Authentication />
        </div>
      }
      {user && <Main userId={user.uid} />}
    </Layout>
  )
}

export default Library;
