export function dijkstra(start, end, wall, max_rows, max_col) {
  const visitedNodesInOrder = [];
  const shortestPath = [];
  const newVisitArray = [];
  const tempArray = [start];
  const distArray = [];
  for (let i = 0; i < max_rows; i++) {
    let row = [];
    let row2 = [];
    for (let j = 0; j < max_col; j++) {
      row.push(false);
      row2.push(Infinity);
    }
    newVisitArray.push(row);
    distArray.push(row2);
  }
  distArray[start[0]][start[1]] = 0;
  while (tempArray.length > 0) {
    const tempNode = tempArray[0];
    newVisitArray[tempNode[0]][tempNode[1]] = true;
    tempArray.splice(0, 1);
    if (tempNode[0] === end[0] && tempNode[1] === end[1]) break;

    if (
      tempNode[0] > 0 &&
      !newVisitArray[tempNode[0] - 1][tempNode[1]] &&
      !wall[tempNode[0] - 1][tempNode[1]]
    ) {
      tempArray.push([tempNode[0] - 1, tempNode[1]]);
      visitedNodesInOrder.push([tempNode[0] - 1, tempNode[1]]);
      newVisitArray[tempNode[0] - 1][tempNode[1]] = true;
      distArray[tempNode[0] - 1][tempNode[1]] =
        distArray[tempNode[0]][tempNode[1]] + 1;
    }
    if (
      tempNode[1] < max_col - 1 &&
      !newVisitArray[tempNode[0]][tempNode[1] + 1] &&
      !wall[tempNode[0]][tempNode[1] + 1]
    ) {
      tempArray.push([tempNode[0], tempNode[1] + 1]);
      visitedNodesInOrder.push([tempNode[0], tempNode[1] + 1]);
      newVisitArray[tempNode[0]][tempNode[1] + 1] = true;
      distArray[tempNode[0]][tempNode[1] + 1] =
        distArray[tempNode[0]][tempNode[1]] + 1;
    }
    if (
      tempNode[0] < max_rows - 1 &&
      !newVisitArray[tempNode[0] + 1][tempNode[1]] &&
      !wall[tempNode[0] + 1][tempNode[1]]
    ) {
      tempArray.push([tempNode[0] + 1, tempNode[1]]);
      visitedNodesInOrder.push([tempNode[0] + 1, tempNode[1]]);
      newVisitArray[tempNode[0] + 1][tempNode[1]] = true;
      distArray[tempNode[0] + 1][tempNode[1]] =
        distArray[tempNode[0]][tempNode[1]] + 1;
    }
    if (
      tempNode[1] > 0 &&
      !newVisitArray[tempNode[0]][tempNode[1] - 1] &&
      !wall[tempNode[0]][tempNode[1] - 1]
    ) {
      tempArray.push([tempNode[0], tempNode[1] - 1]);
      visitedNodesInOrder.push([tempNode[0], tempNode[1] - 1]);
      newVisitArray[tempNode[0]][tempNode[1] - 1] = true;
      distArray[tempNode[0]][tempNode[1] - 1] =
        distArray[tempNode[0]][tempNode[1]] + 1;
    }
  }
  let distance = distArray[end[0]][end[1]];
  if (distance !== Infinity) {
    let currentNode = end;
    shortestPath.push(currentNode);
    while (distance >= 0) {
      //console.log(distArray[currentNode[0] - 1][currentNode[1]], distance - 1);
      if (
        currentNode[0] > 0 &&
        distArray[currentNode[0] - 1][currentNode[1]] === distance - 1
      ) {
        currentNode = [currentNode[0] - 1, currentNode[1]];
        shortestPath.push(currentNode);
      } else if (
        currentNode[1] > 0 &&
        distArray[currentNode[0]][currentNode[1] - 1] === distance - 1
      ) {
        currentNode = [currentNode[0], currentNode[1] - 1];
        shortestPath.push(currentNode);
      } else if (
        currentNode[0] < max_rows - 1 &&
        distArray[currentNode[0] + 1][currentNode[1]] === distance - 1
      ) {
        currentNode = [currentNode[0] + 1, currentNode[1]];
        shortestPath.push(currentNode);
      } else if (
        currentNode[0] < max_col &&
        distArray[currentNode[0]][currentNode[1] + 1] === distance - 1
      ) {
        currentNode = [currentNode[0], currentNode[1] + 1];
        shortestPath.push(currentNode);
      }
      distance--;
      //console.log(currentNode);
    }
  }
  //console.log(distArray);
  return { visitedNodesInOrder, shortestPath };
}
