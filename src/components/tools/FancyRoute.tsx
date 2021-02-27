import React from 'react'
import { Route } from 'react-router-dom'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import './FancyRoute.css'

nprogress.configure({easing: 'ease-out', speed: 1000, trickleSpeed: 500, showSpinner: false});


class FancyRoute extends React.Component {
  componentWillMount () {
    nprogress.start()
  }

  componentDidMount () {
    nprogress.done()
  }

  render () {
    return (
      <Route {...this.props} />
    )
  }
}

export default FancyRoute
