import React, { Component } from 'react'
import Cell from './Cell.js'

export default class Row extends Component {
  render() {
    const { game, row, updateCell } = this.props
    const cells = Array(game.size).fill(null).map((value, column) => {
      return <Cell row={row} column={column} key={column} updateCell={updateCell} game={game} />
    })
    return (
      <div className="row">
        {cells}
      </div>
    )
  }
}
