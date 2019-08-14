// import * as Constants from "../../config/constants";

function isPitOccipied(stone) {
  return stone.type !== 0 ? false : true;
}

// function countProps(obj) {
//   let count = 0;
//   let k;
//   for (k in obj) {
//     if (obj.hasOwnProperty(k)) {
//       count++;
//     }
//   }
//   return count;
// }

// function objectEquals(v1, v2) {
//   if (typeof v1 !== typeof v2) {
//     return false;
//   }

//   if (typeof v1 === "function") {
//     return v1.toString() === v2.toString();
//   }

//   if (v1 instanceof Object && v2 instanceof Object) {
//     if (countProps(v1) !== countProps(v2)) {
//       return false;
//     }
//     let r = true,
//       k;
//     for (k in v1) {
//       r = objectEquals(v1[k], v2[k]);
//       if (!r) {
//         return false;
//       }
//     }
//     return true;
//   } else {
//     return v1 === v2;
//   }
// }
const isEqual = (stone, neighbour) => {
  return stone.row === neighbour.row && stone.col === neighbour.col;
};

const isInArray = (stone, array) => {
  for (let i = 0; i < array.length; i++) {
    if (isEqual(stone, array[i])) {
      return true;
    }
  }
  return false;
};

const findNeighbours = (stone, boardState) => {
  const neighbours = [];
  const { row, col } = stone;
  // console.log("TCL: findNeighbours for -> coord", col, row);
  const N = col + "_" + (row - 1);
  const S = col + "_" + (row + 1);
  const W = col - 1 + "_" + row;
  const E = col + 1 + "_" + row;
  const directions = [N, S, W, E];
  // console.log("TCL: findNeighbours -> directions", N, S, W, E);
  directions.forEach(side => {
    const n = boardState[side];
    if (n) neighbours.push(n);
  });
  // console.log("TCL: findNeighbours -> neighbours", neighbours);
  return neighbours;
};

const isWithinBounds = (stone, size) => {
  console.log("TCL: isWithinBounds -> stone, size", stone, size);
  return (
    stone &&
    stone.row < size &&
    stone.row >= 0 &&
    stone.col < size &&
    stone.col >= 0
  );
};

const calcChains = (stone, chainStones, boardState, size) => {
  chainStones = chainStones || [];
  chainStones.push(stone);
  const nStones = findNeighbours(stone, boardState);
  nStones.forEach(nstone => {
    // Note: boundary check might not be required.
    if (isWithinBounds(nstone, size)) {
      if (stone.type === nstone.type) {
        if (!isInArray(nstone, chainStones)) {
          calcChains(nstone, chainStones, boardState, size);
        }
      }
    }
  });
  // console.log("TCL: chainStones", chainStones);
  return chainStones;
};

function calcTerritory(stone, territory, boardState, size, count) {
  if (stone.type !== 0) {
    return (territory = {
      stones: [...calcChains(stone, [], boardState, size)],
      owner: stone.type
    });
    // territory.stone.push(calcChains(stone, [], boardState, size));
    // territory.owner = stone.type;
  }

  let isRoot = false;
  if (territory == null) {
    isRoot = true;
    territory = {
      stones: [],
      owner: "unknown"
    };
  }
  territory.stones.push(stone);

  const nStones = findNeighbours(stone, boardState);
  nStones.forEach(nstone => {
    // console.log("TCL: calcTerritory -> nstone.k", nstone);
    if (isWithinBounds(nstone, size)) {
      if (nstone.type === 0) {
        if (!isInArray(nstone, territory.stones)) {
          count = count + 1;
          calcTerritory(nstone, territory, boardState, size, count);
        }
      } else if (nstone.type !== 0) {
        if (territory.owner === "unknown") {
          territory.owner = nstone.type;
        } else if (territory.owner !== nstone.type) {
          territory.owner = 0;
        }
      }
    }
  });

  if (isRoot && territory.owner === "unknown") {
    territory.owner = 0;
  }
  console.log("count", count);
  return territory;
}

const initTerritory = size => {
  const teri = [];
  for (let column = 0; column < size; column++) {
    teri[column] = [];
    for (let rows = 0; rows < size; rows++) {
      teri[column][rows] = "unknown";
    }
  }
  return teri;
};

function getScores(board, size) {
  console.log("Scoring...");
  const blackArea = [];
  const whiteArea = [];
  let message = "";
  const territories = initTerritory(size);
  for (let column = 0; column < size; column++) {
    for (let rows = 0; rows < size; rows++) {
      if (territories[column][rows] === "unknown") {
        const key = column + "_" + rows;
        const stone = board[key];
        console.log("stone, null, board, size", stone, null, board, size);
        const territory = calcTerritory(stone, null, board, size, 0);
        territory.stones.forEach(stone => {
          territories[stone.col][stone.row] = territory.owner;
        });
      }
    }
  }

  console.log("TCL: getScores -> territories", territories);
  territories.forEach(arr => {
    arr.forEach(x => {
      if (x === 1) {
        whiteArea.push(x);
      } else if (x === 2) {
        blackArea.push(x);
      }
    });
  });
  // console.log("Territory : ", territory);
  console.log("BlackTerritory : ", blackArea);
  console.log("WhiteTerritory : ", whiteArea);
  if (whiteArea.length > blackArea.length) {
    message = `White Won by ${whiteArea.length} points!!`;
  } else {
    message = `Black Won by ${blackArea.length} points!!`;
  }
  return {
    message
  };
}

function rules(newStone, xy, boardState, size, history, showError) {
  const calcLiberties = (stone, chainStones, libStones) => {
    chainStones = chainStones || [];
    libStones = libStones || [];
    const nStones = findNeighbours(stone, boardState);
    nStones.forEach(nstone => {
      // console.log("TCL: calcLiberties -> nstone", nstone);
      if (isWithinBounds(nstone, size)) {
        if (stone.type === nstone.type) {
          chainStones.push(stone);
          if (!isInArray(nstone, chainStones)) {
            calcLiberties(nstone, chainStones, libStones);
          }
        } else if (nstone.type === 0) {
          if (!isInArray(nstone, libStones)) {
            libStones.push(nstone);
          }
        }
      }
    });
    // console.log("TCL: libStones", libStones);
    return libStones;
  };

  const calcCapturedStones = stone => {
    let captured = [];
    const nStones = findNeighbours(stone, boardState);
    nStones.forEach(nstone => {
      // Note: boundary check might not be required.
      if (isWithinBounds(nstone, size)) {
        if (stone.type !== nstone.type && nstone.type !== 0) {
          if (!isInArray(nstone, captured)) {
            // console.log("TCL: captured -> nstone", nstone);
            if (calcLiberties(nstone).length === 0) {
              const chainedStones = calcChains(nstone, [], boardState, size);
              captured = [...captured, ...chainedStones];
            }
          }
        }
      }
    });
    console.log("TCL: calcCapturedStones", captured);
    return captured;
  };

  function deepEqual(x, y) {
    const ok = Object.keys,
      tx = typeof x,
      ty = typeof y;
    return x && y && tx === "object" && tx === ty
      ? ok(x).length === ok(y).length &&
          ok(x).every(key => deepEqual(x[key], y[key]))
      : x === y;
  }

  const isKo = (history, boardState) => {
    const countTo = history.length > 10 ? history.length - 10 : 0;
    for (let last = history.length - 1; last >= countTo; last--) {
      if (deepEqual(history[last], boardState)) {
        console.log("Ko found!", last);
        return true;
      }
    }
  };

  let result = true;
  const captures = calcCapturedStones(newStone);
  if (captures.length > 0) {
    const board = boardState;
    captures.forEach(cap => {
      const cr = cap.col + "_" + cap.row;
      board[cr].type = 0;
      board[cr].key = cr;
    });
    boardState = board;
  } else if (calcLiberties(newStone).length === 0) {
    showError("suicide");
    result = false;
  }
  const ko = isKo(history, boardState);
  if (ko) {
    showError("ko");
    result = false;
  }
  console.log("TCL: rules -> result", result);
  return result;
}

// module.exports = {
export { rules, isPitOccipied, getScores, calcTerritory };
