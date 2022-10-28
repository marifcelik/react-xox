import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>{props.value}</button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
        )
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: new Array(9).fill(null) }],
            stepNumber: 0,
            isXTurn: true
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1].squares;
        const squares = Array.from(current);
        if (calculateWinner(squares) || squares[i])
            return

        squares[i] = this.state.isXTurn ? 'x' : 'o';
        this.setState({
            history: history.concat([{ squares }]),
            stepNumber: history.length,
            isXTurn: !this.state.isXTurn
        });
    }

    jump(step) {
        this.setState({
            stepNumber: step,
            isXTurn: step % 2 === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber].squares;
        const winner = calculateWinner(current)

        const moves = history.map((step, move) => {
            const desc = move ? 'got to move #' + move : 'got to start';
            return (
                <li key={move}>
                    <button onClick={() => this.jump(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner)
            status = `winner is ${winner}`
        else if (this.state.stepNumber === 9)
            status = 'game over'
        else
            status = `it's ${this.state.isXTurn ? 'x' : 'o'} turn`;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />)