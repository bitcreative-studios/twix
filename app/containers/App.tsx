import React from 'react'

// TODO: this currently has very little purpose...refactor ?
export default class App extends React.Component {
  render() {
    const { children } = this.props
    return <React.Fragment>{children}</React.Fragment>
  }
}
