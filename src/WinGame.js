import React, { Component } from 'react'

export default class WinGame extends Component {
  render() {
    return (
      <div className="WinGame text-white">
        {this.props.winner} won.
      </div>
    )
  }
}
