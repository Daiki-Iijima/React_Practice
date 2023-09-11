import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  //  どちらのプレイヤーおの手番かを表現
  const [xIsNext, setXIsNext] = useState(true);
  //  9個の要素を持つsquaresを生成してnullで初期化
  //  他のコンポーネントからのアクセスはできない
  const [squares, setSquares] = useState(Array(9).fill(null));

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
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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
