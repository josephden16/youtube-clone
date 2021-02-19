import React, { createContext, Component } from 'react';
import { firestore } from '../../firebase';

export const VideosContext = createContext([]);


class VideosProvider extends Component {
  state = {
    videos: []
  }
  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection('videos').onSnapshot(snapshot => {
      const videos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      this.setState({ videos })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { videos } = this.state;
    const {children} = this.props;

    return (
      <VideosContext.Provider value={videos}>
        {children}
      </VideosContext.Provider>
    )
  }
}


export default VideosProvider;
