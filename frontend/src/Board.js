import React from "react";

const Board = (props) => {
  const renderSquare = (i) => {
    return <div className='box' onClick={() => props.onClick(i)}>{props.squares[i]}</div>;
  };

  return (
    <React.Fragment>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </React.Fragment>
  );
};

export default Board;
