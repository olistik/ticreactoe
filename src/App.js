import React, { Component } from 'react'
import './App.css'
import Grid from './Grid.js'
import gridSize from './gridSize.js'
import Game from './Game.js'
import WinGame from './WinGame.js'
import TieGame from './TieGame.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      game: new Game(gridSize()),
      currentSign: 'X'
    }
    this.updateCell = this.updateCell.bind(this)
  }

  updateCell({ column, row }) {
    if (this.state.game.cellIsSet({ column, row })) {
      return
    }
    this.setState((prevState, props) => {
      return {
        game: prevState.game.update({ column, row, value: prevState.currentSign }),
        // Switches between signes each turn.
        currentSign: prevState.currentSign === 'X' ? 'O' : 'X',
      }
    })
  }

  statusComponent() {
    const game = this.state.game
    const status = game.status()
    switch (status) {
    case 'ongoing':
      return (
        <div className="App height-100">
          <Grid updateCell={this.updateCell} game={game} />
        </div>
      )
    case 'X':
    case 'O':
      return (
        <div className="App height-100">
          <WinGame winner={status} />
        </div>
      )
    case 'tie':
      return (
        <div className="App">
          <TieGame />
        </div>
      )
    default:
      return '<p>WAT.</p>'
    }
  }

  render() {
    return (
      <div className="height-100">
        {this.statusComponent()}
      </div>
    )
  }
}

export default App
