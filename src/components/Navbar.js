import React from "react";
import "./Navbar.css";

export default function Navbar(props) {
  const { nodeType, setNodeType, animateDijkstra, resetBoard, setSearchType } =
    props;
  const changeNodeType = (e) => {
    setNodeType(e.target.innerText);
  };
  return (
    <nav className="navbar">
      <div
        className={`navComponent ${nodeType === "Start" ? "selected" : ""}`}
        onClick={changeNodeType}
      >
        Start
      </div>
      <div
        className={`navComponent ${nodeType === "End" ? "selected" : ""}`}
        onClick={changeNodeType}
      >
        End
      </div>
      <div
        className={`navComponent ${nodeType === "Wall" ? "selected" : ""}`}
        onClick={changeNodeType}
      >
        Wall
      </div>
      <button onClick={animateDijkstra} className="navbar-button">
        Visualise
      </button>
      <button className="resetButton" onClick={resetBoard}>
        Reset
      </button>
      <ul>
        <li className="searchAlgos" onClick={() => setSearchType("1")}>
          Dijkstra
        </li>
        <li className="searchAlgos" onClick={() => setSearchType("2")}>
          A*
        </li>
      </ul>
    </nav>
  );
}
