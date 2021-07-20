import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Grid.css";
import Node from "./Node";
import { dijkstra } from "../algorithms/Dijkstra";
import { A_star } from "../algorithms/A_star";
const NO_OF_ROWS = Math.floor((window.innerHeight - 70) / 30 - 2);
const NO_OF_COLS = Math.floor((window.innerWidth - 10) / 30 - 2);
//console.log(NO_OF_COLS, NO_OF_ROWS);
function Grid() {
  const grid = constructInitialGrid();
  const [mousePressed, setMousePressed] = useState(false);
  const [nodeType, setNodeType] = useState("Wall");
  const [wall, setWall] = useState(() => createArray());
  const [start, setStart] = useState([0, 0]);
  const [end, setEnd] = useState([NO_OF_ROWS - 1, NO_OF_COLS - 1]);
  const [visited, setVisited] = useState(() => createArray());
  const [shortestPathArray, setShortestPathArray] = useState(() =>
    createArray()
  );
  const [searchType, setSearchType] = useState("1");
  const mouseStateToggle = (state) => {
    setMousePressed(state);
  };
  const resetBoard = () => {
    const array1 = createArray();
    const array2 = createArray();
    const array3 = createArray();
    setVisited([...array1]);
    setWall([...array2]);
    setShortestPathArray([...array3]);
  };
  const animateDijkstra = () => {
    let searchObject;
    if (searchType === "1") {
      searchObject = dijkstra(start, end, wall, NO_OF_ROWS, NO_OF_COLS);
    } else if (searchType === "2") {
      searchObject = A_star(start, end, wall, NO_OF_ROWS, NO_OF_COLS);
    }
    const { visitedNodesInOrder, shortestPath } = searchObject;
    shortestPath.reverse();
    const length = visitedNodesInOrder.length;
    for (let i = 0; i < length + shortestPath.length; i++) {
      setTimeout(() => {
        if (i < length) {
          const newArray = visited;
          newArray[visitedNodesInOrder[i][0]][visitedNodesInOrder[i][1]] = true;
          setVisited([...newArray]);
        }
        if (i >= length) {
          const tempArray = shortestPathArray;
          tempArray[shortestPath[i - length][0]][
            shortestPath[i - length][1]
          ] = true;
          setShortestPathArray([...tempArray]);
        }
      }, 40 * i);
    }
  };
  const setUpGrid = grid.map((row, rowId) => {
    return (
      <div key={rowId} className="row">
        {row.map((node, nodeId) => {
          const { i, j } = node;
          return (
            <Node
              key={nodeId}
              row={i}
              col={j}
              changeMouseState={mouseStateToggle}
              mouseState={mousePressed}
              nodeType={nodeType}
              wall={wall}
              start={start}
              end={end}
              setStart={setStart}
              setEnd={setEnd}
              setWall={setWall}
              visited={visited}
              setVisited={setVisited}
              shortestPathArray={shortestPathArray}
            />
          );
        })}
      </div>
    );
  });

  return (
    <>
      <Navbar
        setNodeType={setNodeType}
        nodeType={nodeType}
        animateDijkstra={animateDijkstra}
        resetBoard={resetBoard}
        setSearchType={setSearchType}
      />
      <div className="Grid">{setUpGrid}</div>
    </>
  );
}

const constructInitialGrid = () => {
  let grid = [];
  for (let i = 0; i < NO_OF_ROWS; i++) {
    grid.push([]);
    for (let j = 0; j < NO_OF_COLS; j++) {
      grid[i].push({ i, j });
    }
  }
  return grid;
};

const createArray = () => {
  const wall = [];
  for (let i = 0; i < NO_OF_ROWS; i++) {
    let row = [];
    for (let j = 0; j < NO_OF_COLS; j++) {
      row.push(false);
    }
    wall.push(row);
  }
  return wall;
};

export default Grid;
