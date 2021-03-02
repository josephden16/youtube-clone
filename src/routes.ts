import Home from './pages/Home';
import Watch from './pages/Watch';
import Videos from './pages/Videos';
import Channel from './pages/Channel';

const routes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    component: Home
  },
  {
    title: 'Watch',
    path: '/watch',
    exact: true,
    component: Watch
  },
  {
    title: 'Videos',
    path: '/videos',
    exact: true,
    component: Videos
  }, 
  {
    title: 'Channel',
    path: '/channel/:id',
    exact: true,
    component: Channel
  }
]

export default routes;
