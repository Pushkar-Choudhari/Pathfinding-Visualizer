class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
  rear() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[this.items.length - 1];
  }
  enqueue(element, priority) {
    var qElement = new QElement(element, priority);
    var contain = false;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }
  }
  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
  contains(element) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].element === element) {
        return true;
      }
    }
    return false;
  }
}

export function A_star(start, end, wall, max_rows, max_col) {
  let queue = new PriorityQueue();
  let visitedNodesInOrder = [];
  let cameFrom = [];
  let gScore = [];
  let fScore = [];
  let hScore = [];
  for (let i = 0; i < max_rows; i++) {
    let row = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];
    for (let j = 0; j < max_col; j++) {
      row.push(Infinity);
      row2.push(Infinity);
      row3.push(null);
      row4.push(generateHeuristics(i, j, end));
    }
    gScore.push(row);
    fScore.push(row2);
    cameFrom.push(row3);
    hScore.push(row4);
  }
  gScore[start[0]][start[1]] = 1;
  fScore[start[0]][start[1]] = 1 + hScore[start[0]][start[1]];
  queue.enqueue(start, 0);
  while (!queue.isEmpty()) {
    let currentNode = queue.front().element;
    visitedNodesInOrder.push(currentNode);

    queue.dequeue();
    let row = currentNode[0];
    let col = currentNode[1];
    if (row === end[0] && col === end[1]) {
      break;
    }
    let neighbours = [];
    neighbours.push([row, col + 1]);
    neighbours.push([row - 1, col]);
    neighbours.push([row, col - 1]);
    neighbours.push([row + 1, col]);
    console.log(neighbours);
    for (let i = 0; i < neighbours.length; i++) {
      let nRow = neighbours[i][0];
      let nCol = neighbours[i][1];
      //console.log(neighbours);
      if (nRow < 0 || nRow >= max_rows) continue;
      else if (nCol < 0 || nCol >= max_col) continue;
      else if (wall[nRow][nCol]) continue;
      let tentativeGScore = gScore[row][col] + 1;
      if (gScore[nRow][nCol] > tentativeGScore) {
        cameFrom[nRow][nCol] = currentNode;
        gScore[nRow][nCol] = tentativeGScore;
        fScore[nRow][nCol] = gScore[nRow][nCol] + hScore[nRow][nCol];
        if (!queue.contains([nRow, nCol])) {
          queue.enqueue(neighbours[i], fScore[nRow][nCol]);
        }
      }
    }
  }
  let node = end;
  let shortestPath = [];
  if (cameFrom[node[0]][node[1]] !== null) {
    shortestPath.push(node);
    while (!(node[0] === start[0] && node[1] === start[1])) {
      node = cameFrom[node[0]][node[1]];
      shortestPath.push(node);
      console.log(node);
    }
  }
  return { visitedNodesInOrder, shortestPath };
}

const generateHeuristics = (row, col, end) => {
  const x_change = Math.abs(row - end[0]);
  const y_change = Math.abs(col - end[1]);
  return x_change + y_change;
};
