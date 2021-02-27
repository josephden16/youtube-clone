import Home from './pages/Home';
import Watch from './pages/Watch';
import Videos from './pages/Videos';

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
  }
]

export default routes;
