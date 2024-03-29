import Home from './pages/Home';
import Watch from './pages/Watch';
import Channel from './pages/Channel';
import Library from './pages/Library';
import Subscriptions from './pages/Subscriptions';
import Trending from './pages/Trending';
import Search from './pages/Search';


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
    title: 'Channel',
    path: '/channel/:id/',
    component: Channel,
  },
  {
    title: 'Library',
    path: '/library',
    component: Library,
  },
  {
    title: 'Subscriptions',
    path: '/subscriptions',
    component: Subscriptions
  },
  {
    title: 'Trending',
    path: '/trending',
    component: Trending
  },
  {
    title: 'Search',
    path: '/search',
    component: Search
  }
]

export default routes;
