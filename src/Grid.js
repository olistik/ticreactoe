import React, { Component } from 'react'
import Row from './Row.js'

export default class Grid extends Component {
  render() {
    const { updateCell, game }  = this.props
    const rows = Array(game.size).fill(null).map((value, row) => {
      return <Row row={row} key={row} game={game} updateCell={updateCell} />
    })
    return (
      <div className="grid">
        {rows}
      </div>
    )
  }
}
