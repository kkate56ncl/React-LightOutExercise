import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  };

  constructor(props) {
    super(props);

    //set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  createBoard() {
    let board = [];
    //create array-of-arrays of true/false values
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      for (let y = 0; y < this.props.ncols; y++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /* handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split('-').map(Number);

    function flipCell(x, y) {
      if (y >= 0 && y < ncols && x >= 0 && x < nrows) {
        board[x][y] = !board[x][y];
      }
    }

    //flip this cell and the cells around it

    flipCell(x, y); //Flip the cell you clicked
    flipCell(x - 1, y); //Flip up
    flipCell(x + 1, y); //Flip down
    flipCell(x, y - 1); //Flip left
    flipCell(x, y + 1); //Flip right

    // win when every cell is turned off
    // determine is the game has been won
    let hasWon = board.every((row) => row.every((cell) => cell === false));
    this.setState({ board, hasWon });
  }

  //Generate board
  makeTable() {
    let tblBoard = [];
    for (let x = 0; x < this.props.nrows; x++) {
      let row = [];
      for (let y = 0; y < this.props.ncols; y++) {
        let coord = `${x}-${y}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[x][y]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={x}>{row}</tr>);
    }

    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  /** Render game board or winning message. */

  render() {
    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <div className="neon-orange">Light</div>
              <div className="neon-blue">Out</div>
            </div>
            {this.makeTable()}
          </div>
        )}
      </div>
    );
  }
}

export default Board;
