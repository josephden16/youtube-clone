import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../../components/common/Layout";
import AllSubscriptions from "../../components/subscriptions/AllSubscriptions";
import Main from "../../components/subscriptions/Main";
import Authentication from "../../components/common/Authentication";
import { UserContext } from "../../components/providers/AuthProvider";
import "./subscriptions.css";

const Subscriptions = () => {
  const { user } = useContext(UserContext);

  return (
    <Layout>
      <Switch>
        <Route path="/subscriptions/all">
          <AllSubscriptions user={user} />
        </Route>
        <Route exact path="/subscriptions">
          {!user && (
            <div className="text-center mt-8 space-y-3">
              <div>You must be signed in to view your subscriptions</div>
              <Authentication />
            </div>
          )}
          {user && <Main userId={user.uid} />}
        </Route>
      </Switch>
    </Layout>
  );
};

export default Subscriptions;
