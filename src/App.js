import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  //  クロージャをサポートしているので、外部の関数squaresにアクセスできる
  function handleClick(i) {
    //  すでに値が入っていたらこれ以上の処理はしない
    //  勝利判定で勝者が決まっていたらこれ以上の処理はしない
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //  最新の盤面を更新
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  //  どちらのプレイヤーの手番かを表現
  const [xIsNext, setXIsNext] = useState(true);
  //  2重配列で、要素数が9の配列を持った配列を作成
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //  historyの最後位置(最新)の盤面が現在の盤面
  const currentSquares = history[history.length - 1];

  //  最新の盤面が更新されたら呼ばれる
  function handlePlay(nextSquares) {
    //  既存のhistoryの末尾に最新の盤面を新しい配列として追加
    setHistory([...history, nextSquares]);
    //  手番を交代
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  //  勝利条件を表す配列
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
    //  タプル?
    //  JavaScriptでは分割代入という構文らしい
    const [a, b, c] = lines[i];
    //  同じ文字が並んでいるかチェック
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //  並んだ文字を返す
      return squares[a];
    }
  }

  return null;
}
