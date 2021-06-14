import React from "react";
import "./Node.css";

export default function Node(props) {
  const {
    changeMouseState,
    mouseState,
    nodeType,
    start,
    end,
    row,
    col,
    setStart,
    setEnd,
    wall,
    setWall,
    visited,
    shortestPathArray,
  } = props;

  const mouseIsPressed = () => {
    if (nodeType === "Wall") {
      changeMouseState(true);
    }
  };

  const mouseOverEvent = () => {
    if (
      mouseState &&
      nodeType === "Wall" &&
      !(start[0] === row && start[1] === col) &&
      !(end[0] === row && end[1] === col)
    ) {
      handleWallChange(row, col, !wall[row][col]);
    }
  };

  const mouseIsLifted = () => {
    changeMouseState(false);
  };

  const setClassAccordingtoType = () => {
    if (nodeType === "Start") {
      setStart((prev) => [row, col]);
      handleWallChange(row, col, false);
    } else if (nodeType === "End") {
      setEnd((prev) => [row, col]);
      handleWallChange(row, col, false);
    } else {
      handleWallChange(row, col, !wall[row][col]);
    }
  };

  const handleWallChange = (row, col, value) => {
    const newWall = wall.slice();
    newWall[row][col] = value;
    setWall(newWall);
  };

  return (
    <div
      id={`${row}-${col}`}
      onClick={setClassAccordingtoType}
      onMouseDown={mouseIsPressed}
      onMouseOver={mouseOverEvent}
      onMouseUp={mouseIsLifted}
      className={`Node ${wall[row][col] ? "Node-wall" : ""} 
      ${start[0] === row && start[1] === col ? "Start" : ""} 
      ${end[0] === row && end[1] === col ? "End" : ""}
      ${visited[row][col] ? "Node-visited" : ""}
      ${shortestPathArray[row][col] ? "Node-shortest" : ""}`}
    ></div>
  );
}
