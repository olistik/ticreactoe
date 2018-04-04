import React, { Component } from 'react'

export default class Cell extends Component {
  constructor(props) {
    super(props)
    this.column = props.column
    this.row = props.row
    this.clickHandler = this.clickHandler.bind(this)
    this.updateCell = this.props.updateCell
  }

  clickHandler(event) {
    const { row, column } = this.props
    event.preventDefault()
    this.updateCell({ column, row })
    return false
  }

  render() {
    const { game, row, column } = this.props
    const value = game.getCell({ column, row })
    const className = value ? 'cell--set' : ''
    return (
      <div className={`cell ${className}`} onClick={this.clickHandler}>
        {value}
      </div>
    )
  }
}
