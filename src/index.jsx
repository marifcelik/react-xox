import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: new Array(9).fill(null),
            isXTurn: true
        }
    }

    handleClick(i) {
        const squares = Array.from(this.state.squares);
        if (this.calculateWinner() || squares[i])
            return
        squares[i] = this.state.isXTurn ? 'x' : 'o';
        this.setState({
            squares,
            isXTurn: !this.state.isXTurn
        });
    }

    calculateWinner() {
        const squares = this.state.squares;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            let [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return squares[b]
        }
        return null;
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        )
    }

    render() {
        const winner = this.calculateWinner();
        let status;
        if (winner)
            status = `winner is ${winner}`
        else
            status = `it's ${this.state.isXTurn ? 'x' : 'o'} turn`;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status  */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />)