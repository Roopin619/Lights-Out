import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.3
  };

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() }
  }

  /* create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard = () => {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /* handle changing a cell: update board & determine if winner */

  flipCellsAround = (coord) => {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        board[x][y] = !board[x][y];
      }
    }

    flipCell(x, y);
    flipCell(x, y + 1);
    flipCell(x, y - 1);
    flipCell(x - 1, y);
    flipCell(x + 1, y);

    let win = board.every(row => row.every(cell => cell === false));

    this.setState({ board: board, hasWon: win });
  }

  displayBoard = () => {
    let tableBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`;
        row.push(<Cell key={coord} isLit={this.state.board[i][j]}
          flipCellsAroundMe={() => this.flipCellsAround(coord)} />);
      }
      tableBoard.push(<tr key={i}>{row}</tr>);
    }
    return tableBoard;
  }

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
                <div className="neon-orange">Lights</div>
                <div className="neon-blue">Out</div>
              </div>
              <table className="Board">
                <tbody>{this.displayBoard()}</tbody>
              </table>
            </div>
          )
        }
      </div>
    );
  }
}

export default Board;
