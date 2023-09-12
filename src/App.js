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
  //  2重配列で、要素数が9の配列を持った配列を作成
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //  現在の手番の位置
  const [currentMove, setCurrentMove] = useState(0);
  //  どちらのプレイヤーの手番かを表現
  const xIsNext = currentMove % 2 === 0;
  //  historyの現在の手番の位置を描画対象にする
  const currentSquares = history[currentMove];

  //  最新の盤面が更新されたら呼ばれる
  function handlePlay(nextSquares) {
    //  既存のhistoryの最初から、現在の手番までの履歴に最新の盤面情報を履歴として追加
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    //  次の手番は、履歴の最後の番号
    setCurrentMove(nextHistory.length - 1);
  }

  //  ｍ巻き戻しボタンを押された場合
  function jumpto(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move + "手目に戻る";
    } else {
      description = "ゲーム開始時に戻る";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpto(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
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
