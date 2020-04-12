import React, { useState, useEffect } from "react";

import Board from "./Board";
import { baseUrl } from "./config.json";
import { calculateWinner, regenerateSession } from "./utils";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [histories, setHistories] = useState([]);
  const [xIsNext, setNext] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseUrl}/game`, { credentials: "include" });
      const json = await res.json();

      if (json.squares) setSquares(json.squares);
      if (json.histories) setHistories(json.histories);
      if (json.xIsNext) setNext(json.xIsNext);
    };

    fetchData();
  }, []);

  const handleClick = async (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    histories.push(`${squares[i]} clicked box ${i}`);

    const res = await fetch(`${baseUrl}/game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ squares, histories, xIsNext: !xIsNext }),
      credentials: "include",
    });
    const json = await res.json();

    if (json && res.status === 200) {
      setSquares(squares);
      setHistories(histories);
      setNext(!xIsNext);
    }
  };

  const handleRestart = () => {
    regenerateSession();

    setSquares(Array(9).fill(null));
    setHistories([]);
    setNext(true);
  };

  const winner = calculateWinner(squares);
  let status = "Next player: " + (xIsNext ? "X" : "O");

  const logs = histories.map((log, index) => <li key={index}>{log}</li>);

  if (winner) status = "Winner: " + winner;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <button className="button" onClick={handleRestart}>
          Restart
        </button>
        <div>{status}</div>
        <ol>{logs}</ol>
      </div>
    </div>
  );
};

export default App;
