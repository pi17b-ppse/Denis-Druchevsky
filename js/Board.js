const _matrix = Symbol('_matrix');
const _table = Symbol('_table');
const _parent = Symbol('_parent');

class Board {
  constructor(parent) {

    const { matrix, table } = createTable(4);
    this[_parent] = parent;
    this[_matrix] = matrix;
    this[_table] = table;
  }


  get parent() {
    return this[_parent];
  }


  update(tiles) {
    if (tiles instanceof Array) {
      tiles.forEach((tile) => {
        if (
          typeof tile.position.x !== 'undefined'
          && typeof tile.position.y !== 'undefined'
        ) {
          const { x, y } = tile.position;
          this[_matrix][y][x].innerHTML = '';
          this[_matrix][y][x].appendChild(tile.el);
        } else throw new RangeError('аргумент должен иметь свойства "position.x & position.y"');
      });

      this[_parent].appendChild(this[_table]);
      return true;
    }
    return false;
  }
}


function createTable(sideSize = 4) {
  const matrix = [];
  const table = document.createDocumentFragment();

  for (let i = 0; i < sideSize; i += 1) {
    const row = document.createElement('tr');
    matrix[i] = row;
    table.appendChild(row);

    for (let j = 0; j < sideSize; j += 1) {
      const col = document.createElement('td');
      matrix[i][j] = col;
      row.appendChild(col);
    }
  }

  return {
    matrix,
    table,
  };
}

export default Board;
