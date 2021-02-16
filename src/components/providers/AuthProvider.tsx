import React, { createContext, Component } from 'react';
import { auth } from '../../firebase';

export const UserContext = createContext(null);


class UserProvider extends Component {
  state = {
    user: null
  }

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      this.setState({ user });
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    const { children } = this.props;
    const { user } = this.state;

    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    )
  }
}


export default UserProvider;
