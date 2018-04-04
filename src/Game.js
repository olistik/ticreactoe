import { List, Map } from 'immutable'

export default class Game {
  constructor(size) {
    this.size = size
    this.cells = List().setSize(size).map(() => {
      return List().setSize(size).map(() => null)
    })

    this.cellsLeft = this.size * this.size
    this.counters = {
      rows: List().setSize(size).map(() => 0),
      columns: List().setSize(size).map(() => 0),
      diagonalLTR: 0,
      diagonalRTL: 0,
    }
  }

  status() {
    const result = Map(this.counters)
      .valueSeq()
      .flatten()
      .find((el) => Math.abs(el) === this.size)
    switch (result) {
    case this.size:
      return 'X'
    case -this.size:
      return 'O'
    default:
      if (this.cellsLeft === 0) {
        return 'tie'
      }
      return 'ongoing'
    }
  }

  cellIsSet({ column, row }) {
    return this.getCell({ column, row }) !== null
  }

  getCell({ column, row }) {
    return this.cells.get(row).get(column)
  }

  update({ column, row, value }) {
    const instance = new Game(this.size)

    // Updates the cell.
    const newRow = this.cells.get(row).set(column, value)
    instance.cells = this.cells.setIn([row], newRow)

    // Updates counters.
    const unit = value === 'X' ? 1 : -1
    instance.counters.rows = this.counters.rows.update(row, el => el + unit)
    instance.counters.columns = this.counters.columns.update(column, el => el + unit)
    instance.counters.diagonalLTR = this.counters.diagonalLTR
    if (row === column) {
      instance.counters.diagonalLTR += unit
    }
    instance.counters.diagonalRTL = this.counters.diagonalRTL
    if (column === this.size - 1 - row) {
      instance.counters.diagonalRTL += unit
    }

    instance.cellsLeft = this.cellsLeft - 1

    return instance
  }
}
